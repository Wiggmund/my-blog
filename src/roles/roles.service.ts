import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Role} from './models/role.model';
import {CreateRoleDto} from './dto/create-role.dto';
import {User} from '../users/models/user.model';
import { AddRemoveRoleDto } from './dto/add-remove-role.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesService {
	constructor(
		@InjectModel(Role) private roleModel: typeof Role,
		@Inject(forwardRef(() => UsersService)) private usersService
	) {}

	async getAllRoles(): Promise<Role[]> {
		return this.roleModel.findAll();
	}

	async getRoleByValue(role: string): Promise<Role> {
		return this.roleModel.findOne({where: {role: role.toUpperCase()}})
	}

	async getRoleById(id: number): Promise<Role> {
		return this.roleModel.findByPk(id);
	}

	async getRoleUsers(roleId: number): Promise<User[]> {
		const role = await this.getRoleById(roleId);
		if (!role) {
			throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
		}

		return role.$get('users');
	}

	async createRole(roleDto: CreateRoleDto): Promise<Role> {
		return await this.roleModel.create(
			{
				...roleDto,
				role: roleDto.role.toUpperCase()
			}
		);
	}

	async addRole(addRoleDto: AddRemoveRoleDto): Promise<User> {
		const {user, role} = await this.getUserAndRole(addRoleDto);
		await user.$add('roles', role);

		return user;
	}

	async removeRole(removeRoleDto: AddRemoveRoleDto): Promise<User> {
		const {user, role} = await this.getUserAndRole(removeRoleDto);

		if (await user.$has('roles', role)) {
			await user.$remove('roles', role);
		}

		return user;
	}

	private async getUserAndRole(dto: AddRemoveRoleDto) {
		const user = await this.usersService.getUserById(dto.userId);
		if (!user) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		const role = await this.getRoleByValue(dto.role);
		if (!role) {
			throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
		}

		return {user, role};
	}
}
