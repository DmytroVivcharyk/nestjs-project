import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsJSON,
  IsArray,
  Matches,
  IsUrl,
  IsISO8601,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { PostMetadataOptionDto } from './create-post-metadata-option.dto';
import { PostTypeEnum } from '../enums/post-type.enum';
import { PostStatusEnum } from '../enums/post-status.enum';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    type: String,
    example: 'My Post',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  title: string;

  @ApiProperty({
    description: 'The type of the post',
    enum: PostTypeEnum,
    default: PostTypeEnum.Post,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(PostTypeEnum)
  postType: PostTypeEnum;

  @ApiProperty({
    description: 'The status of the post',
    enum: PostStatusEnum,
    default: PostStatusEnum.Draft,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(PostStatusEnum)
  status: PostStatusEnum;

  @ApiProperty({
    description: 'The slug of the post',
    type: String,
    example: 'my-post',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug should only contain lowercase letters and dashes',
  })
  slug: string;

  @ApiPropertyOptional({
    description: 'The content of the post',
    type: String,
    example: 'This is the content of the post',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  content?: string;

  @ApiPropertyOptional({
    description: 'The schema of the post',
    type: String,
    example: '{"type": "object"}',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'The featured image of the post',
    type: String,
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsUrl()
  feturedImageUrl?: string;

  @ApiPropertyOptional({
    description: 'The published ISO8601 date of the post',
    type: Date,
    example: '2020-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsISO8601()
  publishedAt?: Date;

  @ApiPropertyOptional({
    description: 'The tags of the post',
    type: [String],
    example: ['tag1', 'tag2'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'The metadata of the post',
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          example: 'key1',
        },
        value: {
          type: 'string',
          example: 'value1',
        },
      },
    },
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostMetadataOptionDto)
  metaData?: PostMetadataOptionDto[];
}
