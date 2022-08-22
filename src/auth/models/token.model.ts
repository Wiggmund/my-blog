import {BelongsTo, Column, DataType, HasOne, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';
import {User} from '../../users/models/user.model';

interface TokenCreationAttrs {
	token: string;
}

@Table({tableName: 'refreshTokens'})
export class RefreshToken extends Model<RefreshToken, TokenCreationAttrs> {
	@ApiProperty({description: 'Unique refreshToken id', example: 1})
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true
	})
	id: number;

	@ApiProperty({description: 'Refresh token', example: 'asdjAJSDasjdasdjASdjASDj...'})
	@Column({
		type: DataType.STRING,
		unique: true
	})
	token: string;

	@BelongsTo(() => User, 'userId')
	user: User
}