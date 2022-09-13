import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('signin')
    async usercreate(@Body() usercCreate: CreateUserDto, @Res() res: Response){
        await this.userService.createUser(usercCreate);
        return res.status(HttpStatus.CREATED).json({
            status: 'success',
            message: 'Register sucessfully.'
        });
    }

}
