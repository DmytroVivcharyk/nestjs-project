import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
// import { User } from './users/user.entity';
// import { Post } from './posts/post.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';

const ConfiguredTypeOrmModule = TypeOrmModule.forRootAsync({
  imports: [],
  inject: [],
  useFactory: () => ({
    type: 'postgres',
    // entities: [User, Post],
    // entities: [__dirname + '/**/*.entity.ts'],
    autoLoadEntities: true,
    host: 'localhost',
    port: 9999,
    username: 'nest_user',
    password: 'nest_password',
    database: 'nest_db',
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
    MetaOptionsModule,
  ],
})
export class AppModule {}
