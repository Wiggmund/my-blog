import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {UsersRoles} from '../../users/models/users-roles.model';
import {User} from '../../users/models/user.model';

interface  RoleCreationAttrs {
	role: string;
	description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	})
	id: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	role: string;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	description: string;

	@BelongsToMany(() => User, () => UsersRoles)
	users: User[]
}
