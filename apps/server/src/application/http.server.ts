import UserController from '@app/user/user.controller';
import YoutubeController from '@app/youtube/youtube.controller';
import { httpLogger, ResponseUtils } from '@gln-libs/node-infrastructure';
import cookieParser from 'cookie-parser';
import express from 'express';

import { AppConfig } from './config';
import { corsMiddleware, errorHandlerMiddleware } from './middleware';

const setupAppMiddlewares = (app: express.Express) => {
  app.use(httpLogger());
  app.use((_, res, next) => {
    Object.assign(res, ResponseUtils(res));
    next();
  });
  app.use(corsMiddleware(AppConfig.HttpServer.CORS));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
};

const initializeControllers = (app: express.Router): void => {
  app.use('/api', YoutubeController);
  app.use('/api', UserController);
};

const setupBackgroundAppMiddlewares = (app: express.Express) => {
  app.use(errorHandlerMiddleware);
};

export const startHttpServer = (): void => {
  const { port } = AppConfig.HttpServer;

  const app = express();

  setupAppMiddlewares(app);
  initializeControllers(app);
  setupBackgroundAppMiddlewares(app);

  app.listen(port, () => {
    global.logger.info(`HttpServer started on port ${port}`);
  });
};
