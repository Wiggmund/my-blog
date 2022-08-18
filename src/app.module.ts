import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ReactionsModule } from './reactions/reactions.module';
import { RolesModule } from './roles/roles.module';
import { HashtagsModule } from './hashtags/hashtags.module';

@Module({
  imports: [
    PostsModule,
    UsersModule,
    ReactionsModule,
    RolesModule,
    HashtagsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
