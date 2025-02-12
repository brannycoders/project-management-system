/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';

import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/role.guard';
import { Request } from 'express';
import { Roles } from 'src/guard/role';
import { User } from 'src/user/entities/user.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // @Post()
  // create(@Body() createTodoDto: CreateTodoDto) {
  //   return this.todoService.create(createTodoDto);
  // }

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('user', 'admin')
  create(@Body() CreateTodoDto, @Req() 
req:Request) {
  return this.todoService.create(CreateTodoDto, req.user as User
  )
}

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}



