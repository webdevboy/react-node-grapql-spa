import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLFloat as DoubleType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';

import CurrencyType from './CurrencyType';

export default new ObjectType({
  name: 'Rate',
  fields: {
    id: { 
      type: new NonNull(ID),
      resolve(rate) {
        return rate.id;
      }
    },
    rate: { 
      type: new NonNull(DoubleType),
      resolve(rate) {
        return rate.rate;
      }
    },
    from:{
      type: CurrencyType,
      resolve(currency) {
        return currency.getFrom();
      },
    },
    to:{
      type: CurrencyType,
      resolve(currency) {
        return currency.getTo();
      },
    }
  },
});
