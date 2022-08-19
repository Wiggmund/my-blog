import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({
		description: 'User name',
		example: 'Jack'
	})
	readonly username: string;

	@ApiProperty({
		description: 'User email',
		example: 'example2000@gmail.com'
	})
	readonly email: string;

	@ApiProperty({
		description: 'User password',
		example: 'SomePassword2022@'
	})
	readonly password: string;

	@ApiProperty({
		description: 'User avatar',
		required: false
	})
	readonly photo: string;
}