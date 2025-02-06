import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import GoogleConfig from 'src/config/google.config';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  constructor(
    // private readonly reflector: Reflector,

    @Inject(GoogleConfig.KEY)
    private readonly googleConfig: ConfigType<typeof GoogleConfig>,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log(request);
    return true;
  }
}
