/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateTodoDto {
  @IsNotEmpty({message: 'Sorry this field cannot be empty, please fill it'})
  @IsString()
  description: string;

  @IsNotEmpty({message: 'Sorry this field cannot be empty, please fill it'})
  @IsString()
  title: any;
}




/* eslint-disable prettier/prettier */

// import { IsNotEmpty, IsEmail, MinLength, Matches, IsOptional, MaxLength, IsString } from "class-validator";
// import { userRole } from "../enum/user.role.enum";



// export class CreateUserDto {
//     @IsNotEmpty({ message: 'sorry this field is not empty, kindly fill it'})
//     @IsString()
//     name: string;

//     @IsNotEmpty()
//     @IsEmail()
//     email: string;


//     @IsNotEmpty()
//     @MinLength(8, {message: 'sorry you must put in 8 character'})
//     @MaxLength(16, {message: 'password should not be more  than 16 characters'})
//     @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^da-zA-Z]).{8,}$/, {message: 'password must contain at ;east one uppercase, one lowercase and special characters'})
//     password: string;



//     @IsOptional()
//     role: userRole
// }
