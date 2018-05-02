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
  jwtKey: 'Fsociety.dat',
};

export const firebase = {
  cert: {
    project_id: "strv-7a643",
    private_key_id: "4b0e0f684bd8a89619b0ea6fac9d760de09d5038",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDB+PDFvlS3GIQe\nP40hO7QIS/4C5hs0JiI4eda3bbN18hi1LpGZvEGBmAP1wTJuwNSa7MOhVf9aT7Q4\nZnKWd2U/GKg9HdZXkCWH+fQqdmjIEINzTlplt63i9PZUxZrTVg3VGJCvzNhTtaeT\noEGuaPHPp5ZIfszOYImkydLAPHbyzJmaJRkLRwoWGe2OWGhX5GW9RJKCB/gp8c7D\nVkHKCxV/PAYpBULTIKYpP2kzcLFNmUXyx6/vxhxrhB1/RTLfZhEI/x0yU/zQGuaf\nAycP5keKB3zIAjqjVlX6E2GdR/kDoQQczB+yXDKys0V20Dsicw0ugYipLDOiW45j\n0ToHASxlAgMBAAECggEAJAP9bLH019RI/7bMFQ4ZVOsLPG2OQoYMF5Fj0UYgqrcr\naES/yxw9y3q2zYQ0QYUzVJq+ji/CDHo9G7XF8/MyTN9eqY5nNHXyygcak2HN/cu3\nJIs5VKagtkHGlSHlp/TT96uqfcHartxNQ6dfWqtorqZOzKIik/UvyXWh2IjBiz4o\nMOu2/8FisAVnvJW8P6DTMydcxcuQJTLgtmI+NEs8bepJZYQFDyDcQP42xOP3I/G3\ntqC10hLZ5R3biJ8luJ9weeWJ29E1PQIWgKTosaD3q7YWhLVENepOQn1Gk+25wXSN\nTtulBQRLWD4p0CVGD8d7c6RlBoehD5A+2f48zVzGxwKBgQDqhlXHhYTW7DRwZWaD\nWHQz50l0Cwp83m2Nld828CitUXzzad8iWiDd1yoowZLP7S7u0YGIvMKLNu4pxu5Z\nyPR+LRidgBcOTDAA1LnkYB/y1H+dY3Y6asP7849376yV5B7eAIgrSXThHE8c97+Y\nxBNTLQJN1XOMQU21ubzA40/0/wKBgQDTu/0uzM5caRT3UR4Of3vqmhWroD+95/RD\nK7LiBresmfNNyIM31QgAEwBgaOOc0OBpkq46lGp5kepKN8sw56GBqfdwgoh6TBja\n0GOXxhJQRuBXwUldbPoQoOFcoramAmVdCtYmXGaEVIV1xc2dE5VLeE/ZTqyY4UNm\nccfWGpoqmwKBgQCAV92vn9EPsRoNfGB6dri5AtS+zaACr9LyTddnAEyydMrVhtXW\nvc4IuUxYG38VjO5HQZ4Kz4oDl58Ee9pKhl/OgS1cXBHCAE2w1rmYUkaJpGLmJd04\noN76DdMwxpgDO2DtCwt57OwqmUxuROK0XnFY7mO5ZpuiYMZ/MdMrF/rUzwKBgEUD\n98jzdShmEDF1PWjYYRndU8b3mw9ZtiLW8Z3/NouKOuZVv3/JbqwnhW3ngpmw9BU1\nfJkXm4U47Ld4bEDqn5hWQJNp2PaUK13Xoz7rjzifgazZEgLj7LbS2eKKHyMJkOS9\nDYS/haMIsd/rs9PJeFZ7Rvu8S0Ih2whfehXt4eaVAoGBAJLIdJ7I8YSdBirPisHV\n39enc6qmBmyFsuV4Q0z31imtDQOCIOWzR88d7kuj0S0NCJGM3/UJ0gpYaX9lrOsN\nggK0Mi/nN/Q97a8CZwRC052d06KeRktxn7w68xKS6SuZyFzX/mCx3PcugHzRoUgf\nOHrZSISB2/mk1lDsy2wWGkDQ\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-jm6iy@strv-7a643.iam.gserviceaccount.com",
    client_id: "115120655640633653636",
  },
  databaseURL: "https://strv-7a643.firebaseio.com",
}

