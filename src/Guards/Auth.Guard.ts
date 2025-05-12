import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/auth/decorator/user.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<{ headers: { authorization?: string } }>();
    const authHeader = request.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Missing authentication token');
    }

    try {
      const tokenPayload = await this.jwtService.verifyAsync<{
        id: string;
        email: string;
        role: string;
      }>(token, {
        secret: process.env.JWT_SECRET as string,
      });

      request['user'] = tokenPayload;

      const requiredRoles = this.reflector.get(Roles, context.getHandler());

      if (!requiredRoles) {
        return true;
      }

      if (!requiredRoles.includes(tokenPayload.role)) {
        throw new ForbiddenException(
          `You need one of these roles: ${requiredRoles.join(', ')}`,
        );
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
