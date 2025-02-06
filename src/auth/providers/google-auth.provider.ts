import { Injectable, Inject, OnModuleInit, forwardRef } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { ConfigType } from '@nestjs/config';
import { GoogleAuthDto } from '../dtos/google-auth.dto';
// import jwtConfig from 'src/config/jwt.config';
import googleConfig from 'src/config/google.config';
import { UsersService } from 'src/users/providers/users.service';
import { JwtProvider } from './jwt.provider';

@Injectable()
export class GoogleAuthService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    /**
     * Inject JwtConfig
     */
    @Inject(googleConfig.KEY)
    private readonly googleConfiguration: ConfigType<typeof googleConfig>,

    /**
     * Inject UsersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Inject JwtProvider
     */
    private readonly jwtProvider: JwtProvider,
  ) {}

  onModuleInit() {
    this.oauthClient = new OAuth2Client(
      this.googleConfiguration.googleClientId,
      this.googleConfiguration.googleClientSecret,
    );
  }

  public async googleAuthenticate(googleTokenDto: GoogleAuthDto) {
    const loginTicket = await this.oauthClient.verifyIdToken({
      idToken: googleTokenDto.accessToken,
    });

    const { email, sub: googleId } = loginTicket.getPayload();

    const user = await this.usersService.findOneUserByGoogleId(googleId);

    if (user) {
      const accessToken = await this.jwtProvider.generateAccessToken(user);
      //   const refreshToken = await this.jwtProvider.generateRefreshToken();
      return {
        accessToken,
      };
    }
  }
}
