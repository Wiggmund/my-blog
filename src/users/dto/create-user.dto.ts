import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsOptional, IsString, MinLength} from 'class-validator';
import {PipeStringErrorMessages} from '../../common/pipe-err-messages';

export class CreateUserDto {
	@IsString({message: PipeStringErrorMessages.mustBeString})
	@MinLength(PipeStringErrorMessages.defaultMinLength, {message: PipeStringErrorMessages.shortString})
	@ApiProperty({description: 'User name', example: 'Jack'})
	readonly username: string;

	@IsString({message: PipeStringErrorMessages.mustBeString})
	@IsEmail({}, {message: PipeStringErrorMessages.mustBeEmail})
	@ApiProperty({description: 'User email', example: 'example2000@gmail.com'})
	readonly email: string;

	@IsString({message: PipeStringErrorMessages.mustBeString})
	@MinLength(10, {message: PipeStringErrorMessages.shortString})
	@ApiProperty({description: 'User password', example: 'SomePassword2022@'})
	readonly password: string;

	@IsString({message: PipeStringErrorMessages.mustBeString})
	@IsOptional()
	@ApiProperty({description: 'User avatar', required: false})
	readonly photo: string;
}