import {Body, Controller, Get, Param, Post, Res, UsePipes} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {User} from './models/user.model';
import {AddRemoveRoleDto} from '../roles/dto/add-remove-role.dto';
import {ValidationPipe} from '../common/pipes/validation.pipe';
import { AuthService } from 'src/auth/auth.service';
import { RefreshAccessTokens } from 'src/auth/dto/refresh-access-tokens.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { REFRESH_TOKEN_EXPIRES_DAYS } from 'src/common/constants';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(
		private usersService: UsersService,
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

	@ApiOperation({description: 'Retrieve all users'})
	@ApiResponse({status: 200, type: [User]})
	@Get()
	getAllUsers() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({description: 'Get user by id'})
	@ApiResponse({status: 200, type: User})
	@Get(':id')
	getUserById(@Param('id') id: number) {
		return this.usersService.getUserById(id);
	}

	@ApiOperation({description: 'Retrieve all roles for specific user'})
	@ApiResponse({status: 200, type: [String]})
	@Get(':id/roles')
	getUserRoles(@Param('id') id: number) {
		return this.usersService.getUserRoles(id);
	}

	@ApiOperation({description: 'Retrieve all users for specific post'})
	@ApiResponse({status: 200, type: [String]})
	@Get(':id/posts')
	getUserPosts(@Param('id') id: number) {
		return this.usersService.getUserPosts(id);
	}

	@ApiOperation({description: 'Create new user'})
	@ApiResponse({status: 200, type: User})
	@UsePipes(ValidationPipe)
	@Post()
	createUser(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto);
	}

	@ApiOperation({description: 'Add specific role for user with given id'})
	@ApiResponse({status: 200, type: User})
	@UsePipes(ValidationPipe)
	@Post('add/role')
	addRole(@Body() addRoleDto: AddRemoveRoleDto) {
		return this.usersService.addRole(addRoleDto);
	}

	@ApiOperation({description: 'Remove specific role for user with given id'})
	@ApiResponse({status: 200, type: User})
	@UsePipes(ValidationPipe)
	@Post('remove/role')
	removeRole(@Body() removeRoleDto: AddRemoveRoleDto) {
		return this.usersService.removeRole(removeRoleDto);
	}
}
