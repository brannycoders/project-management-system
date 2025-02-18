/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";


export class CreateTodoDto {
  @IsNotEmpty({message: 'Sorry this field cannot be empty, please fill it'})
  @IsString()
  description: string;

  @IsNotEmpty({message: 'Sorry this field cannot be empty, please fill it'})
  @IsString()
  title: string;
}




