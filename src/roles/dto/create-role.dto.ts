import {ApiProperty} from '@nestjs/swagger';
import {IsString, MinLength} from 'class-validator';
import {PipeStringErrorMessages} from '../../common/pipe-err-messages';

export class CreateRoleDto {
	@IsString({message: PipeStringErrorMessages.mustBeString})
	@MinLength(PipeStringErrorMessages.defaultMinLength, {message: PipeStringErrorMessages.shortString})
	@ApiProperty({description: 'Role value', example: 'ADMIN'})
	readonly role: string;

	@IsString({message: PipeStringErrorMessages.mustBeString})
	@MinLength(10, {message: PipeStringErrorMessages.shortString})
	@ApiProperty({description: 'Role description', example: 'Administrator'})
	readonly description: string;
}