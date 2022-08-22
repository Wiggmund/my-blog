import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from '../users/users.module';
import {JwtModule} from '@nestjs/jwt';
import {TokenService} from './token.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {RefreshToken} from './models/token.model';
import { JwtRolesGuard } from './guards/jwt-roles.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({}),
    SequelizeModule.forFeature([RefreshToken])
  ],
  providers: [
    AuthService,
    TokenService,
	JwtRolesGuard
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
	TokenService,
	JwtRolesGuard
  ]
})
export class AuthModule {}
