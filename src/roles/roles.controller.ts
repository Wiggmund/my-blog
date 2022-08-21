import {Body, Controller, Get, Param, Post, UsePipes} from '@nestjs/common';
import {CreateRoleDto} from './dto/create-role.dto';
import {RolesService} from './roles.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Role} from './models/role.model';
import {User} from '../users/models/user.model';
import {ValidationPipe} from '../common/pipes/validation.pipe';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
	constructor(
		private rolesService: RolesService
	) {}

	@ApiOperation({description: 'Retrieve all roles'})
	@ApiResponse({status: 200, type: [Role]})
	@Get()
	getAllRoles() {
		return this.rolesService.getAllRoles();
	}

	@ApiOperation({description: 'Get role by id'})
	@ApiResponse({status: 200, type: Role})
	@Get(':id')
	getRoleById(@Param('id') id: number) {
		return this.rolesService.getRoleById(id);
	}

	@ApiOperation({description: 'Get users which have this role id'})
	@ApiResponse({status: 200, type: [User]})
	@Get(':id/users')
	getRolePosts(@Param('id') id: number) {
		return this.rolesService.getRoleUsers(id);
	}

	@ApiOperation({description: 'Create new role'})
	@ApiResponse({status: 200, type: Role})
	@UsePipes(ValidationPipe)
	@Post()
	createRole(@Body() roleDto: CreateRoleDto) {
		return this.rolesService.createRole(roleDto);
	}
}
