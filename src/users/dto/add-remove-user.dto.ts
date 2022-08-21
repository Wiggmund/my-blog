import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsPositive} from 'class-validator';
import {PipeNumberErrorMessages} from '../../common/pipe-err-messages';

export class AddRemoveUserDto {
	@IsNumber({}, {message: PipeNumberErrorMessages.mustBeNumber})
	@IsPositive({message: PipeNumberErrorMessages.positive})
	@ApiProperty({description: 'Unique user id', example: 1})
	userId: number;

	@IsNumber({}, {message: PipeNumberErrorMessages.mustBeNumber})
	@IsPositive({message: PipeNumberErrorMessages.positive})
	@ApiProperty({description: 'Unique post id', example: 1})
	postId: number;
}