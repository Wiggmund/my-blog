import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {Role} from './models/role.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Role]),
	forwardRef(() => AuthModule)
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [
    RolesService,
    SequelizeModule
  ]
})
export class RolesModule {}
