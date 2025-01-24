import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { Tag } from './tag.entity';

@Controller('tags')
export class TagsController {
  constructor(
    /**
     * Inject the TagsService
     */
    private readonly tagsService: TagsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new tag',
  })
  @ApiResponse({
    status: 201,
    description: 'The tag has been successfully created.',
    type: Tag,
  })
  public createTag(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    createTadDto: CreateTagDto,
  ): Promise<Tag> {
    return this.tagsService.createTag(createTadDto);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete a tag by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The tag has been successfully deleted.',
  })
  @ApiQuery({
    name: 'id',
    type: Number,
    description: 'The id of the tag',
    required: true,
  })
  public deleteTadById(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.deleteTagById(id);
  }
}
