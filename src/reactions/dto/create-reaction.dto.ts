import {ApiProperty} from '@nestjs/swagger';
import {IsString, MinLength} from 'class-validator';
import {PipeStringErrorMessages} from '../../common/pipe-err-messages';

export class CreateReactionDto {
	@IsString({message: PipeStringErrorMessages.mustBeString})
	@MinLength(PipeStringErrorMessages.defaultMinLength, {message: PipeStringErrorMessages.shortString})
	@ApiProperty({description: 'Reaction', example: 'like'})
	readonly reaction: string;
}