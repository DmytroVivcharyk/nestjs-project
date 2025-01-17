import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
/**
 * UsersService to connect to Users table and perform buisned logic
 * Inject AuthService to be able to use Authservice
 */
@Injectable()
export class UsersService {
  /**
   * @Constructor
   * @param authService
   * Inject AuthService
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * The method that returns a string if use is authenticated
   * Uses Authservice to check if user is authenticated
   * @returns  string
   */
  getHello(): string {
    const isAuthenticated = this.authService.isAuthenticated();
    if (!isAuthenticated) return 'Not authenticated';
    return 'Hello from users Injectable servise provider!';
  }

  /**
   * The method that returns a user by id
   * @param userId string
   * @returns user { userId: string; firstName: string; lastName: string }
   */
  public getUserById(userId: string) {
    return {
      userId,
      firstName: 'John',
      lastName: 'Doe',
    };
  }
}
