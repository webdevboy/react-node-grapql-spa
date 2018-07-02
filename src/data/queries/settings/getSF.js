import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
} from 'graphql';
import CryptoJS from 'crypto-js';
import { secret } from '../../../config';
import { Settings } from '../../models';
import OptionType from '../../types/OptionType';

const decrypt = (s) => {
  const bytes = CryptoJS.AES.decrypt(s.toString(), secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export default {
  type: new List(OptionType),
  async resolve() {
    try {
      const sf = await Settings.findAll({
        where: {
          option: {
            $iLike: 'salesforce_%',
          },
        },
        raw: true,
      });

      return sf.map(({ option, value }) => ({
        option,
        value: decrypt(value),
      }));
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
