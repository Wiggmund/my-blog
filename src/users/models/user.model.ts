import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {Post} from '../../posts/models/post.model';
import {Role} from '../../roles/models/role.model';
import {UsersPosts} from './users-posts.model';
import {UsersRoles} from './users-roles.model';

interface  UserCreationAttrs {
	username: string;
	email: string;
	password: string;
	photo: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
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
	username: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	email: string;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	password: string;

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
