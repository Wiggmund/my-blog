import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsString } from 'class-validator';
import { PipeStringErrorMessages } from 'src/common/pipe-err-messages';

export class RefreshAccessTokens {
	@ApiProperty({description: 'User\' refresh token', example: 'sdfjSKJdfksDF...'})
	@IsString({message: PipeStringErrorMessages.mustBeString})
	@IsJWT({message: PipeStringErrorMessages.mustBeJwt})
	refreshToken: string;

	@ApiProperty({description: 'User\' access token', example: 'sdfjSKJdfksDF...'})
	@IsString({message: PipeStringErrorMessages.mustBeString})
	@IsJWT({message: PipeStringErrorMessages.mustBeJwt})
	accessToken: string;
}