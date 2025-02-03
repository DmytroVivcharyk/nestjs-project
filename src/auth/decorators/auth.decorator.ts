import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';
import { AuthentificationTypeEnum } from '../enums/authentification-type.enum';

export const Auth = (...args: AuthentificationTypeEnum[]) =>
  SetMetadata(AUTH_TYPE_KEY, args);
