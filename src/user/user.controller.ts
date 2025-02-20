/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards, } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/loginDto';
import { Response,Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/guard/role';
import { RolesGuard } from 'src/guard/role.guard';
import { updateRoleDto } from './dto/update';
import { userRole } from './enum/user.role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() CreateUserDto: LoginDto, @Req()req: Request, @Res()res: Response) {
    return this.userService.signIn(CreateUserDto, req, res);

  }


  @Post('logout')
  logout(@Req()req:Request, @Res()res:Response) {
    return this.userService.logout(req,res)
  }
  

  @Get()
  @UseGuards(AuthGuard(),RolesGuard)
  @Roles('admin')
    findAll(){
      return this.userService.findAll();
    }
  
 

  @Get(':id')
  @UseGuards(AuthGuard(),RolesGuard)
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(),RolesGuard)
  @Roles(userRole.admin)
  update(@Param('id') id: string, @Body() updateRolerto: updateRoleDto) {
    return this.userService.updateRole(id, updateRolerto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(),RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
