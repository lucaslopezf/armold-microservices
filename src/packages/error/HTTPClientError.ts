import { HttpStatusCode } from '../../commons/constants';
import { v1 as uuidv1 } from 'uuid';
import { ArmoldError } from './ValidationError';

export abstract class HTTPClientError extends Error {
  readonly id!: string;
  readonly status!: HttpStatusCode;
  readonly message!: string;
  readonly errors!: ArmoldError[] | null;

  constructor(message: string, statusCode: HttpStatusCode, armoldErrors?: ArmoldError[] | null) {
    super(message);
    this.id = uuidv1();
    this.status = statusCode;
    this.message = message;
    this.errors = armoldErrors || null;

    Error.captureStackTrace(this, this.constructor);
  }
}
