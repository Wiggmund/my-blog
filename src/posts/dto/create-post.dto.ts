import {ApiProperty} from '@nestjs/swagger';

export class CreatePostDto {
	@ApiProperty({
		description: 'Post title',
		example: 'My first Post'
	})
	readonly title: string;

	@ApiProperty({
		description: 'Post\'s  content',
		example: 'We are going to talk...'
	})
	readonly content: string;

	@ApiProperty({
		description: 'Post author',
		example: 1
	})
	readonly userId: number;

	@ApiProperty({
		type: [String],
		description: 'Post hashTags',
		example: '[frontend, javascript, react]'
	})
	readonly hashTag: string[];
}