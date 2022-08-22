import {Controller, Get, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ValidationPipe} from '../common/pipes/validation.pipe';
import { RefreshToken } from './models/token.model';
import { TokenService } from './token.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
	constructor(
		private tokenService: TokenService
	) {}

	@ApiOperation({description: 'Get all refresh tokens'})
	@ApiResponse({status: 200, type: [RefreshToken]})
	@UsePipes(ValidationPipe)
	@Get('/tokens')
	getAllRefreshTokens() {
		return this.tokenService.getAllRefreshTokens();
	}
}
