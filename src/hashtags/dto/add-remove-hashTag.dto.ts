import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsPositive, IsString, MinLength} from 'class-validator';
import {PipeStringErrorMessages, PipeNumberErrorMessages} from '../../common/pipe-err-messages';

export class AddRemoveHashTagDto {
	@IsString({message: PipeStringErrorMessages.mustBeString})
	@MinLength(PipeStringErrorMessages.defaultMinLength, {message: PipeStringErrorMessages.shortString})
	@ApiProperty({description: 'HashTag', example: 'javascript'})
	readonly hashTag: string;

	@IsNumber({}, {message: PipeNumberErrorMessages.mustBeNumber})
	@IsPositive({message: PipeNumberErrorMessages.positive})
	@ApiProperty({description: 'Unique post id', example: 1})
	readonly postId: number;
}