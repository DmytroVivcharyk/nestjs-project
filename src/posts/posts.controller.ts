import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':userId')
  getPostsByUserId(@Param('userId') userId: string) {
    return this.postsService.getPostsByUserId(userId);
  }
}
