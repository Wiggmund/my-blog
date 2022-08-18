import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {User} from './user.model';
import {Role} from '../../roles/models/role.model';


@Table({tableName: 'users_roles', timestamps: false})
export class UsersRoles extends Model<UsersRoles> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	})
	id: number;

	@ForeignKey(() => User)
	@Column({type: DataType.INTEGER})
	userId: number;

	@ForeignKey(() => Role)
	@Column({type: DataType.INTEGER})
	roleId: number
}
