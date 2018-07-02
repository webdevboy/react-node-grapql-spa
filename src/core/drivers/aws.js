/* eslint-disable */
import {
  AWS_REGION,
  AWS_BUCKET,
  AWS_ACCESS_PKEY,
  AWS_ACCESS_KEY,
  AWS_CLOUDFRONT_URL,
} from '../../fixtures';
import getSettings from '../../shared/helpers/getSettings';
import { decrypt } from '../crypto-helper'; 

export default async () => {
  try {
    const _settings = await getSettings([
      AWS_REGION,
      AWS_BUCKET,
      AWS_ACCESS_PKEY,
      AWS_ACCESS_KEY,
      AWS_CLOUDFRONT_URL,
    ]);
  
    const AWS = {
      bucket: _settings[AWS_BUCKET],
      keys: {
        accessKeyId: decrypt(_settings[AWS_ACCESS_KEY]),
        secretAccessKey: decrypt(_settings[AWS_ACCESS_PKEY]),
        region: _settings[AWS_REGION],
      },
      cloudFront: {
        endpoint: _settings[AWS_CLOUDFRONT_URL],
      }
    };

    return AWS;
  } catch (e) {
    console.error(e);
    return null;
  }
  
}
