import { IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query-dto';

export class GetPostsBaseDto {
  @ApiPropertyOptional({
    type: Date,
    description: 'The start date of the post',
    example: '2020-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @ApiPropertyOptional({
    type: Date,
    description: 'The end date of the post',
    example: '2020-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;
}

export class GetPostsDto extends IntersectionType(
  GetPostsBaseDto,
  PaginationQueryDto,
) {}
