import {User} from '../models/user.model';

export class UserPayloadDto {
	id: number;
	username: string;
	roles: string[];

	constructor(user: User, roles: string[]) {
		this.id = user.id;
		this.username = user.username;
		this.roles = roles;
	}
}