import Promise from 'bluebird';
import { Currency } from '../models';

export default {
  up: async () => {

    await Currency.bulkCreate([
      {
        currency: 'EUR',
        base: true
      },
      {
        currency: 'USD',
      },
      {
        currency: 'GBP',
      },
      {
        currency: 'CHF',
      }
    ]);

  },

  down: async () => {
    await Currency.truncate({ cascade: true });
  }
};
