import http from 'http';
import express, { Express } from 'express';
import 'express-async-errors';
import { applyMiddleware, applyRoutes } from './util';
import middlewares from '../../middlewares';
import errorHandlers from '../../middlewares/errorHandlers';
import { StartServer } from './types';
import { logger } from '../..';
import { metricsApp, metricsRequestMiddleware } from './prometheus';

const app = express();

export const startServer = ({
  port,
  routes,
  customizablesMiddlewares,
  metricsPort,
  applyCommonsMiddlewares = true,
  applyCommonsErrors = true,
}: StartServer): Express => {
  if (metricsPort) app.use(metricsRequestMiddleware);
  if (applyCommonsMiddlewares) applyMiddleware(middlewares, app);
  if (customizablesMiddlewares) applyMiddleware(customizablesMiddlewares, app);

  applyRoutes(routes, app);
  if (applyCommonsErrors) applyMiddleware(errorHandlers, app);

  const server = http.createServer(app);
  server.listen(port, () => logger.info(`Server is running ${port}`));
  if (metricsPort) {
    const metricsServer = http.createServer(metricsApp);
    metricsServer.listen(metricsPort, () => logger.info(`Metrics is running ${metricsPort}`));
  }
  return app;
};

export { Express, Request, Response } from 'express';
