import { IsNotEmpty, IsString } from 'class-validator';

export class PostMetadataOptionDto {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  value: any;
}
