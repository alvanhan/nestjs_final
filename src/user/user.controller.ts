import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller()
export class UserController {
    constructor(private userService: UserService){}


}
