import { ApiProperty } from '@nestjs/swagger';
import {User} from '../../users/models/user.model';

export class UserPayloadDto {
	@ApiProperty({description: 'Unique user id', example: 1})
	id: number;
	
	@ApiProperty({description: 'User name', example: 'Jack'})
	username: string;
	
	@ApiProperty({description: 'Role values', example: '[ADMIN, USER]'})
	roles: string[];

	constructor(user: User, roles: string[]) {
		this.id = user.id;
		this.username = user.username;
		this.roles = roles;
	}
}