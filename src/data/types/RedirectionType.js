import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLInt as Integer,
} from 'graphql';

const RedirectionType = new ObjectType({
  name: 'Redirection',
  description: 'This is a url redirection',
  fields: {
    id: {
      type: new NonNull(ID),
      resolve(url_manager) {
        return url_manager.id;
      },
    },
    link: {
      type: new List(StringType),
      resolve(url_manager) {
        return url_manager.link;
      },
    },
    redirect: {
      type: StringType,
      resolve(url_manager) {
        return url_manager.redirect;
      },
    },
    description: {
      type: StringType,
      resolve(url_manager) {
        return url_manager.description;
      },
    },
    http_code: {
      type: Integer,
      resolve(url_manager) {
        return url_manager.http_code;
      },
    },
  },
});

export default RedirectionType;
