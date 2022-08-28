import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, UseGuards, UsePipes} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {User} from './models/user.model';
import {AddRemoveRoleDto} from '../roles/dto/add-remove-role.dto';
import {ValidationPipe} from '../common/pipes/validation.pipe';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtRolesGuard } from '../auth/guards/jwt-roles.guard';
import { RolesService } from '../roles/roles.service';

@Roles('ADMIN')
@UseGuards(JwtRolesGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(
		private usersService: UsersService,
		private rolesService: RolesService
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

	@ApiOperation({description: 'Delete user'})
	@ApiResponse({status: 200, type: Number, description: 'Returns number of deleted users'})
	@Delete()
	deleteUser(@Body('id', ParseIntPipe) id: number) {
		console.log(id);
		return this.usersService.deleleUser(id);
	}

	@ApiOperation({description: 'Add specific role for user with given id'})
	@ApiResponse({status: 200, type: User})
	@UsePipes(ValidationPipe)
	@Patch('roles')
	addRole(@Body() addRoleDto: AddRemoveRoleDto) {
		return this.rolesService.addRole(addRoleDto);
	}

	@ApiOperation({description: 'Remove specific role for user with given id'})
	@ApiResponse({status: 200, type: User})
	@UsePipes(ValidationPipe)
	@Delete('roles')
	removeRole(@Body() removeRoleDto: AddRemoveRoleDto) {
		return this.rolesService.removeRole(removeRoleDto);
	}
}
