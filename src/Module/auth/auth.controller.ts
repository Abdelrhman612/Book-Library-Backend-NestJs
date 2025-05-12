import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInhDto, SignUphDto } from './dto/create-auth.dto';

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
}
