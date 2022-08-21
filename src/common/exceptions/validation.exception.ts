import {HttpException, HttpStatus} from '@nestjs/common';

export class ValidationException extends HttpException {
	message;

	constructor(message) {
		super(message, HttpStatus.BAD_REQUEST);
	}
}