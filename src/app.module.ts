import { Module } from '@nestjs/common';
import { PrismaModule } from './DataBase/prisma.module';
import { UserModule } from './Module/user/user.module';
import { AuthModule } from './Module/auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
