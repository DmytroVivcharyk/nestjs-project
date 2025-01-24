import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { CreatePostMetadataOptionDto } from '../dtos/create-post-metadata-option.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    /**
     * Innject MetaOption Repository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}
  public async createMetaOptionsForPost(
    createPostMetadataOptionDto: CreatePostMetadataOptionDto,
  ) {
    const metaOptions = this.metaOptionsRepository.create(
      createPostMetadataOptionDto,
    );
    return await this.metaOptionsRepository.save(metaOptions);
  }
}
