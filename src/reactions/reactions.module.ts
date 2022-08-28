import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {Reaction} from './models/reaction.model';
import {UtilsModule} from '../utils/utils.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Reaction]),
    UtilsModule,
	AuthModule
  ],
  providers: [ReactionsService],
  controllers: [ReactionsController],
  exports: [ReactionsService]
})
export class ReactionsModule {}
