import {ApiProperty} from '@nestjs/swagger';

export class CreateRoleDto {
	@ApiProperty({
		description: 'Role value',
		example: 'ADMIN'
	})
	readonly role: string;

	@ApiProperty({
		description: 'Role description',
		example: 'Administrator'
	})
	readonly description: string;
}