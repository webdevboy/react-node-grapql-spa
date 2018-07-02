import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
} from 'graphql';

import { Media, MediaReference } from '../models';
import MediaType from '../types/MediaType';

export const getAllMedia = {
  type: new List(MediaType),
  args: {
    order: {
      type: StringType,
    }
  },
  resolve(_, { order = 'DESC' }) {
    try {
      return Media.findAll({ order: [[ 'created_at', order ]] });
    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}

export const getSingleMedia = {
  type: MediaType,
  args: {
    id: {
      type: ID,
    },
    filename: {
      type: StringType
    }
  },
  resolve(_, args) {
    try {
      return Media.findOne({ where: args });
    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}

export const getSingleMediaByReference = {
  type: MediaType,
  args: {
    media_id: {
      type: new NonNull(StringType)
    }
  },
  async resolve(_, args) {
    try {
      const reference = await MediaReference.findOne({ where: { media_id: args.media_id } });
      if (reference && reference.media_center_id) {
        return Media.findOne({where: {id: reference.media_center_id}});
      } else {
        return null
      }

      
    } catch (e) {
      console.error(e);
      return e;
    }
    
  }
}