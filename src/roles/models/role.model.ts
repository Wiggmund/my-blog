import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {UsersRoles} from '../../users/models/users-roles.model';
import {User} from '../../users/models/user.model';
import {ApiProperty} from '@nestjs/swagger';

export interface  RoleCreationAttrs {
	role: string;
	description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
	@ApiProperty({
		description: 'Unique role id',
		example: 1
	})
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	})
	id: number;


	@ApiProperty({
		description: 'Role value',
		example: 'ADMIN'
	})
	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	role: string;


	@ApiProperty({
		description: 'Role description',
		example: 'Administrator'
	})
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	description: string;

	@BelongsToMany(() => User, () => UsersRoles)
	users: User[]
}
