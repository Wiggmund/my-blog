import {ApiProperty} from '@nestjs/swagger';

export class CreateReactionDto {
	@ApiProperty({
		description: 'Reaction',
		example: 'like'
	})
	readonly reaction: string;
}