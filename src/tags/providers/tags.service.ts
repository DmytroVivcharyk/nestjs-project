import { In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { Tag } from './../tag.entity';

@Injectable()
export class TagsService {
  constructor(
    /**
     * Inject the Tag Repository
     */
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(tag);
  }

  public async getTagsByPostId(tags: number[]): Promise<Tag[]> {
    return await this.tagRepository.find({
      where: { id: In(tags) },
    });
  }

  public async deleteTagById(id: number) {
    return await this.tagRepository.delete(id);
  }
}
