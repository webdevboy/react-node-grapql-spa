import Promise from 'bluebird';

import {
  GraphQLFloat as DoubleType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
} from 'graphql';

import { Rate } from '../models';
import RateType from '../types/RateType';

const updateRate = {
  type: RateType,
  description: 'update rate entry',
  args: {
    id: {
      type: ID
    },
    rate: {
      type: new NonNull(DoubleType)
    },
  },
  resolve({ transporter }, { id, rate }) {

    return new Promise( async (resolve, reject) => {

      try {

          const _rate = await Rate.findOne({
            where: { 
              id
            }
          });

          const rateUpdated = await _rate.update({ rate });
          resolve(rateUpdated);

      } catch(e) {
        console.error(e);
        reject(e);
      }
      
    });

  },
};

export default {
  updateRate,
}