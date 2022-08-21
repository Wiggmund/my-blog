import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {Post} from '../../posts/models/post.model';
import {Role} from '../../roles/models/role.model';
import {UsersPosts} from './users-posts.model';
import {UsersRoles} from './users-roles.model';
import {ApiProperty} from '@nestjs/swagger';

interface  UserCreationAttrs {
	username: string;
	email: string;
	password: string;
	photo: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({description: 'Unique user id', example: 1})
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	})
	id: number;


	@ApiProperty({description: 'User name', example: 'Jack'})
	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	username: string;


	@ApiProperty({description: 'User email', example: 'example2000@gmail.com'})
	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	email: string;


	@ApiProperty({description: 'User password', example: 'SomePassword2022@'})
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	password: string;


	@ApiProperty({description: 'User avatar', required: false})
	@Column({
		type: DataType.STRING,
		allowNull: true
	})
	photo: string;

	@BelongsToMany(() => Post, () => UsersPosts)
	posts: Post[]

	@BelongsToMany(() => Role, () => UsersRoles)
	roles: Role[]
}
