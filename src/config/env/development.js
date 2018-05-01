import path from 'path';

export const dbConfig = {
  db: 'mongodb://localhost/strv',
};

export const appConfig = {
  env: 'development',
  host: process.env.HOST || 'http://127.0.0.1',
  path: '/v1',
  basePath: '/api',
  port: 3000,
  publicPort: 80,
  root: path.join(__dirname, '../../../'),
};

export const constants = {
  expTime: 1,
};

