import * as development from './development';
import testing from './testing';

const config = {
  development,
  testing,
}[process.env.NODE_ENV || 'development'];

export default config;
