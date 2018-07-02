import Promise from 'bluebird';
import { Currency, Rate } from '../models';

export default {
  up: async () => {

    const eur = await Currency.findOne({ where: { currency: 'EUR' } });
    const usd = await Currency.findOne({ where: { currency: 'USD' } });
    const chf = await Currency.findOne({ where: { currency: 'CHF' } });
    const gbp = await Currency.findOne({ where: { currency: 'GBP' } });

    await Rate.bulkCreate([
      // EUR
      {
        rate: 0.88,
        currency_from_id: eur.id,
        currency_to_id: gbp.id
      },
      {
        rate: 1.17,
        currency_from_id: eur.id,
        currency_to_id: usd.id
      },
      {
        rate: 1.16,
        currency_from_id: eur.id,
        currency_to_id: chf.id
      },

      // USD
      {
        rate: 0.75,
        currency_from_id: usd.id,
        currency_to_id: gbp.id
      },
      {
        rate: 0.86,
        currency_from_id: usd.id,
        currency_to_id: eur.id
      },
      {
        rate: 1.00,
        currency_from_id: usd.id,
        currency_to_id: chf.id
      },

      // CHF
      {
        rate: 0.86,
        currency_from_id: chf.id,
        currency_to_id: eur.id
      },
      {
        rate: 1.00,
        currency_from_id: chf.id,
        currency_to_id: usd.id
      },
      {
        rate: 0.75,
        currency_from_id: chf.id,
        currency_to_id: gbp.id
      },

      // GBP
      {
        rate: 1.33,
        currency_from_id: gbp.id,
        currency_to_id: chf.id
      },
      {
        rate: 1.33,
        currency_from_id: gbp.id,
        currency_to_id: usd.id
      },
      {
        rate: 1.14,
        currency_from_id: gbp.id,
        currency_to_id: eur.id
      },
    ]);
  },

  down: async () => {
    await Rate.truncate({ cascade: true });
  }
};
