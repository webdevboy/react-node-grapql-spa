/* eslint-disable */
import jsforce from 'jsforce';
import { salesforce } from '../../config';

const conn = new jsforce.Connection({
  loginUrl: salesforce.url,
});

conn.login(
  salesforce.user,
  salesforce.password + salesforce.token,
  (err, res) => {
    if (err) {
      console.error(err);
      throw new Error(err);
    } else {
      // some middleware
    }
  },
);

export default conn;
