import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/providers/users.service';
import { Post } from '../post.entity';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Inject UsersService
     */
    private readonly usersService: UsersService,

    /**
     * Inject postRepository
     */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  public getPostsByUserId(userId: string) {
    const user = this.usersService.getUserById(userId);
    if (!user) return 'User not found';
    return [
      {
        userId,
        user,
        title: 'Post 1',
        body: 'Post 1 body',
      },
      {
        userId,
        user,
        title: 'Post 2',
        body: 'Post 2 body',
      },
    ];
  }
}
