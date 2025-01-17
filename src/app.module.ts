import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

const ConfiguredTypeOrmModule = TypeOrmModule.forRootAsync({
  imports: [],
  inject: [],
  useFactory: () => ({
    type: 'postgres',
    entities: [],
    host: 'localhost',
    port: 9999,
    username: 'nest_user',
    password: 'nest_password',
    database: 'nest_db',
    autoLoadEntities: true, // Automatically load entities
    synchronize: true, // Use only in development, not production
  }),
});

@Module({
  imports: [UsersModule, PostsModule, AuthModule, ConfiguredTypeOrmModule],
})
export class AppModule {}
