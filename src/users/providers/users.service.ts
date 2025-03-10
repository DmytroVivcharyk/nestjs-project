import {
  Injectable,
  Inject,
  forwardRef,
  RequestTimeoutException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';

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

    /**
     * Inject BcryptProvider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    /**
     * Inject UsersCreateManyProvider
     */
    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    /**
     * Inject MailService
     */
    private readonly mailService: MailService,
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
   */
  public async getUserById(userId: number) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        throw new BadRequestException('The User id does not exist');
      }
      return user;
    } catch (error) {
      throw new RequestTimeoutException('Unable to connect to database', {
        description: 'Error connecting to database, please try again later',
        cause: error,
      });
    }
  }

  public async findOneUserByGoogleId(googleId: string) {
    const user = await this.userRepository.findOneBy({
      googleId,
    });
    if (!user) {
      throw new BadRequestException('The User id does not exist');
    }
    return user;
  }

  public async findUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new BadRequestException('The User id does not exist');
      }
      return user;
    } catch (error) {
      throw new RequestTimeoutException('Unable to connect to database', {
        description: 'Error connecting to database, please try again later',
        cause: error,
      });
    }
  }

  /**
   * The method that creates a user
   * @param newUser: CreateUserDto
   * @param User
   */
  public async createUser(newUserData: CreateUserDto) {
    let existingUser = undefined;

    try {
      existingUser = await this.userRepository.findOne({
        where: { email: newUserData.email },
      });
    } catch (error) {
      throw new RequestTimeoutException('Unable to connect to database', {
        description: 'Error connecting to database, please try again later',
        cause: error,
      });
    }

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    let newUser = this.userRepository.create(newUserData);

    const hashedPassword = await this.hashingProvider.hashPassword(
      newUserData.password,
    );
    newUser.password = hashedPassword;

    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException('Unable to connect to database', {
        description: 'Error connecting to database, please try again later',
        cause: error,
      });
    }

    try {
      await this.mailService.sendUserWelcome(newUser);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    return newUser;
  }

  // public async createGoogleUser(googleUserData: CreateUserDto) {}

  public async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }
}
