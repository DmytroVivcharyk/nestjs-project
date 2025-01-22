import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
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

    /**
     * Inject userRepository
     */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  /**
   * The method that creates a user
   * @param newUser: CreateUserDto
   * @param User
   */
  public async createUser(newUserData: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: newUserData.email },
    });
    if (existingUser) {
      return 'User already exists';
    }

    let newUser = this.userRepository.create(newUserData);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
}
