import * as admin from 'firebase-admin';

import { firebase } from './variables';
const { cert, databaseURL } = firebase;
admin.initializeApp({
  credential: admin.credential.cert(cert),
  databaseURL,
});

export default admin.database();
