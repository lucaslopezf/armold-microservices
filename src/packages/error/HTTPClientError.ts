import { HttpStatusCode } from '../../commons/constants';
import { v1 as uuidv1 } from 'uuid';
import { BaseError } from './BaseError';

export abstract class HTTPClientError extends Error {
  readonly id!: string;
  readonly status!: HttpStatusCode;
  readonly code!: string;
  readonly message!: string;
  readonly errors?: BaseError[];

  constructor(message: string, code: string, statusCode: HttpStatusCode, errors?: BaseError[]) {
    super(message);
    this.id = uuidv1();
    this.code = code;
    this.status = statusCode;
    this.message = message;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}
