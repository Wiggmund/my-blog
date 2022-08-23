import {Body, Controller, Get, Param, Post, UseGuards, UsePipes} from '@nestjs/common';
import {CreateRoleDto} from './dto/create-role.dto';
import {RolesService} from './roles.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Role} from './models/role.model';
import {User} from '../users/models/user.model';
import {ValidationPipe} from '../common/pipes/validation.pipe';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtRolesGuard } from 'src/auth/guards/jwt-roles.guard';
import { AddRemoveRoleDto } from './dto/add-remove-role.dto';
import { UsersService } from 'src/users/users.service';

@Roles('ADMIN')
@UseGuards(JwtRolesGuard)
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
	getRoleUsers(@Param('id') id: number) {
		return this.rolesService.getRoleUsers(id);
	}

	@ApiOperation({description: 'Create new role'})
	@ApiResponse({status: 200, type: Role})
	@UsePipes(ValidationPipe)
	@Post()
	createRole(@Body() roleDto: CreateRoleDto) {
		return this.rolesService.createRole(roleDto);
	}

	@ApiOperation({description: 'Add specific role for user with given id'})
	@ApiResponse({status: 200, type: User})
	@UsePipes(ValidationPipe)
	@Post('add')
	addRole(@Body() addRoleDto: AddRemoveRoleDto) {
		return this.rolesService.addRole(addRoleDto);
	}

	@ApiOperation({description: 'Remove specific role for user with given id'})
	@ApiResponse({status: 200, type: User})
	@UsePipes(ValidationPipe)
	@Post('remove')
	removeRole(@Body() removeRoleDto: AddRemoveRoleDto) {
		return this.rolesService.removeRole(removeRoleDto);
	}
}
