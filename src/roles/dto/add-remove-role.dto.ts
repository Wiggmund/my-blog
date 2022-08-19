import {ApiProperty} from '@nestjs/swagger';

export class AddRemoveRoleDto {
	@ApiProperty({
		description: 'User id',
		example: 1
	})
	readonly userId: number;

	@ApiProperty({
		description: 'Role value',
		example: 'ADMIN'
	})
	readonly role: string;
}