/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Delete, HttpException, HttpStatus, Injectable, NotFoundException, Param, Patch } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { User } from 'src/user/entities/user.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

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


  

  async updated(id: string, updateTodoDto: UpdateTodoDto) {
    // Find the existing todo
    const find = await this.todoRepository.findOne({ where: { id } });
  
    if (!find) throw new HttpException('ID does not exist', 400);
  
    // Merge the updated data
    Object.assign(find, updateTodoDto);
  
    // Save the updated entity
    const updatedTodo = await this.todoRepository.save(find);
  
    return {
      statusCode: 200,
      message: 'Todo updated successfully',
      updatedTodo,
    };
  }
  


  
  
 
  async delete(id: string) {
    const result = await this.todoRepository.delete(id);
  
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  
    return { message: 'Todo deleted successfully' };
  }
  
  
}





