import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { RefreshToken } from './models/token.model';
import { User } from 'src/users/models/user.model';
import { RefreshAccessTokens } from './dto/refresh-access-tokens.dto';
import { UserPayloadDto } from 'src/users/dto/user-payload.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class TokenService {
	constructor(
		@InjectModel(RefreshToken) private tokenModel,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	generateToken(payload): RefreshAccessTokens {
		const accessExpiresIn = this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_MINUTES');
		const refreshExpiresIn = this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_DAYS');
		console.log(accessExpiresIn, refreshExpiresIn)
		const accessToken = this.jwtService.sign(payload, {
			secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
			expiresIn: `${accessExpiresIn}m`
		});

		const refreshToken = this.jwtService.sign(payload, {
			secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
			expiresIn: `${refreshExpiresIn}d`
		});

		return {accessToken, refreshToken};
	}

	async validateAccessToken(token: string) {
		try {
			const payloadData = this.jwtService.verify(token, {
				secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET')
			});

			return payloadData;
		} catch(e) {
			return null;
		}
	}

	async validateRefreshToken(token: string) {
		try {
			const payloadData = this.jwtService.verify(token, {
				secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
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

	saveTokenToCookie(token, response: Response) {
		const expiresIn = Number(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_DAYS'));
		response.cookie('refreshToken', token, {
			httpOnly: true,
			maxAge: expiresIn * 24 * 60 * 60 * 1000
		});
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