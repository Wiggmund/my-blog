import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from './models/user.model';
import {CreateUserDto} from './dto/create-user.dto';
import {RolesService} from '../roles/roles.service';
import {Role, RoleCreationAttrs} from '../roles/models/role.model';
import {Post} from '../posts/models/post.model';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private userModel,
		@InjectModel(Role) private roleModel,
		private rolesService: RolesService
	) {}

	async getAllUsers(): Promise<User[]> {
		return this.userModel.findAll();
	}

	async getUserByEmail(email: string): Promise<User> {
		return this.userModel.findOne({where: {email}});
	}

	async getUserById(id: number): Promise<User> {
		return await this.userModel.findByPk(id);
	}

	async getUserRoles(id: number): Promise<string[]> {
		const user = await this.isUserExists(id, [Role]);
		const roleObjects = user.roles;
		return roleObjects.map((roleObject: Role) => roleObject.role);
	}

	async getUserPosts(id: number): Promise<Post[]> {
		const user = await this.isUserExists(id, [Post]);
		const postObjects = user.posts;
		return postObjects;
	}

	async createUser(userDto: CreateUserDto): Promise<User> {
		const newUser = await this.userModel.create(userDto);
		let defaultRole = await this.rolesService.getRoleByValue('USER');
		if (!defaultRole) {
			defaultRole = await this.roleModel.create({
				role: 'USER',
				description: 'Usual user'
			});
		}
		await newUser.$add('roles', defaultRole);
		return newUser;
	}

	private async isUserExists(id: number, include): Promise<User> {
		const user = await this.userModel.findByPk(id, {include});
		if (!user) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		return user;
	}
}
