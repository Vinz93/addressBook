import path from 'path';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import swaggerDoc from 'swagger-jsdoc';
import swaggerTools from 'swagger-tools';

import errorMessages from '../services/middlewares/error_messages';
import errorResponse from '../services/middlewares/error_response';
import config from './env';
import routes from '../routes';

const { appConfig } = config;
const app = express();
const spec = swaggerDoc({
  swaggerDefinition: {
    info: {
      title: 'API',
      version: '1.0.0',
    },
    basePath: config.appConfig.basePath,
  },
  apis: [
    `${path.resolve()}/src/models/**/*.js`,
    `${path.resolve()}/src/controllers/**/*.js`,
    `${path.resolve()}/src/routes/**/*.js`,
  ],
});

app.disable('x-powered-by');
app.use(methodOverride('X-HTTP-Method-Override'));

if (config.appConfig.env === 'development' || config.appConfig.env === 'testing') {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
}

app.use(bodyParser.json());
app.use(cors());

app.use(config.appConfig.path, routes);

swaggerTools.initializeMiddleware(spec, (middleware) => {
  app.use(middleware.swaggerUi({
    apiDocs: `${appConfig.basePath}${appConfig.path}/docs.json`,
    swaggerUi: `${appConfig.basePath}${appConfig.path}/docs`,
    apiDocsPrefix: `${appConfig.basePath}${appConfig.path}`,
    swaggerUiPrefix: '/',
  }));
});

app.use(errorMessages);
app.use(errorResponse);

app.locals.config = config.appConfig;

export default app;
