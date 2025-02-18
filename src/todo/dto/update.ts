/* eslint-disable prettier/prettier */
import { IsEnum } from "class-validator";
import { todoRole } from "../enum/todo.role.enum";

export class updateRoleDto{
    @IsEnum(todoRole)
    role: todoRole;
}