import { HTTPClientError } from './HTTPClientError';
import { HttpStatusCode } from '../../commons/constants';
import { ArmoldError, HttpArmoldError } from '.';

export class HTTPArmoldError extends HTTPClientError {
  statusCode!: HttpStatusCode;
  readonly validationErrors?: HttpArmoldError;

  constructor(statusCode: HttpStatusCode, message: string = 'armold_error', armoldErrors?: ArmoldError[]) {
    super(message, statusCode, armoldErrors);
  }
}

export const notFoundError = (): void => {
  throw new HTTPArmoldError(HttpStatusCode.NotFound, 'error');
};
