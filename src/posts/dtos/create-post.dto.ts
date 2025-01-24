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
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { CreatePostMetadataOptionDto } from '../../meta-options/dtos/create-post-metadata-option.dto';
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
    description: 'Array of ids  of tags',
    type: [String],
    example: [34, 27346],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    description: 'The metadata of the post',
    type: 'object',
    required: false,
    items: {
      type: 'object',
      properties: {
        meta: {
          type: 'json',
          example: '{"key": "value"}',
          description: 'The meta value is a JSON string',
        },
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetadataOptionDto)
  metaOptions?: CreatePostMetadataOptionDto | null;

  @ApiProperty({
    description: 'The user id of the post',
    type: Number,
    required: true,
    example: 1,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
