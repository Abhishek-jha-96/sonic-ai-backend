import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepositoryPort } from '../user.port';
import { PrismaService } from 'src/infrastructure/persistence/prisma.service';
import { AuthProvider, User } from 'src/user/domain/user';
import { CreateUserDto } from 'src/user/dto/create.dto';
import { UserMapper } from '../mapper/user.mapper';
import { UpdateUserDto } from 'src/user/dto/update.dto';
import {
  passwordRequired,
  userAlreadyExists,
  userNotFound,
} from 'src/user/constants';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    // noramlize email
    const email = data.email.toLowerCase().trim();

    // check if user already exists
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException(userAlreadyExists);
    }

    // check if password is required
    const isPasswordAuth = data.auth_provider === AuthProvider.EMAIL;

    if (isPasswordAuth && !data.password) {
      throw new BadRequestException(passwordRequired);
    }

    // hash password
    const hashedPassword = data.password
      ? await bcrypt.hash(data.password, 12)
      : null;

    const user = await this.prisma.user.create({
      data: {
        name: data.name?.trim(),
        email: data.email,
        password: hashedPassword,
        auth_provider: data.auth_provider,
      },
    });
    return UserMapper.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    // no users, return empty array
    if (!users.length) return [];

    return users.map((user) => UserMapper.toDomain(user));
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(userNotFound);

    const updated = await this.prisma.user.update({
      where: { id },
      data: { name: data.name },
    });

    return UserMapper.toDomain(updated);
  }
}
