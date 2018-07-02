import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
} from 'graphql';
import { secret } from '../../../config';
import { Settings } from '../../models';
import OptionType from '../../types/OptionType';
import { decrypt } from '../../../core/crypto-helper';

const secureKeys = [
  'aws_access_key',
  'aws_access_pkey',
];

export default {
  type: new List(OptionType),
  async resolve({ user }) {
    try {
      if (!user || !user.is_admin) {
        throw new Error('No access level');
      }
      const aws = await Settings.findAll({
        where: {
          option: {
            $iLike: 'aws_%',
          },
        },
      });
      return aws.map(({ option, value }) => ({
        option,
        value: (secureKeys.includes(option)) ? decrypt(value) : value,
      }));
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
