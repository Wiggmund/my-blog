import {ApiProperty} from '@nestjs/swagger';

export class AddRemoveReactionDto {
	@ApiProperty({
		description: 'Reaction',
		example: 'like'
	})
	reaction: string;

	@ApiProperty({
		description: 'Unique post id',
		example: 1
	})
	postId: number;
}