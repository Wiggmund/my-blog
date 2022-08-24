import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { RefreshToken } from './models/token.model';
import { User } from 'src/users/models/user.model';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ITokens } from './interfaces/tokens.interface';
import { UsersService } from 'src/users/users.service';
import { UserDataDto } from './dto/user-data.dto';

@Injectable()
export class TokenService {
	constructor(
		@InjectModel(RefreshToken) private tokenModel,
		private jwtService: JwtService,
		private configService: ConfigService,
		private userService: UsersService
	) {}

	async validateAccessToken(token: string): Promise<UserPayloadDto | null> {
		try {
			const payloadData = this.jwtService.verify(token, {
				secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET')
			});

			return payloadData;
		} catch(e) {
			return null;
		}
	}

	async validateRefreshToken(token: string): Promise<UserPayloadDto | null> {
		try {
			const payloadData = this.jwtService.verify(token, {
				secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
			});

			return payloadData;
		} catch(e) {
			return null;
		}
	}

	saveTokenToCookie(token, response: Response): void {
		const expiresIn = Number(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_DAYS'));
		response.cookie('refreshToken', token, {
			httpOnly: true,
			maxAge: expiresIn * 24 * 60 * 60 * 1000
		});
	}

	async removeToken(token: string): Promise<number> {
		return this.tokenModel.destroy({where: {token}});
	}

	async refreshToken(token: string): Promise<UserDataDto> {
		if (!token) {
			throw new UnauthorizedException('You are not authorized');
		}
		
		const tokenFromDB = await this.findToken(token);
		const userData = await this.validateRefreshToken(token);
		if (!tokenFromDB || !userData) {
			throw new UnauthorizedException('You are not authorized');
		}

		// Get fresh data about user
		const user = await this.userService.getUserById(userData.id);
		const userRoles = await this.userService.getUserRoles(userData.id)
		
		// Clear iat/exp props from userData after verification.
		// JWT verify attach this props to unpacked data
		const userDto = new UserPayloadDto(user, userRoles);
		const refreshedTokens = await this.generateAndSaveTokens(userDto);
		
		return {
			...refreshedTokens,
			user: userDto
		};
	}
	
	async getAllRefreshTokens(): Promise<RefreshToken[]> {
		return this.tokenModel.findAll({include: [User]})
	}
	
	async generateAndSaveTokens(userPayload: UserPayloadDto): Promise<ITokens> {
		const {refreshToken, accessToken} = 
		this.generateToken({...userPayload});
		
		await this.saveToken(userPayload.id, refreshToken);
		return {refreshToken, accessToken};
	}

	private async findToken(token: string): Promise<RefreshToken> {
		return this.tokenModel.findOne({where: {token}});
	}

	private generateToken(payload): ITokens {
		const accessExpiresIn = this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_MINUTES');
		const refreshExpiresIn = this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_DAYS');

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

	private async saveToken(userId: number, refreshToken: string): Promise<RefreshToken> {
		const tokenData = await this.tokenModel.findOne({where: {userId}});
		if (tokenData) {
			tokenData.token = refreshToken;
			return tokenData.save();
		}

		return this.tokenModel.create({token: refreshToken, userId});
	}
}