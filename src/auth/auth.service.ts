import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (user && user.password && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async getPayLoadAndExpiryTime(email: string, id: string) {
        const payload = {
            email: email,
            sub: String(id),
        };

        const accessExpiry = Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRY_MIN) * 60 * 1000;
        const refreshExpiry = Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRY_DAYS) * 24 * 60 * 60 * 1000;

        return {
            payload,
            accessExpiry,
            refreshExpiry,
        }

    }



    async login(user: any) {
        const {payload, accessExpiry, refreshExpiry} = await this.getPayLoadAndExpiryTime(user.email, user.id);

        return {
            access_token: this.jwtService.sign(payload, { expiresIn: accessExpiry }),
            refresh_token: this.jwtService.sign(payload, { expiresIn: refreshExpiry }),
        };

    }

    async refreshToken(token: string) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.userService.getUserById(payload.sub);
            if (!user) {
                throw new UnauthorizedException();
            }
            // Re-issue tokens
            const {payload: newPayload, accessExpiry, refreshExpiry} = await this.getPayLoadAndExpiryTime(user.email, user.id);

            return {
                access_token: this.jwtService.sign(newPayload, { expiresIn: accessExpiry }),
                refresh_token: this.jwtService.sign(newPayload, { expiresIn: refreshExpiry }),
            };
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
