import {Body, Controller, Get, Param, Post, Res, UseGuards, UsePipes} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {User} from './models/user.model';
import {AddRemoveRoleDto} from '../roles/dto/add-remove-role.dto';
import {ValidationPipe} from '../common/pipes/validation.pipe';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtRolesGuard } from 'src/auth/guards/jwt-roles.guard';

@Roles('ADMIN')
@UseGuards(JwtRolesGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(
		private usersService: UsersService
	) {}

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
