import {ApiProperty} from '@nestjs/swagger';

export class CreateHashTagDto {
	@ApiProperty({
		description: 'HashTag',
		example: 'javascript'
	})
	readonly hashTag: string;
}