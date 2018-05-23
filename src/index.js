import mongoose from 'mongoose';
import Promise from 'bluebird';

import app from './config/express';
import { appConfig, dbConfig } from './config/variables';

import 'babel-core/register';
import 'babel-polyfill';

mongoose.Promise = Promise;
const { port, path, host, env, publicPort, basePath } = appConfig;


function listen() {
  app.listen(port);
  console.log(`💻 API ${env} started on port ${port}`);
  console.log(`📔 Swagger on ${host}:${publicPort}${basePath}${path}/docs`);
}

function connect() {
  const options = {
    server: {
      socketOptions: {
        keepAlive: 1,
      },
    },
  };
  return mongoose.connect(dbConfig.db, options).connection;
}

connect()
.on('error', console.log)
.on('disconnected', connect)
.once('open', listen);

export default app;
