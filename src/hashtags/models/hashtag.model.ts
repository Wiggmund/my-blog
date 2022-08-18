import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {Post} from '../../posts/models/post.model';
import {PostsHashTags} from '../../posts/models/posts-hashTags.model';

interface  HashTagCreationAttrs {
	hashTag: string;
}

@Table({tableName: 'hashTags'})
export class HashTag extends Model<HashTag, HashTagCreationAttrs> {
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
	hashTag: string;

	@BelongsToMany(() => Post, () => PostsHashTags)
	posts: Post[]
}
