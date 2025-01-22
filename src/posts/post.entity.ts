import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PostStatusEnum } from './enums/post-status.enum';
import { PostTypeEnum } from './enums/post-type.enum';
import { PostMetadataOptionDto } from './dtos/create-post-metadata-option.dto';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    name: 'post_type',
    type: 'enum',
    enum: PostTypeEnum,
    default: PostTypeEnum.Post,
    nullable: false,
  })
  postType: PostTypeEnum;

  @Column({
    name: 'status',
    type: 'enum',
    enum: PostStatusEnum,
    default: PostStatusEnum.Draft,
    nullable: false,
  })
  status: PostStatusEnum;

  @Column({
    name: 'slug',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    name: 'content',
    type: 'text',
    nullable: true,
  })
  content: string;

  @Column({
    name: 'schema',
    type: 'json',
    nullable: true,
  })
  schema: string;

  @Column({
    name: 'fetured_image_url',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  feturedImageUrl?: string;

  @Column({
    name: 'published_at',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  publishedAt: Date;

  @Column({
    name: 'tags',
    type: 'simple-array',
    nullable: true,
  })
  tags: string[];

  @Column({
    name: 'meta_data',
    type: 'array',
    nullable: true,
  })
  metaData: PostMetadataOptionDto[];
}
