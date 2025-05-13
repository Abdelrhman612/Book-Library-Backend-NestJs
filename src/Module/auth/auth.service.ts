import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  changePassword,
  ResetPassword,
  SignInInterFace,
  SignUpInterFace,
  verifyCode,
} from './InterFace/Auth.interFace';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, // Inject PrismaService to interact with the database
    private jwtService: JwtService,
    private mailService: MailerService, // Inject JwtService to handle JWT token generation
  ) {}

  /**
   * Handles user registration (sign-up).
   *
   * @param signUphDto - Object containing the user's registration details (name, email, password, role).
   * @returns A success response with the newly registered user's details.
   * @throws Error if a user with the same email already exists.
   */
  async SignUp(signUphDto: SignUpInterFace) {
    const { name, email, password } = signUphDto;

    // Check if a user with the same email already exists
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (user) {
      throw new Error('User Already exists');
    }

    // Hash the user's password for security
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const AddUser = await this.prisma.user.create({
      data: { name, email, password: hashPassword },
      select: { name: true, email: true }, // Select specific fields to return
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
  /**
   * Sends a reset password code to the user's email.
   *
   * @param resetPasswordto - Object containing the user's email.
   * @returns A success response indicating the code was sent.
   * @throws NotFoundException if the user is not found.
   */
  async ResetPassword(resetPasswordto: ResetPassword) {
    const { email } = resetPasswordto;
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new NotFoundException('user is not found');
    }

    // Generate a 6-digit verification code
    const code = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');

    // Update the user's verification code in the database
    await this.prisma.user.update({
      where: { email: email },
      data: { verificationCode: code },
    });

    // Prepare and send the email with the reset code
    const htmlMessage = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hello ${user.name},</h2>
        <p>You requested to reset your password for <strong>book-library</strong>.</p>
        <p>Your reset code is:</p>
        <h3>${code}</h3>
        <p>If you didn't request this, just ignore this email.</p>
        <p>— book-library Team</p>
      </body>
      </html>
      `;
    await this.mailService.sendMail({
      from: process.env.EMAIL_FROM as string,
      to: email,
      subject: `book-library -> resetPassword`,
      html: htmlMessage,
    });

    return {
      status: 'success',
      message: `Code sent successfully on your email -> ${email}`,
    };
  }

  /**
   * Verifies the reset password code provided by the user.
   *
   * @param verifyCodeDto - Object containing the user's email and verification code.
   * @returns A success response if the code is valid.
   * @throws NotFoundException if the user is not found.
   * @throws UnauthorizedException if the verification code is invalid.
   */
  async verifycode(verifyCodeDto: verifyCode) {
    const { email, code } = verifyCodeDto;
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new NotFoundException('user is not found');
    }

    // Check if the provided code matches the stored verification code
    if (user.verificationCode !== code) {
      throw new UnauthorizedException();
    }

    return {
      status: 'success',
      message: 'Code verified successfully, proceed to change your password',
    };
  }

  /**
   * Changes the user's password.
   *
   * @param changePasswordDto - Object containing the user's email and new password.
   * @returns A success response indicating the password was changed.
   * @throws NotFoundException if the user is not found.
   */
  async changePassword(changePasswordDto: changePassword) {
    const { password, email } = changePasswordDto;
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new NotFoundException('user is not found');
    }

    // Hash the new password for security
    const hash = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await this.prisma.user.update({
      where: { email: email },
      data: { password: hash },
    });

    return { status: 'success', message: 'Password changed successfully' };
  }
}
