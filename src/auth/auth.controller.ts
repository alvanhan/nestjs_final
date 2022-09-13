import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/user/decorator/user.decorator';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    async login(@Body() authLoginDto: AuthLoginDto) {
      return this.authService.login(authLoginDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@User() user) {
      console.log(user);
    }
}
