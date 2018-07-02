import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
} from 'graphql';
import { decrypt } from '../../../core/crypto-helper';
import { secret } from '../../../config';
import { Settings } from '../../models';
import OptionType from '../../types/OptionType';

const secureKeys = [
  'mail_smtp_hostname',
  'mail_smtp_user',
  'mail_smtp_password',
];

export default {
  type: new List(OptionType),
  async resolve({ user }) {
    try {

      if (!user || !user.is_admin) {
        throw new Error('No access level');
      }
      const smtp = await Settings.findAll({
        where: {
          option: {
            $iLike: 'mail_smtp_%',
          },
        },
      });

      return smtp.map(({ option, value }) => ({
        option,
        value: (secureKeys.includes(option)) ? decrypt(value) : value,
      }));
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
