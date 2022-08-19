import {ApiProperty} from '@nestjs/swagger';

export class AddRemoveUserDto {
	@ApiProperty({
		description: 'Unique user id',
		example: 1
	})
	userId: number;

	@ApiProperty({
		description: 'Unique post id',
		example: 1
	})
	postId: number;
}