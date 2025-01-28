import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './user.entity';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersCreateManyProvider],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
