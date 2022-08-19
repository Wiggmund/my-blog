import {ApiProperty} from '@nestjs/swagger';

export class AddRemoveHashTagDto {
	@ApiProperty({
		description: 'HashTag',
		example: 'javascript'
	})
	readonly hashTag: string;

	@ApiProperty({
		description: 'Unique post id',
		example: 1
	})
	readonly postId: number;
}