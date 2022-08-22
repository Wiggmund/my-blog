import {User} from '../models/user.model';

export class UserPayloadDto {
	id: number;
	username: string;

	constructor(user: User) {
		this.id = user.id;
		this.username = user.username;
	}
}