import {
  Injectable,
  Body,
  ValidationPipe,
  RequestTimeoutException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/providers/users.service';
import { Post } from '../post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from 'src/posts/dtos/patch-post.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Inject UsersService
     */
    private readonly usersService: UsersService,

    /**
     * Inject TagsService
     */
    private readonly tagsService: TagsService,

    /**
     * Inject postRepository
     */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    /**
     * Inject MetaOptionsRepository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * The method that returns a user by id
   * @param userId string
   */
  public async getAllPosts(userId: number) {
    const user = this.usersService.getUserById(userId);
    if (!user) return 'User not found';
    return await this.postRepository.find({
      relations: {
        metaOptions: true,
        tags: true,
      },
    });
  }

  /**
   * The method that creates a post
   * @param createPostDto CreatePostDto
   */
  public async createPost(
    @Body(new ValidationPipe({ transform: true, whitelist: false }))
    createPostDto: CreatePostDto,
  ) {
    const author = await this.usersService.getUserById(createPostDto.authorId);
    if (!author) return 'User not found';

    // let metaOptions = null;
    // if (createPostDto.metaOptions) {
    //   metaOptions = awai t this.metaOptionsRepository.save(
    //     createPostDto.metaOptions,
    //   );
    // }

    const tags = await this.tagsService.getTagsByPostId(createPostDto.tags);

    const post = this.postRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    // if (metaOptions) {
    //   post.metaOptions = metaOptions;
    // }

    return await this.postRepository.save(post);
  }

  /**
   * The method that updates a post by id
   * @param patchPostDto PatchPostDto
   */
  public async updatePostById(patchPostDto: PatchPostDto) {
    let tags = undefined;
    let post = undefined;

    try {
      tags = await this.tagsService.getTagsByPostId(patchPostDto.tags);
    } catch (error) {
      throw new BadRequestException('Failed to fetch tags for updating post', {
        cause: error,
      });
    }

    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException(
        'Check your tags ids for updating post and ensure that they are correct',
      );
    }

    try {
      post = await this.postRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException('Error while fetching post', {
        cause: error,
      });
    }

    if (!post) {
      throw new BadRequestException('Post whit this id not found');
    }

    post.title = patchPostDto.title ?? post.title;
    post.postType = patchPostDto.postType ?? post.postType;
    post.status = patchPostDto.status ?? post.status;
    post.slug = patchPostDto.slug ?? post.slug;
    post.content = patchPostDto.content ?? post.content;
    post.publishedAt = patchPostDto.publishedAt ?? post.publishedAt;
    post.feturedImageUrl = patchPostDto.feturedImageUrl ?? post.feturedImageUrl;
    post.tags = tags;

    try {
      await this.postRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException('Error while updating post', {
        cause: error,
      });
    }

    return post;
  }

  /**
   * The method that deletes a post by id
   * @param postId number
   */
  public async deletePostById(postId: number) {
    // const post = await this.postRepository.findOne({
    //   where: { id: postId },
    //   relations: ['metaOptions'],
    // });
    await this.postRepository.delete(postId);

    // await this.metaOptionsRepository.delete(post.metaOptions.id);

    return { deleted: true, postId };
  }
}
