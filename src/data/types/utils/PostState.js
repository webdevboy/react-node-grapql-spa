import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'PostState',
  values: {
    'draft': {},
    'published': {},
    'pending': {},
    'protected': {}
  },
});
