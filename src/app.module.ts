import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ReactionsModule } from './reactions/reactions.module';
import { RolesModule } from './roles/roles.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { SequelizeModule } from '@nestjs/sequelize';
import {UtilsModule} from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
	ConfigModule.forRoot({
		cache: true
	}),


	PostsModule,
    UsersModule,
    ReactionsModule,
    RolesModule,
    HashtagsModule,
    UtilsModule,
	AuthModule,

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
