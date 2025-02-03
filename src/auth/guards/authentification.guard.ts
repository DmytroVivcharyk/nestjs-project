import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthentificationTypeEnum } from '../enums/authentification-type.enum';
import { AccessTokenGuard } from './access-token.guard';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';
@Injectable()
export class AuthentificationGuard implements CanActivate {
  private static readonly defaultAuthType: AuthentificationTypeEnum =
    AuthentificationTypeEnum.BearrerToken;

  private readonly authentificationsTypeMap: Record<
    AuthentificationTypeEnum,
    CanActivate
  > = {
    [AuthentificationTypeEnum.BearrerToken]: this.accessTokenGuard,
    [AuthentificationTypeEnum.None]: {
      canActivate: () => true,
    },
  };
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<
      AuthentificationTypeEnum[]
    >(AUTH_TYPE_KEY, [context.getHandler(), context.getClass()]);

    const normalizedAuthTypes = Array.isArray(authTypes)
      ? authTypes
      : [authTypes ?? AuthentificationGuard.defaultAuthType];

    const guards = normalizedAuthTypes
      .map((type) => this.authentificationsTypeMap[type])
      .flat();

    let error = new UnauthorizedException();

    for (const instace of guards) {
      try {
        const canActivate = await instace.canActivate(context);
        if (canActivate) {
          return true;
        }
      } catch (err) {
        error = err;
      }
    }

    throw error;
  }
}
