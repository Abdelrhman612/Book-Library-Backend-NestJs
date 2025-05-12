import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignInInterFace, SignUpInterFace } from './InterFace/Auth.interFace';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, // Inject PrismaService to interact with the database
    private jwtService: JwtService, // Inject JwtService to handle JWT token generation
  ) {}

  /**
   * Handles user registration (sign-up).
   *
   * @param signUphDto - Object containing the user's registration details (name, email, password, role).
   * @returns A success response with the newly registered user's details.
   * @throws Error if a user with the same email already exists.
   */
  async SignUp(signUphDto: SignUpInterFace) {
    const { name, email, password, role } = signUphDto;

    // Check if a user with the same email already exists
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (user) {
      throw new Error('User Already exists');
    }

    // Hash the user's password for security
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const AddUser = await this.prisma.user.create({
      data: { name, role, email, password: hashPassword },
      select: { name: true, email: true, role: true }, // Select specific fields to return
    });

    return { status: 'success', data: AddUser };
  }

  /**
   * Handles user login (sign-in).
   *
   * @param signInhDto - Object containing the user's login credentials (email, password).
   * @returns A success response with the authentication token.
   * @throws NotFoundException if the user is not found.
   * @throws UnauthorizedException if the password is invalid.
   */
  async SignIn(signInhDto: SignInInterFace) {
    const { email, password } = signInhDto;

    // Check if the user exists in the database
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User is not found');
    }

    // Validate the provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    // Generate a JWT token for the authenticated user
    const payload = { id: user.id, email: email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return { status: 'success', message: 'User is logged in', data: { token } };
  }
}
