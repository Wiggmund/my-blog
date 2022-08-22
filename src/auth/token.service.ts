import {Injectable} from '@nestjs/common';
import {ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES_MINUTES, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRES_DAYS} from '../common/constants';
import {JwtService} from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { RefreshToken } from './models/token.model';
import { User } from 'src/users/models/user.model';
import { RefreshAccessTokens } from './dto/refresh-access-tokens.dto';

@Injectable()
export class TokenService {
	constructor(
		@InjectModel(RefreshToken) private tokenModel,
		private jwtService: JwtService
	) {}

	generateToken(payload): RefreshAccessTokens {
		const accessToken = this.jwtService.sign(payload, {
			secret: ACCESS_TOKEN,
			expiresIn: `${ACCESS_TOKEN_EXPIRES_MINUTES}m`
		});

		const refreshToken = this.jwtService.sign(payload, {
			secret: REFRESH_TOKEN,
			expiresIn: `${REFRESH_TOKEN_EXPIRES_DAYS}d`
		});

		return {accessToken, refreshToken};
	}

	async validateAccessToken(token: string) {

	}

	async saveToken(userId: number, refreshToken: string): Promise<RefreshToken> {
		const tokenData = await this.tokenModel.findOne({where: {userId}});
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}

		return this.tokenModel.create({token: refreshToken, userId});
	}

	async getAllRefreshTokens() {
		return this.tokenModel.findAll({include: [User]})
	}
}