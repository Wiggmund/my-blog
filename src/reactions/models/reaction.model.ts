import {Column, DataType, Model, Table} from 'sequelize-typescript';

interface  ReactionCreationAttrs {
	reaction: string;
}

@Table({tableName: 'hashTags'})
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
}
