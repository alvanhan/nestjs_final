import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserParams } from './utils/user.type';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    async createUser(userData: CreateUserParams){
        const usercheck = await this.userRepository.findOne({
            where: {
                email: userData.email
            } 
        });
        if(usercheck){
            throw new HttpException('Email is already taken.', HttpStatus.NOT_ACCEPTABLE);
        }else{
            const  signin = this.userRepository.create(
                {
                    ...userData,
                }
            )
            await this.userRepository.save(signin);
            // delete signin.password;
            // return signin;
        }
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOne({
          where: {
            email: email,
          },
        });
    }
}
