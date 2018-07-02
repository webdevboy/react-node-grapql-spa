import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import ContactType from './ContactType';

export default new GraphQLObjectType({
  name: 'Account',
  description: `
    An account represents a single entity or an organization
    with many associated contacts.

    (salesforce): Account (hasMany) Contacts
  `,
  fields: () => ({
    sfid: {
      type: GraphQLID,
      resolve(account) {
        return account.sfid;
      },
    },
    email: {
      type: GraphQLString,
      resolve(account) {
        return account.account_email__c;
      },
    },
    recordtypeid: {
      type: GraphQLString,
      resolve(account) {
        return account.recordtypeid;
      },
    },
    name: {
      type: GraphQLString,
      resolve(account) {
        return account.name;
      },
    },
    owner: {
      type: ContactType,
      async resolve(account) {
        return account.getOwner();
      },
    },
    contacts: {
      type: new GraphQLList(ContactType),
      resolve(account) {
        return account.getContacts({
          where: {
            type__c: 'Passenger',
          },
        });
      },
    },
    total_contacts: {
      type: GraphQLInt,
      resolve(account) {
        return account.countContacts({
          where: {
            type__c: 'Passenger',
          },
        });
      },
    },
  }),
});
