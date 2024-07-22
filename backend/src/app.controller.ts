import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './schemas/user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async findAll(): Promise<User[]> {
    return this.appService.findAll();
  }

  @Get('users/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.appService.findOne(id);
  }

  @Post('users')
  async create(@Body() user: User): Promise<User> {
    return this.appService.create(user);
  }

  @Put('users/:id')
  async update(@Param('id') id: string, @Body() user: Partial<User>): Promise<User> {
    return this.appService.update(id, user);
  }

  @Delete('users/:id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.appService.delete(id);
  }
}