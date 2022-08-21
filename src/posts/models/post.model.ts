import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {UsersPosts} from '../../users/models/users-posts.model';
import {User} from '../../users/models/user.model';
import {Reaction} from '../../reactions/models/reaction.model';
import {HashTag} from '../../hashtags/models/hashtag.model';
import {PostsReactions} from './posts-reactions.model';
import {PostsHashTags} from './posts-hashTags.model';
import {ApiProperty} from '@nestjs/swagger';

interface  PostCreationAttrs {
	title: string;
	content: string;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
	@ApiProperty({description: 'Unique post id', example: 1})
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true
	})
	id: number;


	@ApiProperty({description: 'Post title', example: 'My first Post'})
	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	title: string;

	@ApiProperty({description: 'Post content', example: 'We are going to talk...'})
	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	content: string;

	@BelongsToMany(() => User, () => UsersPosts)
	users: User[]

	@BelongsToMany(() => Reaction, () => PostsReactions)
	reactions: Reaction[]

	@BelongsToMany(() => HashTag, () => PostsHashTags)
	hashTags: HashTag[]
}
