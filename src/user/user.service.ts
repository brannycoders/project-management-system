/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { promises } from 'dns';
import * as argon2 from 'argon2';
import { Request, response, Response } from 'express';
import { argon2d } from 'argon2';
import { LoginDto } from './dto/loginDto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private jwtService: JwtService) { }


 async  create(payload: CreateUserDto) {
  payload.email = payload.email.toLowerCase();
  const {email, password,...rest } = payload;
  
  const user = await this.userRepository.findOne({ where: {
    email: email
  }});
  if (user) {
    throw new HttpException('sorry user with this email already exist', 400)

  }
  const hashPassword = await argon2.hash(password);

  const userDetails = await this.userRepository.save({
    email,
    password: hashPassword,
    ...rest
  })
  delete userDetails.password;
  const Userpayload = {id: userDetails.id, email: userDetails.email};

    return {
      asccess_token: await this.jwtService.signAsync(Userpayload)
    };
  }

  async signIn(payload: LoginDto, @Req() req: Request, @Req() res: Response) {
    const {email, password} = payload
    //const user = await this.userRepository.findOneBy({email})
    const user = await this.userRepository.createQueryBuilder("user").addSelect("user.password").where("user.email = :email", {email:payload.email}).getOne()

    if (!user) {
      throw new HttpException('No email found', 400)
    }
    const checkedPassword = await this.verifyPassword(user.password,password);
    if(!checkedPassword){
      throw new HttpException('Invalid password', 400)
    }

    const token = await this.jwtService.signAsync({
      email: user.email,
      id: user.id
    });

    res.cookie('isAuthenticated', token,{
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000
    });
    //delete user.password
    return res.send({
      success: true,
      userToken: token
    })
  }

  async logout(@Req()req:Request, @Res()res:Response){
    const clearCookie = res.clearCookie('isAuthenticated');

    const Response = res.send('user successfully logout'); 

    return {
      clearCookie,
      response
    }
  }


  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findEmail(email) {
    const userEmail = await this.userRepository.findOneBy({ email })

    if (!userEmail) {
      throw new HttpException('email already exists', 400)

    }
    return userEmail;
  }

  async verifyPassword(hashPassword: string, plainPassword: string,): Promise<boolean> {
    try {
      return await argon2.verify(hashPassword, plainPassword);
    } catch (err) {
      console.log(err.message)
      return false;
    }
  }


  async user(headers: any): Promise<any> {
    const authorizationHeader = headers.authorization;  //it tries to extract the autorization header from 
    // the incoming request headers. This header typically contains the token used for authentication.
 
    if (authorizationHeader){
      const token = authorizationHeader.replace('Bearer ', '');
      const secret = process.env.JWTSECRET;
      //checks if the authorization header exist. If not, it will skip to the else block and throw an error.
      try {
      const decoded = this.jwtService.verify(token);
      // eslint-disable-next-line prefer-const
      let id = decoded["id"];  //After verifying the token, the function extract the user's id from the decoded payload.
      // eslint-disable-next-line prefer-const
      let user = await this.userRepository.findOneBy({id});

      return {id: id, name: user.name, email: user.email, role: user.role};

    } catch (error) {
      throw new UnauthorizedException('Invalid token');

    } 
   } else {
      throw new UnauthorizedException('Invalid or missing Bearer token');
    }
  }
}

