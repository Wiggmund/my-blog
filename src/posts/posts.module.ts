import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {Post} from './models/post.model';
import {PostsReactions} from './models/posts-reactions.model';
import {PostsHashTags} from './models/posts-hashTags.model';

@Module({
  imports: [SequelizeModule.forFeature([Post, PostsReactions, PostsHashTags])],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
