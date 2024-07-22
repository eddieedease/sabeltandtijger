import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AppService } from '../app.service';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UsersController {

  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.appService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.appService.findOne(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.appService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: Partial<User>): Promise<User> {
    return this.appService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.appService.delete(id);
  }
}