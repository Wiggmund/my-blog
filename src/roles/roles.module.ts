import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {Role} from './models/role.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Role])
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [
    RolesService,
    SequelizeModule
  ]
})
export class RolesModule {}
