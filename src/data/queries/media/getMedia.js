import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';

import { MediaLibrary, MediaTranslation, Language } from '../../models';
import MediaType from '../../types/MediaType';

export default {
  type: MediaType,
  args: {
    id: {
      type: ID,
    },
    key: {
      type: StringType,
    },
  },
  resolve(_, args) {
    try {
      return MediaLibrary.model.findOne({
        where: args,
        include: [
          {
            model: MediaTranslation.model,
            as: 'translations',
            required: true,
            include: {
              model: Language.model,
              as: 'language',
            }
          }
        ]
      });

    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
