import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import {ValidationException} from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
		const targetObject  = plainToInstance(metadata.metatype, value);
		const errors = await validate(targetObject);

		if (errors.length) {
			const message = errors.map((err) => {
				return `${err.property} - ${Object.values(err.constraints).join(' | ')}`.trim();
			});
			throw new ValidationException(message);
		}

		return value;
	}
}