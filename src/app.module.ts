import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ReactionsModule } from './reactions/reactions.module';
import { RolesModule } from './roles/roles.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    PostsModule,
    UsersModule,
    ReactionsModule,
    RolesModule,
    HashtagsModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'my_blog',
      autoLoadModels: true,
      synchronize: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
