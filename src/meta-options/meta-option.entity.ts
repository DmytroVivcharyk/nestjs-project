import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from 'src/posts/post.entity';

@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'meta_key',
    type: 'json',
    nullable: false,
  })
  metaValue: string;

  @CreateDateColumn({
    name: 'create_date',
    type: 'timestamp',
  })
  createDate: Date;

  @UpdateDateColumn({
    name: 'update_date',
    type: 'timestamp',
  })
  updateDate: Date;

  @OneToOne(() => Post, (post) => post.metaOptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
