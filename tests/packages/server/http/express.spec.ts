import { Request, Response } from 'express';
import { startServer } from '../../../../src';
import middlewares from '../../../../src/packages/middlewares';

//Todo: Mock server.listen
describe('packages/server/http test', () => {
  const routesMock = [
    {
      path: '/ping',
      method: 'get',
      handler: [
        async (_: Request, res: Response): Promise<void> => {
          res.status(200).send('ok');
        },
      ],
    },
  ];

  it('Startserver with customMiddlewares', () => {
    const express = startServer(8081, routesMock, middlewares);

    expect(express.name).toEqual('app');
  });

  it('Startserver with applyCommonsMiddlewares and applyCommonsErrors = false', () => {
    const express = startServer(8081, routesMock, middlewares, false, false);

    expect(express.name).toEqual('app');
  });

  it('Startserver without customMiddlewares', () => {
    const express = startServer(8081, routesMock, undefined);

    expect(express.name).toEqual('app');
  });
});
