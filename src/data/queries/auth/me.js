import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLUnionType
} from 'graphql'
import jwt from 'jsonwebtoken'
import UserType from '../../types/UserType';
import ContactType from '../../types/ContactType'

import { User, SFContact } from '../../models'
import { secret_token } from '../../../config'
import LoginType from "../../types/LoginType";

export default {
  type: new GraphQLUnionType({
    name: 'Me',
    description: 'retrieves the user',
    types: [UserType, ContactType],
    resolveType: (me) => (me.sfid) ? ContactType : UserType,
  }),
  name: 'Me',
  async resolve({ user }) {
    try {
      if (!user) throw new Error('Invalid token provided');
      
      if (user.role === 'customer') {
        return SFContact.findOne({ where: { sfid: user.sfid }, exclude: ['password'] });
      }

      return User.findById(user.id);

    } catch (e) {
      console.error(e);
      return e;
    }
  },
};