import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {Reaction} from './models/reaction.model';

@Module({
  imports: [SequelizeModule.forFeature([Reaction])],
  providers: [ReactionsService],
  controllers: [ReactionsController]
})
export class ReactionsModule {}
