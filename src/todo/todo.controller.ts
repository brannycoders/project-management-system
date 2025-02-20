/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/role.guard';
import { Request } from 'express';
import { Roles } from 'src/guard/role';
import { User } from 'src/user/entities/user.entity';
import { userRole } from 'src/user/enum/user.role.enum';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  
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
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(userRole.admin, userRole.user)
  update(@Param('id') id: string, @Body() createTodoDto: UpdateTodoDto) {
    return this.todoService.updated(id, createTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}



