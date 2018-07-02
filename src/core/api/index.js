import express from 'express';
import Promise from 'bluebird';
import moment from 'moment';
import nodeFetch from 'node-fetch';

import requestFlight from './requestFlight';
import flyNow from './flyNow';
import mobile from './mobile';

const router = express.Router();

router.post('/reqflight', requestFlight);
router.post('/flynow', flyNow);
router.post('', mobile);
router.get('', mobile);

export default router;