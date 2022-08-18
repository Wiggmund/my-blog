import {Column, DataType, Model, Table} from 'sequelize-typescript';

interface  PostCreationAttrs {
	title: string;
	content: string;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
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
	title: string;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	content: string;
}
