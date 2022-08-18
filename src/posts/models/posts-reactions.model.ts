import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {Post} from './post.model';
import {Reaction} from '../../reactions/models/reaction.model';


@Table({tableName: 'posts_reactions', timestamps: false})
export class PostsReactions extends Model<PostsReactions> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	})
	id: number;

	@ForeignKey(() => Post)
	@Column({type: DataType.INTEGER})
	postId: number;

	@ForeignKey(() => Reaction)
	@Column({type: DataType.INTEGER})
	reactionId: number
}
