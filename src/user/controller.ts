import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './service';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async create(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Get('/')
  async findAll() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(id, data);
  }
}
