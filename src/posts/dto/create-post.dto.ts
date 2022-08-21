import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsPositive, IsString, MaxLength, MinLength} from 'class-validator';
import {PipeStringErrorMessages, PipeNumberErrorMessages} from '../../common/pipe-err-messages';

export class CreatePostDto {
	@IsString({message: PipeStringErrorMessages.mustBeString})
	@MinLength(5, {message: PipeStringErrorMessages.shortString})
	@MaxLength(100, {message: PipeStringErrorMessages.longString})
	@ApiProperty({description: 'Post title', example: 'My first Post'})
	readonly title: string;

	@IsString({message: PipeStringErrorMessages.mustBeString})
	@MinLength(10, {message: PipeStringErrorMessages.shortString})
	@ApiProperty({description: 'Post\'s  content', example: 'We are going to talk...'})
	readonly content: string;

	@IsNumber({}, {message: PipeNumberErrorMessages.mustBeNumber})
	@IsPositive({message: PipeNumberErrorMessages.positive})
	@ApiProperty({description: 'Post author', example: 1})
	readonly userId: number;

	@IsString({message: PipeStringErrorMessages.mustBeString, each: true})
	@MinLength(PipeStringErrorMessages.defaultMinLength, {message: PipeStringErrorMessages.shortString})
	@ApiProperty({type: [String], description: 'Post hashTags', example: '[frontend, javascript, react]'})
	readonly hashTag: string[];
}