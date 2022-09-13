import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async login(authLoginDto: AuthLoginDto) {
        const user = await this.validateUser(authLoginDto);
        const payload = {
          //payload untuk di jwt nya
          id: user.id,
        };
    
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    
      async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
        const { email, password } = authLoginDto;
        const vlidteuser = await this.userService.findByEmail(email);
        if (!(await vlidteuser?.validatePassword(password))) {
          throw new UnauthorizedException();
        }
        return vlidteuser;
      }
}
