import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SCERET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],

  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
