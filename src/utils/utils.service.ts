import {Injectable} from '@nestjs/common';

@Injectable()
export class UtilsService {
	makeSafeLowerString(str: string): string {
		return str.trim().toLowerCase();
	}
	makeSafeUpperString(str: string): string {
		return str.trim().toUpperCase();
	}
	makeTrimmed(str: string): string {
		return str.trim();
	}
}