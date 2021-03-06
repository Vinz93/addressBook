import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';

import { APIError } from '../helpers/errors';
import { constants } from '../config/variables';
const { jwtKey } = constants;

export const createJwt = user => (
  jwt.sign({
    user,
    date: Date.now(),
  }, jwtKey)
);


export const verifyJwt = token => (
  new Promise((resolve, reject) => {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        reject(new APIError('Invalid token.', httpStatus.UNAUTHORIZED));
      } else {
        resolve(decoded);
      }
    });
  })
);
