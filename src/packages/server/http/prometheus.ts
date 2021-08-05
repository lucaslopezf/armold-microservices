import express from 'express';
import promBundle from 'express-prom-bundle';

export const metricsRequestMiddleware = promBundle({
  includePath: true,
  includeMethod: true,
  autoregister: false || Boolean(process.env.PROMETHEUS_AUTO_REGISTER), // Do not register /metrics
  promClient: { collectDefaultMetrics: {} },
});

const { metricsMiddleware } = metricsRequestMiddleware;
export const metricsApp = express();
metricsApp.use(metricsMiddleware);
