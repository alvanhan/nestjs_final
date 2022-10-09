import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/login.dto';
import { Role } from './model/role.enum';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async login(authLoginDto: AuthLoginDto) {
        const user = await this.validateUser(authLoginDto);
        if(!user){
          throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }
        const payload = {
          id: user.id,
          email: user.email,
          roles: [user.roles]
        };
        
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    
      async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
        const { email, password } = authLoginDto;
        const vlidteuser = await this.userService.findByEmail(email);
        if (!(await vlidteuser?.validatePassword(password))) {
          throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }
        return vlidteuser;
      }
}
