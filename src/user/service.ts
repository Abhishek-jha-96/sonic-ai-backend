import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { User } from './domain/user';
import { UserRepositoryPort } from './infrastructure/user.port';
import { userNotFound } from './constants';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return this.userRepo.create(data);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException(userNotFound);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    return this.userRepo.update(id, data);
  }
}
