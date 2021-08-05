import { Response, NextFunction } from 'express';
import { HTTPClientError } from '.';
import { HttpStatusCode, Environment, ErrorDescription } from '../../commons/constants';
import { v1 as uuidv1 } from 'uuid';
import { logger } from '../logging';

export const clientError = (err: Error, res: Response, next: NextFunction): void => {
  logger.info(err);
  if (err instanceof HTTPClientError) {
    const { id, status, message, errors } = err;
    res.status(status).send({
      id,
      message,
      errors,
    });
  } else {
    next(err);
  }
};

export const serverError = (err: Error, res: Response, next: NextFunction): void => {
  const errorId = uuidv1();
  logger.error({
    id: errorId,
    name: err.name,
    message: err.message,
    stack: err.stack,
  });

  if (process.env.NODE_ENV === Environment.Production) {
    res.status(HttpStatusCode.InternalServerError).send({
      id: errorId,
      message: ErrorDescription.InternalServerError,
    });
  } else {
    res.status(HttpStatusCode.InternalServerError).send({
      id: errorId,
      message: err.stack,
    });
  }
};
