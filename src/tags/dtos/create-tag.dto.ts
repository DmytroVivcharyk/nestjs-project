import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsJSON,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    type: String,
    description: 'The name of the tag',
    example: 'Tag 1',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @ApiProperty({
    description:
      'The slug of the post, slug should only contain lowercase letters and dashes',
    type: String,
    example: 'my-post',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug should only contain lowercase letters and dashes',
  })
  slug: string;

  @ApiPropertyOptional({
    description: 'The description of the tag',
    type: String,
    example: 'This is a tag',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'The JSON schema of the tag',
    type: JSON,
    example: '{"type": "object"}',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'The featured image of the tag',
    type: String,
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;
}
