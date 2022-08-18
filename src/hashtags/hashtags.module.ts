import { Module } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { HashtagsController } from './hashtags.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {HashTag} from './models/hashtag.model';

@Module({
  imports: [SequelizeModule.forFeature([HashTag])],
  providers: [HashtagsService],
  controllers: [HashtagsController]
})
export class HashtagsModule {}
