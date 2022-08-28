import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {LoginUserDto} from '../users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import {TokenService} from './token.service';
import {UserPayloadDto} from './dto/user-payload.dto';
import { User } from '../users/models/user.model';
import { UserDataDto } from './dto/user-data.dto';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private tokenService: TokenService
	) {}
	async register(userDto: CreateUserDto): Promise<UserDataDto> {
		const candidate = await this.userService.getUserByEmail(userDto.email);
		if (candidate) {
			throw new HttpException('User has already registered', HttpStatus.BAD_REQUEST)
		}

		const hashedPassword = await bcrypt.hash(userDto.password, 5);
		const user = await this.userService.createUser({...userDto, password: hashedPassword});	

		return this.getUserData(user);
	}

	async login(userDto: LoginUserDto): Promise<UserDataDto> {
		const user = await this.userService.getUserByEmail(userDto.email);
		if (!user) {
			throw new HttpException('User with this email didn\'t exists', HttpStatus.NOT_FOUND);
		}

		const isEqualPasswords = await bcrypt.compare(userDto.password, user.password);
		console.log(isEqualPasswords);
		if (!isEqualPasswords) {
			throw new UnauthorizedException();
		}

		return this.getUserData(user);
	}

	private async getUserData(user: User): Promise<UserDataDto> {
		const userPayload = new UserPayloadDto(
			user,
			await this.userService.getUserRoles(user.id)
		);
		const tokens = await this.tokenService.generateAndSaveTokens(userPayload);
		return {
			...tokens,
			user: userPayload
		}
	}
}
