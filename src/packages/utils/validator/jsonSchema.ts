import ajv, { ErrorObject } from 'ajv';
import { ValidationError } from './';

const toValidationError = ({ keyword, message, dataPath }: ErrorObject): ValidationError => {
  const property = dataPath.replace('.', '');
  const code = `schema.${property}.${keyword}`.replace(/[^a-z-A-Z.]/g, '');

  return {
    code,
    message,
    property,
  };
};

export const validateJsonSchema = (schema: string | boolean | object, data: object): ValidationError[] => {
  const validator = new ajv({ allErrors: true, errorDataPath: 'property' });
  const isValid = validator.validate(schema, data);

  if (!isValid && validator.errors) {
    return validator.errors.map((x) => toValidationError(x));
  }

  return [];
};
