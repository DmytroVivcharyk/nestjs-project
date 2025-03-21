import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { User } from 'src/users/user.entity';

@Injectable()
export class JwtProvider {
  constructor(
    /**
     * Inject JwtService
     */

    private readonly jwtService: JwtService,

    /**
     * Inject ConfigService
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async generateAccessToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfiguration.secret,
      expiresIn: this.jwtConfiguration.accessTokenTtl,
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
    });

    return accessToken;
  }

  public async generateRefreshToken() {}

  public async verifyAccessToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token', {
        cause: error,
        description: 'Invalid access token',
      });
    }
  }

  public async verifyRefreshToken() {}
}
