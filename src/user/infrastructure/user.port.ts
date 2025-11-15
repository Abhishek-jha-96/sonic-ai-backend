import { User } from '../domain/user';
import { CreateUserDto } from '../dto/create.dto';
import { UpdateUserDto } from '../dto/update.dto';

export abstract class UserRepositoryPort {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract update(id: string, data: UpdateUserDto): Promise<User>;
}
