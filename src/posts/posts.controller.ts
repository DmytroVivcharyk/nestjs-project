import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ValidationPipe,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
  // UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts-dto';
// import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { AuthentificatedUser } from 'src/auth/decorators/authentificated-user.decorator';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':userId')
  // @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Get all posts by user id' })
  getPostsByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() postQuery: GetPostsDto,
  ) {
    return this.postsService.getAllPosts(userId, postQuery);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  public createPost(
    @Body(new ValidationPipe({ whitelist: false, transform: true }))
    createPostDto: CreatePostDto,
    @AuthentificatedUser(['email']) partialUser,
  ) {
    console.log(partialUser);
    return this.postsService.createPost(createPostDto);
  }

  @Patch()
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
    // @Param('postId')
    // postId: string,
  ) {
    return this.postsService.updatePostById(patchPostDto);
  }

  @ApiOperation({ summary: 'Delete a post by id' })
  @ApiQuery({
    name: 'id',
    type: Number,
    required: true,
    example: '234',
    description: 'The id of the post to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully deleted.',
  })
  @Delete()
  public deletePostById(@Query('id', ParseIntPipe) id: number) {
    console.log('id', id);
    return this.postsService.deletePostById(id);
  }
}
