import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {Role} from './models/role.model';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Role]),
	forwardRef(() => AuthModule),
	forwardRef(() => UsersModule),
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [
	RolesService,
	SequelizeModule
]
})
export class RolesModule {}
