import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {Post} from '../../posts/models/post.model';
import {PostsReactions} from '../../posts/models/posts-reactions.model';

interface  ReactionCreationAttrs {
	reaction: string;
}

@Table({tableName: 'reactions'})
export class Reaction extends Model<Reaction, ReactionCreationAttrs> {
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
	reaction: string;

	@BelongsToMany(() => Post, () => PostsReactions)
	posts: Post[]
}
