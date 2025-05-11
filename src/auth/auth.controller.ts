import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInhDto, SignUphDto } from './dto/create-auth.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    signUphDto: SignUphDto,
  ) {
    return this.authService.SignUp(signUphDto);
  }

  @Post('sign-in')
  sigin(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    signInhDto: SignInhDto,
  ) {
    return this.authService.SignIn(signInhDto);
  }
}
