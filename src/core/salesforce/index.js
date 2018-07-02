import conn from './conn';

const Lead = conn.sobject('Lead');
const Contact = conn.sobject('Contact');

export {
  Lead,
  Contact,
};
