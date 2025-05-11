import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  SignInInterFace,
  SignUpInterFace,
} from './InterFace/Auth.interFace copy';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async SignUp(signUphDto: SignUpInterFace) {
    const { name, email, password } = signUphDto;
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (user) {
      new Error('User Already exst');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const AddUser = await this.prisma.user.create({
      data: { name, email, password: hashPassword },
      select: { name: true, email: true },
    });

    return { status: 'success', data: AddUser };
  }

  async SignIn(signInhDto: SignInInterFace) {
    const { email, password } = signInhDto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    return { status: 'success', message: 'User is loged In' };
  }
}
