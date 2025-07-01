import { Module } from '@nestjs/common';
import { PrismaModule } from './DataBase/prisma.module';
import { UserModule } from './Module/user/user.module';
import { AuthModule } from './Module/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { BookModule } from './Module/book/book.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CloudinaryModule } from './Module/cloudinary/cloudinary.module';
import { CloudinaryController } from './Module/cloudinary/cloudinary.controller';
import { SayHelloController } from './HelloWorld.Controller';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    BookModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      serveRoot: '/client',
      serveStaticOptions: {
        index: false,
      },
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
    }),
    CloudinaryModule,
  ],
  controllers: [SayHelloController, CloudinaryController],
  providers: [],
})
export class AppModule {}
