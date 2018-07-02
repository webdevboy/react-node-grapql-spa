import Promise from 'bluebird';

import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
} from 'graphql';

import { Settings } from '../models';
import OptionType from '../types/OptionType';
import { encrypt } from '../../core/crypto-helper';

const updateSettings = {
  type: OptionType,
  description: 'update settings entry',
  args: {
    id: {
      type: ID,
    },
    option: {
      type: new NonNull(StringType),
    },
    value: {
      type: new NonNull(StringType),
    },
  },
  resolve(_, { id, option, value }) {

    return new Promise(async (resolve, reject) => {
      try {
        const opts = await Settings.findOne({
          where: {
            $or: [
              { option },
              { id },
            ],
          },
        });
        const updated = await opts.update({ value });
        resolve(updated);
      } catch (e) {
        reject(e);
      }
    });
  },
};

const updateSensitiveSettings = {
  type: OptionType,
  description: 'update sensitive settings entry',
  args: {
    option: {
      type: new NonNull(StringType),
    },
    value: {
      type: new NonNull(StringType),
    },
  },
  resolve({ user }, { id, option, value }) {

    return new Promise(async (resolve, reject) => {
      try {
        if (!user || !user.is_admin) {
          throw new Error('No access level');
        }
        const opts = await Settings.findOne({
          where: {
            option,
          },
        });

        if (!opts) {
          throw new Error('no option found');
        }

        const updated = await opts.update({ value: encrypt(value) });
        return resolve(updated);
      } catch (e) {
        console.error(e);
        return reject(e);
      }
    });
  },
};

export default { updateSettings, updateSensitiveSettings };
