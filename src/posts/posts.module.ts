import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {Post} from './models/post.model';
import {PostsReactions} from './models/posts-reactions.model';
import {PostsHashTags} from './models/posts-hashTags.model';
import {ReactionsModule} from '../reactions/reactions.module';
import {UsersModule} from '../users/users.module';
import {HashtagsModule} from '../hashtags/hashtags.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Post, PostsReactions, PostsHashTags]),
    ReactionsModule,
    HashtagsModule,
    UsersModule,
	AuthModule
  ],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
