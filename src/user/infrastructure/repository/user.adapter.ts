import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from '../user.port';
import { PrismaService } from 'src/infrastructure/persistence/prisma.service';
import { User } from 'src/user/domain/user';
import { CreateUserDto } from 'src/user/dto/create.dto';
import { UserMapper } from '../mapper/user.mapper';
import { UpdateUserDto } from 'src/user/dto/update.dto';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password ?? null,
        auth_provider: data.auth_provider,
      },
    });
    return UserMapper.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`User with ID ${id} not found`);

    const updated = await this.prisma.user.update({
      where: { id },
      data: { name: data.name },
    });

    return UserMapper.toDomain(updated);
  }
}
