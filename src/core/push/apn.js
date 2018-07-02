/* eslint-disable max-len */
// import apn from 'apn';
// import config from '../../config';

if (process.env.BROWSER) {
  throw new Error('Do not import `core/apn.js` from inside the client-side code.');
}

// export default new apn.Provider({
//   token: {
//     key: "path/to/APNsAuthKey_XXXXXXXXXX.p8",
//     keyId: "key-id",
//     teamId: "developer-team-id"
//   },
//   production: process.env.NODE_ENV !== 'development',
// });
