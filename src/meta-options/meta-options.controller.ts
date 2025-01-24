import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetadataOptionDto } from './dtos/create-post-metadata-option.dto';
// import { MetaOptions } from './dtos/create-post-metadata-option.dto';

@Controller()
export class MetaOptionsController {
  constructor(
    /**
     * Inject MetaOptionsService
     */
    private readonly metaOptionsService: MetaOptionsService,
  ) {}

  @Post('meta-options')
  public createMetaOptions(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    createMetaOptionsDto: CreatePostMetadataOptionDto,
  ) {
    return this.metaOptionsService.createMetaOptionsForPost(
      createMetaOptionsDto,
    );
  }
}
