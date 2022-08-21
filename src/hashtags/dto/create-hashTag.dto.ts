import {ApiProperty} from '@nestjs/swagger';
import {IsString, MinLength} from 'class-validator';
import {PipeStringErrorMessages} from '../../common/pipe-err-messages';

export class CreateHashTagDto {
	@IsString({message: PipeStringErrorMessages.mustBeString})
	@MinLength(PipeStringErrorMessages.defaultMinLength, {message: PipeStringErrorMessages.shortString})
	@ApiProperty({description: 'HashTag', example: 'javascript'})
	readonly hashTag: string;
}