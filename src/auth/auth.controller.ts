import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() authBody: any) {
    return this.authService.login(authBody);
  }
}
