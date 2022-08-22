import {Body, Controller, Get, Post, Res, UseGuards, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { Response } from 'express';
import { REFRESH_TOKEN_EXPIRES_DAYS } from 'src/common/constants';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import {ValidationPipe} from '../common/pipes/validation.pipe';
import { AuthService } from './auth.service';
import { RefreshAccessTokens } from './dto/refresh-access-tokens.dto';
import { JwtRolesGuard } from './guards/jwt-roles.guard';
import { RefreshToken } from './models/token.model';
import { TokenService } from './token.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
	constructor(
		private tokenService: TokenService,
		private authService: AuthService
	) {}

	@ApiOperation({description: 'Register a new user'})
	@ApiResponse({status: 200, type: RefreshAccessTokens})
	@UsePipes(ValidationPipe)
	@Post('/register')
	async register(
		@Body() userDto: CreateUserDto,
		@Res({ passthrough: true }) response: Response
	) {
		const userData = await this.authService.register(userDto);
		response.cookie('refreshToken', userData.refreshToken, {
			httpOnly: true,
			maxAge: REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000
		})
		return userData;
	}

	@ApiOperation({description: 'Login into user account'})
	@ApiResponse({status: 200, type: RefreshAccessTokens})
	@UsePipes(ValidationPipe)
	@Post('/login')
	async login(
		@Body() userDto: LoginUserDto,
		@Res({ passthrough: true }) response: Response
	) {
		const userData = await this.authService.login(userDto);
		response.cookie('refreshToken', userData.refreshToken, {
			httpOnly: true,
			maxAge: REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000
		})
		return userData;
	}

	@ApiOperation({description: 'Get all refresh tokens'})
	@ApiResponse({status: 200, type: [RefreshToken]})
	@Roles('ADMIN')
	@UseGuards(JwtRolesGuard)
	@UsePipes(ValidationPipe)
	@Get('/tokens')
	getAllRefreshTokens() {
		return this.tokenService.getAllRefreshTokens();
	}
}
