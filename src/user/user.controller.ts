import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUserProfileDto } from './dto/profile.dto';
import { Param, Put, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { User } from 'src/user/decorator/user.decorator';


@Controller('users')
export class UserController {
    constructor(
      private userService: UserService,
      ){}
    

    @UseGuards(JwtAuthGuard)
    @Put('profile/update')
    async  updateProfile(@User() user, @Res() res: Response , @Body() createProfileDto: CreateUserProfileDto){
          await this.userService.profileUpdate(user, createProfileDto);
          return res.status(HttpStatus.CREATED).json({
            status: 'success',
            message: 'Profile update sucessfully.'
        });  
    }

    @Post('profile/:id')
    async getprofiledata(@Param('id', ParseIntPipe) id:number ){
        await this.userService.getprofile(id);
    }

    @Post('image')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './files',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadedFile(@UploadedFile() file: Express.Multer.File) {
      const response = {
        originalname: file.originalname,
        filename: file.filename,
      };
      return response;
    }
  
    @Post('multiple')
    @UseInterceptors(
      FilesInterceptor('image', 20, {
        storage: diskStorage({
          destination: './files',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
      const response = [];
      files.forEach(file => {
        const fileReponse = {
          originalname: file.originalname,
          filename: file.filename,
        };
        response.push(fileReponse);
      });
      return response;
    }

    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
      return res.sendFile(image, { root: './files' });
    }

}
