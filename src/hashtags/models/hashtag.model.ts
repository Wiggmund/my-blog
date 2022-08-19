import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {Post} from '../../posts/models/post.model';
import {PostsHashTags} from '../../posts/models/posts-hashTags.model';
import {ApiProperty} from '@nestjs/swagger';

interface  HashTagCreationAttrs {
	hashTag: string;
}

@Table({tableName: 'hashTags'})
export class HashTag extends Model<HashTag, HashTagCreationAttrs> {
	@ApiProperty({
		description: 'Unique hasTag id',
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
		description: 'HashTag',
		example: "javascript"
	})
	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	hashTag: string;

	@BelongsToMany(() => Post, () => PostsHashTags)
	posts: Post[]
}
