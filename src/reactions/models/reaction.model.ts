import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {Post} from '../../posts/models/post.model';
import {PostsReactions} from '../../posts/models/posts-reactions.model';
import {ApiProperty} from '@nestjs/swagger';

interface  ReactionCreationAttrs {
	reaction: string;
}

@Table({tableName: 'reactions'})
export class Reaction extends Model<Reaction, ReactionCreationAttrs> {
	@ApiProperty({
		description: 'Unique reaction id',
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
		description: 'Reaction value',
		example: "like"
	})
	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	reaction: string;

	@BelongsToMany(() => Post, () => PostsReactions)
	posts: Post[]
}
