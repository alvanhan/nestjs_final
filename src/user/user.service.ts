import { HttpException, HttpStatus, Injectable, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { use } from 'passport';
import { Role } from 'src/auth/model/role.enum';
import { RelationId, Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { CreateUserParams, updateProfileParams } from './utils/index.type';

@Injectable()
export class UserService {
    constructor(
                @InjectRepository(User) private userRepository: Repository<User>,
                @InjectRepository(Profile) private profileRepository: Repository<Profile>
        ){}

    async createUser(userData: CreateUserParams): Promise<any> {
        const usercheck = await this.userRepository.findOne({
            where: {
                email: userData.email
            } 
        });
        if(usercheck){
            throw new HttpException('Email is already taken.', HttpStatus.NOT_ACCEPTABLE);
        }
        const  signin = await this.userRepository.create(
            {
                email: userData.email,
                password: userData.password,
                roles: Role.User
                //ganti untuk rubah role nya di sini
            }
        )
        await this.userRepository.save(signin);
        await this.createProfile(userData);
        // await this.createRole(userData);
    }


    //Profile
    async profileUpdate(user, profileData: updateProfileParams ) {
        const id = user.id;
        const profile = await this.profileRepository.findOne({
            where: {
                user: id,
            }
        });
        const idp = profile.id;
        await this.profileRepository.update({id: idp}, {
            address: profileData.address,
            age: profileData.age,
            name: profileData.name
        });        
    }

    //role
    // async createRole(userRole: CreateUserParams) {
    //     const user = await this.userRepository.findOne({
    //         where: {
    //             email: userRole.email
    //         }
    //     });
    //     const craeteRoles = await this.roleRepository.create({
    //             name: "user",

    //     });
    //     const saverole = await this.roleRepository.save(craeteRoles);
    //     user.role = saverole;
    //     await this.userRepository.save(user);
    // }

    async createProfile(userData: CreateUserParams){
        const user = await this.userRepository.findOne({
                where: {
                    email: userData.email
                }
            });
        const createprofile = await this.profileRepository.create({
                name: userData.name,

        });
        const saveprofile = await this.profileRepository.save(createprofile);
        user.profile = saveprofile;
        await this.userRepository.save(user);
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOne({
          where: {
            email: email,
          },
        });
    }

    async getprofile(userId: number){
        console.log(userId);
        
        // const profileUser = await this.profileRepository.find({
        //     where: {
        //         user: userId
        //     },
        //     relations: ['user'],
        //     loadRelationIds: true
        // });
        // console.log(profileUser);
        // if(!profileUser){
        //     throw new HttpException('Profile not found.', HttpStatus.AMBIGUOUS);
            
        // }

        // return profileUser;
    }
}
