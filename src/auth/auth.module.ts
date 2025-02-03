import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { JwtProvider } from './providers/jwt.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';

@Module({
  controllers: [AuthController],
  providers: [
    JwtProvider,
    AuthService,
    { provide: HashingProvider, useClass: BcryptProvider },
  ],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(() => jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [AuthService, HashingProvider, JwtProvider],
})
export class AuthModule {}
