import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from './models/user.model';
import {UsersPosts} from './models/users-posts.model';
import {UsersRoles} from './models/users-roles.model';
import {RolesModule} from '../roles/roles.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UsersPosts, UsersRoles]),
    RolesModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
