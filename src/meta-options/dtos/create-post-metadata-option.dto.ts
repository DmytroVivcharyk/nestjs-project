import { IsNotEmpty, IsJSON } from 'class-validator';

export class CreatePostMetadataOptionDto {
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
