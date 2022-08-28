import { ApiProperty } from '@nestjs/swagger';
import { UserPayloadDto } from './user-payload.dto';

export class UserDataDto {
	@ApiProperty({description: 'User\' refresh token', example: 'sdfjSKJdfksDF...'})
	refreshToken: string;

	@ApiProperty({description: 'User\' access token', example: 'sdfjSKJdfksDF...'})
	accessToken: string;

	@ApiProperty({description: 'User payload data'})
	user: UserPayloadDto;
}