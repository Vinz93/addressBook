import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = {
  db: process.env.MONGOURL,
};

export const appConfig = {
  env: process.env.NODE_ENV,
  host: process.env.HOST || 'http://127.0.0.1',
  path: '/v1',
  basePath: '/api',
  port: 3000,
  publicPort: 80,
  root: path.join(__dirname, '../../../'),
};

export const constants = {
  expTime: 1,
  jwtKey: 'Fsociety.dat',
};

export const firebase = {
  cert: {
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_id: process.env.CLIENT_ID,
    client_email: process.env.CLIENT_EMAIL,
  },
  databaseURL: process.env.DATABASEURL,
};
