import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
} from 'graphql';

import { Redirection } from '../models';
import RedirectionType from '../types/RedirectionType';

export default {
  getRedirections: {
    type: new List(RedirectionType),
    args: {
      id: {
        type: ID,
      },
      link: {
        type: new List(StringType),
      },
      redirect: {
        type: StringType,
      },
      description: {
        type: StringType,
      },
    },
    async resolve(_, args) {
      try {
        return Redirection.findAll({
          where: args,
        });
      } catch (e) {
        console.error(e);
        return e;
      }
    },
  },
};
