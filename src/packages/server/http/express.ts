import http from 'http';
import express from 'express';
import 'express-async-errors';
import { applyMiddleware, applyRoutes } from './util';
import { Route, Wrapper } from './types';

const app = express();

export const startServer = (port: number, routes: Route[], customizablesMiddlewares?: Wrapper[]): void => {
  if (customizablesMiddlewares) applyMiddleware(customizablesMiddlewares, app);

  applyRoutes(routes, app);

  const server = http.createServer(app);
  server.listen(port, () => console.log(`Server is running ${port}`));
};
