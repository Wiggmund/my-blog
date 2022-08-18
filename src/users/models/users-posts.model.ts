import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {User} from './user.model';
import {Post} from '../../posts/models/post.model';


@Table({tableName: 'users_posts', timestamps: false})
export class UsersPosts extends Model<UsersPosts> {
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

	@ForeignKey(() => Post)
	@Column({type: DataType.INTEGER})
	postId: number
}
