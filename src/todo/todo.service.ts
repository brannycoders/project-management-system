/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Delete, HttpException, HttpStatus, Injectable, Param, Patch } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TodoService {
  todoService: any;
  constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>) {}

  async create(payload:CreateTodoDto, user:User){
    const todo = new Todo();
    todo.userId = user.id;
    todo.title = payload.title;
    todo.description = payload.description;
    Object.assign(todo, payload);
    this.todoRepository.create(todo);
    return this.todoRepository.save(todo);
  }



  // findAll() {
  //   return `This action returns all todo`;
  // }

  async findAll() {
    try {
      const todos = await this.todoRepository.find();
      return { success: true, message: 'Todos retrieved successfully', data: todos };
    } catch (error) {
      throw new HttpException('Failed to fetch todos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} todo`;
  // }

  async findOne(id: string) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) throw new HttpException(`Todo with ID ${id} not found`, 401);
    return { success: true, message: 'Todo retrieved successfully', data: todo };
  }


  async updated(id: string, payload: CreateTodoDto) {
    const find= await this.todoRepository.findOne({where:{id}});
  if(!find) throw new HttpException('id does not exist', 400);
  const updateTodo = await this.todoRepository.update(id,payload)
  const find1= await this.todoRepository.findOne({where:{id}});
  return {
    statusCode:200,
    message: `Role updated successfully`,
    find1
  }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // update(id: number, updateTodoDto: UpdateTodoDto) {
  //   return `This action updates a #${id} todo`;
  // }
  


//   remove(id: number) {
//     return `This action removes a #${id} todo`;
//   }
// }
@Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.todoService.remove(id);
      return { success: true, message: 'Todo deleted successfully', data: result };
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}




// import { Injectable, NotFoundException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Todo } from './entities/todo.entity';
// import { User } from 'src/user/entities/user.entity';
// import { CreateTodoDto } from './dto/create-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';

// @Injectable()
// export class TodoService {
//   constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>) {}

//   async create(payload: CreateTodoDto, user: User) {
//     try {
//       const todo = this.todoRepository.create({
//         ...payload,
//         userId: user.id,
//       });
//       const savedTodo = await this.todoRepository.save(todo);
//       return { success: true, message: 'Todo created successfully', data: savedTodo };
//     } catch (error) {
//       throw new HttpException('Failed to create todo', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

  // async findAll() {
  //   try {
  //     const todos = await this.todoRepository.find();
  //     return { success: true, message: 'Todos retrieved successfully', data: todos };
  //   } catch (error) {
  //     throw new HttpException('Failed to fetch todos', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

//   async findOne(id: number) {
//     const todo = await this.todoRepository.findOne({ where: { id } });
//     if (!todo) throw new HttpException(`Todo with ID ${id} not found`, HttpStatus.NOT_FOUND);
//     return { success: true, message: 'Todo retrieved successfully', data: todo };
//   }

//   async update(id: number, updateTodoDto: UpdateTodoDto) {
//     try {
//       const result = await this.todoRepository.update(id, updateTodoDto);
//       if (result.affected === 0) {
//         throw new HttpException(`Todo with ID ${id} not found`, HttpStatus.NOT_FOUND);
//       }
//       return { success: true, message: 'Todo updated successfully' };
//     } catch (error) {
//       throw new HttpException('Failed to update todo', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async remove(id: number) {
//     const result = await this.todoRepository.delete(id);
//     if (result.affected === 0) {
//       throw new HttpException(`Todo with ID ${id} not found`, HttpStatus.NOT_FOUND);
//     }
//     return { success: true, message: 'Todo deleted successfully' };
//   }
// }
