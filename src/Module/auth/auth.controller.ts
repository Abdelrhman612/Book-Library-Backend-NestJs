import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  ResetPasswordto,
  SignInhDto,
  SignUphDto,
  VerifyCodeDto,
} from './dto/create-auth.dto';

@Controller('v1/auth') // Base route for all authentication-related endpoints
export class AuthController {
  constructor(private readonly authService: AuthService) {} // Inject AuthService to handle authentication logic

  /**
   * Handles user registration (sign-up).
   *
   * @param signUphDto - Object containing the user's registration details.
   * @returns A success response with the newly registered user's details.
   */
  @Post('sign-up')
  signUp(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    signUphDto: SignUphDto,
  ) {
    return this.authService.SignUp(signUphDto);
  }

  /**
   * Handles user login (sign-in).
   *
   * @param signInhDto - Object containing the user's login credentials.
   * @returns A success response with the authentication token and user details.
   */
  @Post('sign-in')
  sigin(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    signInhDto: SignInhDto,
  ) {
    return this.authService.SignIn(signInhDto);
  }
  /**
   * Sends a reset password code to the user's email.
   *
   * @param resetPasswordto - Object containing the user's email.
   * @returns A success response indicating the code was sent.
   */
  @Post('Reset-Password')
  ResetPassword(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    resetPasswordto: ResetPasswordto,
  ) {
    return this.authService.ResetPassword(resetPasswordto);
  }

  /**
   * Verifies the reset password code provided by the user.
   *
   * @param verifyCodeDto - Object containing the user's email and verification code.
   * @returns A success response if the code is valid.
   */
  @Post('verify-code')
  verifyCode(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    verifyCodeDto: VerifyCodeDto,
  ) {
    return this.authService.verifycode(verifyCodeDto);
  }

  /**
   * Changes the user's password.
   *
   * @param changePasswordDto - Object containing the user's email and new password.
   * @returns A success response indicating the password was changed.
   */
  @Post('change-password')
  ChangePassword(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(changePasswordDto);
  }
}
