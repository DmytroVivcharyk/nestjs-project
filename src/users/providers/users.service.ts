import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  getHello(): string {
    const isAuthenticated = this.authService.isAuthenticated();
    if (!isAuthenticated) return 'Not authenticated';
    return 'Hello from users Injectable servise provider!';
  }

  public getUserById(userId: string) {
    return {
      userId,
      firstName: 'John',
      lastName: 'Doe',
    };
  }
}
