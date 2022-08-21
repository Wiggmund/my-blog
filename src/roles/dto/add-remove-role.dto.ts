import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsPositive, IsString, MinLength} from 'class-validator';
import {PipeStringErrorMessages, PipeNumberErrorMessages} from '../../common/pipe-err-messages';

export class AddRemoveRoleDto {
	@IsNumber({}, {message: PipeNumberErrorMessages.mustBeNumber})
	@IsPositive({message: PipeNumberErrorMessages.positive})
	@ApiProperty({description: 'User id', example: 1})
	readonly userId: number;

	@IsString({message: PipeStringErrorMessages.mustBeString})
	@MinLength(4, {message: PipeStringErrorMessages.shortString})
	@ApiProperty({description: 'Role value', example: 'ADMIN'})
	readonly role: string;
}