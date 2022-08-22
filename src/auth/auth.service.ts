import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {LoginUserDto} from '../users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import {TokenService} from './token.service';
import {UserPayloadDto} from '../users/dto/user-payload.dto';
import { RefreshAccessTokens } from './dto/refresh-access-tokens.dto';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private tokenService: TokenService
	) {}

	async register(userDto: CreateUserDto) {
		const candidate = await this.userService.getUserByEmail(userDto.email);
		if (candidate) {
			throw new HttpException('User has already registered', HttpStatus.BAD_REQUEST)
		}

		const hashedPassword = await bcrypt.hash(userDto.password, 5);
		const user = await this.userService.createUser({...userDto, password: hashedPassword});	

		const userPayload = new UserPayloadDto(user);
		const tokens = await this.generateAndSaveTokens(userPayload);
		return {
			...tokens,
			user: userPayload
		}
	}

	async login(userDto: LoginUserDto) {
		const user = await this.userService.getUserByEmail(userDto.email);
		if (!user) {
			throw new HttpException('User with this email didn\'t exists', HttpStatus.NOT_FOUND);
		}

		const isEqualPasswords = await bcrypt.compare(userDto.password, user.password);
		console.log(isEqualPasswords);
		if (!isEqualPasswords) {
			throw new UnauthorizedException();
		}

		const userPayload = new UserPayloadDto(user);
		const tokens = await this.generateAndSaveTokens(userPayload);
		return {
			...tokens,
			user: userPayload
		}
	}

	private async generateAndSaveTokens(userPayload: UserPayloadDto): Promise<RefreshAccessTokens> {
		const {refreshToken, accessToken} = 
			this.tokenService.generateToken({...userPayload});
	
		await this.tokenService.saveToken(userPayload.id, refreshToken);
		return {refreshToken, accessToken};
	}

}
