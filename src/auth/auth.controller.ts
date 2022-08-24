import {Body, Controller, Get, Post, Res, UseGuards, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { Response } from 'express';
import { Cookies } from 'src/common/decorators/cookies.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import {ValidationPipe} from '../common/pipes/validation.pipe';
import { AuthService } from './auth.service';
import { UserDataDto } from './dto/user-data.dto';
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
	@ApiResponse({status: 200, type: UserDataDto})
	@UsePipes(ValidationPipe)
	@Post('/register')
	async register(
		@Body() userDto: CreateUserDto,
		@Res({ passthrough: true }) response: Response
	) {
		const userData = await this.authService.register(userDto);
		this.tokenService.saveTokenToCookie(userData.refreshToken, response);
		return userData;
	}

	@ApiOperation({description: 'Login into user account'})
	@ApiResponse({status: 200, type: UserDataDto})
	@UsePipes(ValidationPipe)
	@Post('/login')
	async login(
		@Body() userDto: LoginUserDto,
		@Res({ passthrough: true }) response: Response
	) {
		const userData = await this.authService.login(userDto);
		this.tokenService.saveTokenToCookie(userData.refreshToken, response);
		return userData;
	}

	@ApiOperation({description: 'Logout from user account'})
	@ApiResponse({status: 200})
	@Post('/logout')
	async logout(
		@Res({passthrough: true}) response: Response,
		@Cookies('refreshToken') refreshToken: string
	) {
		if (refreshToken) {
			await this.tokenService.removeToken(refreshToken);
		}
		response.clearCookie('refreshToken');
	}


	@ApiOperation({description: 'Refresh user refreshToken and get new pair access/refresh tokens'})
	@ApiResponse({status: 200, type: UserDataDto})
	@Get('/refresh')
	async refresh(
		@Res({passthrough: true}) response: Response,
		@Cookies('refreshToken') refreshToken: string
	) {
		const newTokens = await this.tokenService.refreshToken(refreshToken);
		this.tokenService.saveTokenToCookie(newTokens.refreshToken, response);
		return newTokens;
	}

	@ApiOperation({description: 'Get all refresh tokens'})
	@ApiResponse({status: 200, type: [RefreshToken]})
	@Roles('ADMIN')
	@UseGuards(JwtRolesGuard)
	@Get('/tokens')
	getAllRefreshTokens() {
		return this.tokenService.getAllRefreshTokens();
	}
}
