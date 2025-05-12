import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/DataBase/prisma.service';
import { UserInterFace } from './InterFace/user.interFace';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: UserInterFace) {
    const { email } = createUserDto;
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (user) {
      throw new Error('User Already exst');
    }
    const AddUser = await this.prisma.user.create({ data: createUserDto });
    return { status: 'success', data: { AddUser } };
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });
    return { status: 'success', length: users.length, data: { users } };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return { status: 'sucess', data: user };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    const NewUser = await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });
    return { status: 'success', data: NewUser };
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    await this.prisma.user.delete({ where: { id: id } });
    return {
      status: 'success',
      message: 'delete user is successfully',
    };
  }
}
