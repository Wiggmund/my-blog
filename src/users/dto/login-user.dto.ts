import {IsEmail, IsString, MinLength} from 'class-validator';
import {PipeStringErrorMessages} from '../../common/pipe-err-messages';
import {ApiProperty} from '@nestjs/swagger';

export class LoginUserDto {
	@ApiProperty({description: 'User email', example: 'example2000@gmail.com'})
	@IsString({message: PipeStringErrorMessages.mustBeString})
	@IsEmail({}, {message: PipeStringErrorMessages.mustBeEmail})
	email: string;


	@IsString({message: PipeStringErrorMessages.mustBeString})
	@MinLength(10, {message: PipeStringErrorMessages.shortString})
	@ApiProperty({description: 'User password', example: 'SomePassword2022@'})
	password: string;
}