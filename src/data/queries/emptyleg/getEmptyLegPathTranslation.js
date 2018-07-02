import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType,
} from 'graphql';
import DateType from 'graphql-date';
import sequelize from 'sequelize';

import {
  StringTranslation,
  Language,
} from '../../models';

import StringTranslationType from '../../types/StringTranslationType';

export default {
  type: new List(StringTranslationType),
  name: 'StringTranslationType',
  description: 'Find StringTranslationType',
  args: {
    language_id: {
      type: ID,
    },
  },
  async resolve(_, {
    language_id
  }) {
    const language = await Language.findOne({ where: { locale: 'en'} });
    const where = {
      $or: [
          { message_id: "url.emptyLegFlights" },
          { message_id: "url.emptyLegFlights.emptyLeg" },
        ],
    };
    if (language){
      where.language_id = language.id;
    }
    return StringTranslation.model.findAll({ where });
  },
}
