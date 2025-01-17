import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':userId')
  getPostsByUserId(@Param('userId') userId: string) {
    return this.postsService.getPostsByUserId(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  public createPost(
    @Body(new ValidationPipe({ whitelist: false, transform: true }))
    newPost: CreatePostDto,
  ) {
    return `Post Request for posts with body: \n ${JSON.stringify(newPost)}`;
  }

  @Patch(':postId')
  @ApiOperation({ summary: 'Update a post by id' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
  })
  @ApiParam({
    name: 'postId',
    type: String,
    required: true,
    example: '234',
    description: 'The id of the post',
  })
  public updatePost(
    @Body(new ValidationPipe({ whitelist: false, transform: true }))
    patchPostDto: PatchPostDto,
    @Param('postId')
    postId: string,
  ) {
    return `Patch Request for posts with id: \n ${postId} \n and body: \n ${JSON.stringify(patchPostDto)}`;
  }
}
