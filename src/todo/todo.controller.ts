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
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}



// import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
// import { TodoService } from './todo.service';
// import { UpdateTodoDto } from './dto/update-todo.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from 'src/guard/role.guard';
// import { Request } from 'express';
// import { Roles } from 'src/guard/role';
// import { User } from 'src/user/entities/user.entity';
// import { CreateTodoDto } from './dto/create-todo.dto';

// @Controller('todo')
// export class TodoController {
//   constructor(private readonly todoService: TodoService) {}

//   @Post()
//   @UseGuards(AuthGuard(), RolesGuard)
//   @Roles('user', 'admin')
//   async create(@Body() createTodoDto: CreateTodoDto, @Req() req: Request) {
//     try {
//       const result = await this.todoService.create(createTodoDto, req.user as User);
//       return { success: true, message: 'Todo created successfully', data: result };
//     } catch (error) {
//       throw new HttpException('Failed to create todo', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @Get()
//   async findAll() {
//     try {
//       const result = await this.todoService.findAll();
//       return { success: true, message: 'Todos retrieved successfully', data: result };
//     } catch (error) {
//       throw new HttpException('Failed to fetch todos', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string) {
//     try {
//       const result = await this.todoService.findOne(+id);
//       return { success: true, message: 'Todo retrieved successfully', data: result };
//     } catch (error) {
//       throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @Patch(':id')
//   async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
//     try {
//       const result = await this.todoService.update(+id, updateTodoDto);
//       return { success: true, message: 'Todo updated successfully', data: result };
//     } catch (error) {
//       throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//     try {
//       const result = await this.todoService.remove(+id);
//       return { success: true, message: 'Todo deleted successfully', data: result };
//     } catch (error) {
//       throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }
// }




