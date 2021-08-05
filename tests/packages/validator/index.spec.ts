import { validateJsonSchema } from '../../../src/packages';

const mockSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
  },
  required: ['id'],
  additionalProperties: false,
};

describe('packages/validator test', () => {
  it('validateJsonSchema when object is ok', () => {
    const mockRequest = {
      id: 10,
      name: 'test',
    };

    const result = validateJsonSchema(mockSchema, mockRequest);
    expect(result.length).toEqual(0);
  });

  it('validateJsonSchema when object it is wrong', () => {
    const mockRequest = {
      name: 'test',
    };

    const result = validateJsonSchema(mockSchema, mockRequest);
    expect(result.length).toEqual(1);
  });
});
