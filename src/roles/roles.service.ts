import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Role} from './models/role.model';
import {CreateRoleDto} from './dto/create-role.dto';
import {User} from '../users/models/user.model';

@Injectable()
export class RolesService {
	constructor(
		@InjectModel(Role) private roleModel
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
		return await this.roleModel.create(roleDto);
	}
}
