import { ErrorCode, ErrorDescription, HttpStatusCode } from '../..';
import { BaseError } from './BaseError';
import { HTTPClientError } from './HTTPClientError';

export class HTTP400Error extends HTTPClientError {
  constructor(
    messageOrErrors: string | BaseError[] = ErrorDescription.BadRequest,
    code: string = ErrorCode.BadRequest
  ) {
    if (messageOrErrors instanceof Array) {
      super(ErrorDescription.BadRequest, code, HttpStatusCode.BadRequest, messageOrErrors);
    } else {
      super(messageOrErrors, code, HttpStatusCode.BadRequest);
    }
  }
}
export class HTTP404Error extends HTTPClientError {
  constructor(message: string = ErrorDescription.NotFound, code: string = ErrorCode.NotFound) {
    super(message, code, HttpStatusCode.NotFound);
  }
}

export const notFoundError = (): void => {
  throw new HTTP404Error();
};
