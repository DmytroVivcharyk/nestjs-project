import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
// import { User } from './users/user.entity';
// import { Post } from './posts/post.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import jwtConfig from 'src/config/jwt.config';
import { AuthentificationGuard } from './auth/guards/authentification.guard';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

const ENV = process.env.NODE_ENV;

const ConfiguredTypeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configureService: ConfigService) => ({
    type: 'postgres',
    // entities: [User, Post],
    // entities: [__dirname + '/**/*.entity.ts'],
    autoLoadEntities: true,
    host: configureService.get('DATABASE_HOST'),
    port: parseInt(configureService.get('DATABASE_PORT')),
    username: configureService.get('DATABASE_USER'),
    password: configureService.get('DATABASE_PASSWORD'),
    database: configureService.get('DATABASE_NAME'),
    // autoLoadEntities: true, // Automatically load entities
    synchronize: true, // Use only in development, not production
  }),
});

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    ConfiguredTypeOrmModule,
    TagsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [jwtConfig],
      validationSchema: null,
    }),
    MetaOptionsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthentificationGuard,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
