import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,

} from 'graphql';
import LoginType from './LoginType';
import ContactType from './ContactType';

export default new ObjectType({
  name: 'CustomerLogin',
  description: 'Represents a lunajets customer, from salesforce',
  fields: () => ({
    contact: {
      type: new NonNull(ContactType),
      resolve(login) {
        return login.contact;
      },
    },
    token: {
      type: StringType,
      resolve(login) {
        return login.token;
      },
    },
    activate: {
      type: BooleanType,
    },
    migrated: {
      type: BooleanType,
    },
    reset_password: {
      type: BooleanType,
    }
  }),
});