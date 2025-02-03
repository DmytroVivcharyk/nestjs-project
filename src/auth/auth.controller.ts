import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Auth } from './decorators/auth.decorator';
import { AuthService } from './providers/auth.service';
import { SignInUserDto } from './dtos/sign-in-user.dto';
import { AuthentificationTypeEnum } from './enums/authentification-type.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Auth(AuthentificationTypeEnum.None)
  @HttpCode(HttpStatus.OK)
  login(
    @Body(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    )
    signInUserDto: SignInUserDto,
  ) {
    return this.authService.login(signInUserDto);
  }
}
