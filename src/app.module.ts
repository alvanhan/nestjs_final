import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Profile } from './user/entities/profile.entity';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';


const entities = [User, Profile];

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: null,
      database: process.env.DB_NAME,
      entities: entities,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    MulterModule.register({
      dest: './files',
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
