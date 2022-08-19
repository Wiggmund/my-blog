import { Module } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { HashtagsController } from './hashtags.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {HashTag} from './models/hashtag.model';
import {UtilsModule} from '../utils/utils.module';

@Module({
  imports: [
    SequelizeModule.forFeature([HashTag]),
    UtilsModule
  ],
  providers: [HashtagsService],
  controllers: [HashtagsController],
  exports: [HashtagsService]
})
export class HashtagsModule {}
