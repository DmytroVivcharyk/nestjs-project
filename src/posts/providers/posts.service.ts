import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}

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
