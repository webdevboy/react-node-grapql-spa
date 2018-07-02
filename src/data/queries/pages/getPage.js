import { 
  GraphQLID as ID,
  GraphQLString as StringType
} from 'graphql';

import types from '../../types';
import { Page, Language } from '../../models';

export default {
  type: types.PageType,
  args: {
    id: {
      type: ID,
    },
    locale: {
      type: StringType
    }
  },
  async resolve({ req }, args) {
    try {

      console.log('GET PAGE ====> ',args, req.cookies.lang);

      const lang = await locale.getLanguage();

      return Page.findOne({ 
        where: { id: args.id },
      });

    } catch (e) {
      console.error(e);
      return e;
    }
  }
}

// 