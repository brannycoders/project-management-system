/* eslint-disable prettier/prettier */
import { IsEnum } from "class-validator";
import { userRole } from "../enum/user.role.enum";

export class updateRoleDto{
    @IsEnum(userRole)
    role: userRole;
}