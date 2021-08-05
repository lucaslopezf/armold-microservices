import {
  ErrorCode,
  HTTP400Error,
  HTTP404Error,
  notFoundError,
} from '../../../src';

describe('packages/error/HTTP4XXError test', () => {
  test('When error is HTTP400Error and has not message', async () => {
    const error400 = new HTTP400Error();

    expect(error400.code).toEqual(ErrorCode.BadRequest);
  });

  test('When error is HTTP400Error and message is array', async () => {
    const errors = [
      {
        code: 'test',
        detail: 'test',
      },
    ];

    const error400 = new HTTP400Error(errors);

    expect(error400.code).toEqual(ErrorCode.BadRequest);
    expect(error400.errors?.length).toEqual(1);
  });

  test('When error is HTTP404Error', async () => {
    const error404 = new HTTP404Error();

    expect(error404.code).toEqual(ErrorCode.NotFound);
  });

  test('/notFoundError', async () => {
    expect(() => {
      notFoundError();
    }).toThrow(HTTP404Error);
  });
});
