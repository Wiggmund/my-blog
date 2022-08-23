import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES_MINUTES, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRES_DAYS} from '../common/constants';
import {JwtService} from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { RefreshToken } from './models/token.model';
import { User } from 'src/users/models/user.model';
import { RefreshAccessTokens } from './dto/refresh-access-tokens.dto';
import { UserPayloadDto } from 'src/users/dto/user-payload.dto';

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
		try {
			const payloadData = this.jwtService.verify(token, {
				secret: ACCESS_TOKEN
			});

			return payloadData;
		} catch(e) {
			return null;
		}
	}

	async validateRefreshToken(token: string) {
		try {
			const payloadData = this.jwtService.verify(token, {
				secret: REFRESH_TOKEN
			});

			return payloadData;
		} catch(e) {
			return null;
		}
	}

	async saveToken(userId: number, refreshToken: string): Promise<RefreshToken> {
		const tokenData = await this.tokenModel.findOne({where: {userId}});
		if (tokenData) {
			tokenData.token = refreshToken;
			return tokenData.save();
		}

		return this.tokenModel.create({token: refreshToken, userId});
	}

	async removeToken(token: string) {
		return this.tokenModel.destroy({where: {token}});
	}

	async refreshToken(token: string) {
		if (!token) {
			throw new UnauthorizedException('You are not authorized');
		}
		
		const tokenFromDB = await this.findToken(token);
		const userData = await this.validateRefreshToken(token);
		if (!tokenFromDB || !userData) {
			throw new UnauthorizedException('You are not authorized');
		}

		// Clear iat/exp props from userData after verification.
		// JWT verify attach this props to unpacked data
		const userDto = new UserPayloadDto(userData, userData.roles);
		const refreshedTokens = this.generateToken({...userDto});
		
		await this.saveToken(userData.id, refreshedTokens.refreshToken);
		return refreshedTokens;
	}

	async findToken(token: string) {
		return this.tokenModel.findOne({where: {token}});
	}

	async getAllRefreshTokens() {
		return this.tokenModel.findAll({include: [User]})
	}
}