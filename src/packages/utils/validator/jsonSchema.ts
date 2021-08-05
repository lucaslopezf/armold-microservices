import ajv, { ErrorObject } from 'ajv';
import { BaseError } from '../..';

const toBaseError = ({ keyword, message, dataPath }: ErrorObject): BaseError => {
  const property = dataPath.replace('.', '');
  const code = `${property}.${keyword}`;
  const detail = `${property} ${message}`;
  return {
    code,
    detail,
  };
};

export const validateJsonSchema = (schema: string | boolean | object, data: object): BaseError[] => {
  const validator = new ajv({ allErrors: true, errorDataPath: 'property' });
  const isValid = validator.validate(schema, data);

  if (!isValid && validator.errors) {
    return validator.errors.map((x) => toBaseError(x));
  }

  return [];
};
