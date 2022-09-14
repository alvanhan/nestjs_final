import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { User } from 'src/user/decorator/user.decorator';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(
      private authService: AuthService,
      private userService: UserService,
      private jwtService: JwtService

      ){}

    @Post('signin')
    async usercreate(@Body() usercCreate: CreateUserDto, @Res() res: Response){
        await this.userService.createUser(usercCreate);
        return res.status(HttpStatus.CREATED).json({
            status: 'success',
            message: 'Register sucessfully.'
        });
    }

    @Post('login')
    async login(@Body() authLoginDto: AuthLoginDto) {
      return this.authService.login(authLoginDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('check')
    async check(@User() user ,@Req() req: Request, @Res() res: Response){
        // const token = req.headers['authorization'];
        // const cleanToken = token.replace('Bearer','').trim();
        // console.log(cleanToken);
        // await this.jwtService.verify(cleanToken);
      return res.status(HttpStatus.OK).json({
        data: user,
        message: 'User found.'
    });
    }
}
