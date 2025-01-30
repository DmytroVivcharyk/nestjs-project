import { PickType } from '@nestjs/swagger';

import { CreateUserDto } from 'src/users/dtos/create-user.dto';

export class SignInUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
