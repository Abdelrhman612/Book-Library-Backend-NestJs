import { Module } from '@nestjs/common';
import { PrismaModule } from './DataBase/prisma.module';
import { UserModule } from './Module/user/user.module';
import { AuthModule } from './Module/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
    }),
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
