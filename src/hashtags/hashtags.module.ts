import { Module } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { HashtagsController } from './hashtags.controller';

@Module({
  providers: [HashtagsService],
  controllers: [HashtagsController]
})
export class HashtagsModule {}
