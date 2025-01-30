import {
  Inject,
  Injectable,
  forwardRef,
  BadRequestException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInUserDto } from './../dtos/sign-in-user.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtProvider } from './jwt.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Inject  HashingProvider
     */
    private readonly hashingProvider: HashingProvider,

    /**
     * Inject JwtProvider
     */
    private readonly jwtProvider: JwtProvider,
  ) {}
  public async login(signInUserDto: SignInUserDto) {
    let user = undefined;
    let isPasswordValid = false;

    try {
      user = await this.usersService.findUserByEmail(signInUserDto.email);
    } catch {
      throw new RequestTimeoutException(
        'couldnt connect to database please try again',
      );
    }

    if (!user) {
      throw new BadRequestException('invalid email or password');
    }

    try {
      isPasswordValid = await this.hashingProvider.comparePassword(
        signInUserDto.password,
        user.password,
      );
    } catch {
      throw new RequestTimeoutException(
        'couldnt connect to database please try again',
      );
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid email or password');
    }

    const accessToken = await this.jwtProvider.generateAccessToken(user);

    return {
      user,
      access_token: accessToken,
    };
  }

  public isAuthenticated() {
    return false;
  }
}
