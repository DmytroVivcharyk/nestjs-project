import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtProvider } from '../providers/jwt.provider';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly jwtProvider: JwtProvider) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.get('Authorization');

    if (!accessToken) {
      throw new UnauthorizedException('Access token is missing');
    }

    if (!accessToken.startsWith('Bearrer ')) {
      throw new UnauthorizedException('Access token is invalid format');
    }

    const payload = await this.jwtProvider.verifyAccessToken(
      accessToken.replace('Bearrer ', ''),
    );

    request['user'] = payload;

    if (!payload) {
      throw new UnauthorizedException('Access token is invalid');
    }

    return true;
  }
}
