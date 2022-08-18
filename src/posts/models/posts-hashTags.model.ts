import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {Post} from './post.model';
import {HashTag} from '../../hashtags/models/hashtag.model';


@Table({tableName: 'posts_hashTags', timestamps: false})
export class PostsHashTags extends Model<PostsHashTags> {
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

	@ForeignKey(() => HashTag)
	@Column({type: DataType.INTEGER})
	hashTagId: number
}
