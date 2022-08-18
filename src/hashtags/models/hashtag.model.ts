import {Column, DataType, Model, Table} from 'sequelize-typescript';

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
}
