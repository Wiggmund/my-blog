import {Column, DataType, Model, Table} from 'sequelize-typescript';

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
}
