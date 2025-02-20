/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { IsNotEmpty, IsString } from "class-validator";

// /* eslint-disable prettier/prettier */
// export class UpdateTodoDto {
//   @IsNotEmpty({message: 'Sorry this field cannot be empty, please fill it'})
//     @IsString()
//     title: string;


//   @IsNotEmpty({message: 'Sorry this field cannot be empty, please fill it'})
//   @IsString()
//   description: string;

  
// } 

import { IsString, } from 'class-validator';

export class UpdateTodoDto {
  //@IsOptional()
  @IsString()
  title?: string;

 // @IsOptional()
  @IsString()
  description?: string;
}

