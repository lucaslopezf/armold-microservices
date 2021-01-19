import { HTTPClientError } from './HTTPClientError';
import { HttpStatusCode } from '../../commons/constants';
import { ArmoldError, HttpArmoldError } from '.';

export class HTTPArmoldError extends HTTPClientError {
  statusCode!: HttpStatusCode;
  readonly validationErrors?: HttpArmoldError;

  constructor(statusCode: HttpStatusCode, armoldErrors?: ArmoldError[], message: string = 'armold_error') {
    super(message, statusCode, armoldErrors);
  }
}

export const notFoundError = (): void => {
  throw new HTTPArmoldError(HttpStatusCode.NotFound, undefined, 'error');
};
