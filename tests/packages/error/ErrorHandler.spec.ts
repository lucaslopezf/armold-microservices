import { Response } from 'express';
import {
  clientError,
  Environment,
  HTTP400Error,
  serverError,
} from '../../../src';

describe('packages/error/ErrorHandler test', () => {
  const mockedNext = jest.fn();
  let responseObject = {};
  const mockedResponse: Partial<Response> = {
    status: jest.fn().mockImplementation((_) => {
      return {
        send: jest.fn().mockImplementation((result) => {
          responseObject = result;
        }),
      };
    }),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('clientError', () => {
    test('When error is not instance of ClientError', async () => {
      const mockedError = { name: 'error', message: 'test client error' };
      const mockedResponse = {} as Response;

      expect(() =>
        clientError(mockedError, mockedResponse, mockedNext)
      ).not.toThrow();
    });

    test('When error is instance of ClientError', async () => {
      const mockedError = new HTTP400Error('clientError', 'bad.request');

      expect(() => {
        clientError(mockedError, mockedResponse as Response, mockedNext);
      }).not.toThrow();
    });
  });

  describe('serverError error', () => {
    afterEach(() => {
      process.env.NODE_ENV = undefined;
    });

    test('When environment is production', async () => {
      process.env.NODE_ENV = Environment.Production;
      const mockedError = new Error();

      expect(() => {
        serverError(mockedError, mockedResponse as Response, mockedNext);
      }).not.toThrow();
    });

    test('When environment is not production', async () => {
      const mockedError = new Error();

      expect(() => {
        serverError(mockedError, mockedResponse as Response, mockedNext);
      }).not.toThrow();
    });
  });
});
