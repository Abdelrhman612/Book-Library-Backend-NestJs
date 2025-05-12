import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/DataBase/prisma.service';
import { UserInterFace } from './InterFace/user.interFace';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {} // Inject PrismaService to interact with the database

  /**
   * Creates a new user in the database.
   *
   * @param createUserDto - Object containing the details of the user to be created.
   * @returns The newly created user object wrapped in a success response.
   * @throws Error if a user with the same email already exists.
   */
  async create(createUserDto: UserInterFace) {
    const { email } = createUserDto;
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (user) {
      throw new Error('User Already exists');
    }
    const AddUser = await this.prisma.user.create({ data: createUserDto });
    return { status: 'success', data: { AddUser } };
  }

  /**
   * Retrieves all users from the database.
   *
   * @returns An array of users with selected fields (id, name, email, role) wrapped in a success response.
   */
  async findAll() {
    const users = await this.prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });
    return { status: 'success', length: users.length, data: { users } };
  }

  /**
   * Retrieves a specific user by their ID.
   *
   * @param id - The unique identifier of the user to retrieve.
   * @returns The user object wrapped in a success response.
   * @throws NotFoundException if the user is not found.
   */
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return { status: 'success', data: user };
  }

  /**
   * Updates the details of an existing user.
   *
   * @param id - The unique identifier of the user to update.
   * @param updateUserDto - Object containing the updated user details.
   * @returns The updated user object wrapped in a success response.
   * @throws NotFoundException if the user is not found.
   */
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

  /**
   * Deletes a user from the database by their ID.
   *
   * @param id - The unique identifier of the user to delete.
   * @returns A success message indicating the user was deleted.
   * @throws NotFoundException if the user is not found.
   */
  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    await this.prisma.user.delete({ where: { id: id } });
    return {
      status: 'success',
      message: 'User deleted successfully',
    };
  }
}
