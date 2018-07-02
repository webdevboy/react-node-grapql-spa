import { AES, enc } from 'crypto-js';
import { secret_token } from '../config';

export const encrypt = (s) => {
  try {
    const cypher = AES.encrypt(s, secret_token);
    return cypher.toString();
  } catch (e) {
    console.error(e)
  }
}

export const decrypt = (s) => {
  try {
    const cypher = AES.decrypt(s, secret_token);
    return cypher.toString(enc.Utf8);
  } catch (e) {
    console.error(e)
  }
}
