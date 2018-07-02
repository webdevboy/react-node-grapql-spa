import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';

import { Currency } from '../../models';
import CurrencyType from '../../types/CurrencyType';

export default {
  type: new List(CurrencyType),
  args: {
    ids: {
      type: new List(ID),
    },
    currencies: {
      type: new List(StringType),
    },
  },
  async resolve(root, { ids, currencies }) {
    try {
      if (ids) {
        const where = {
          id: {
            $in: ids,
          },
        };
        const [curFilterdByIds, cacheHitByIds] = await Currency.findAllCached(`currencies:${JSON.strigify(where)}`, {
          where,
        });
        return curFilterdByIds;
      }

      if (currencies) {
        const [curFiltered, filteredCacheHit] = await Currency.findAllCached(`currencies:${currencies.join('.')}`, {
          where: {
            currency: {
              $in: currencies,
            },
          },
        });
        return curFiltered;
      }
      const [currencies, cacheHit] = await Currency.findAllCached(`currencies`);
      return currencies;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}