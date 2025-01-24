import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptionsController } from './meta-options.controller';
import { MetaOption } from './meta-option.entity';
import { MetaOptionsService } from './providers/meta-options.service';
@Module({
  controllers: [MetaOptionsController],
  providers: [MetaOptionsService],
  imports: [TypeOrmModule.forFeature([MetaOption])],
  exports: [MetaOptionsService],
})
export class MetaOptionsModule {}
