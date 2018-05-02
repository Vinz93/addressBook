import * as admin from 'firebase-admin';

import config from './env';
const { cert, databaseURL } = config.firebase;
admin.initializeApp({
  credential: admin.credential.cert(cert),
  databaseURL,
});

export default admin.database();
