import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
} from 'graphql';

import AccountType from './AccountType';
import OpportunityType from './SFOpportunityType';

export default new ObjectType({
  name: 'Contact',
  description: `
    A Contact represents a passenger or a individual
    belongs to an account.

    (salesforce): Contact (belongsTo) Account
  `,
  fields: () => ({
    sfid: {
      type: StringType,
      resolve(contact) {
        return contact.sfid;
      }
    },
    email: {
      type: StringType,
      resolve(contact) {
        return contact.email;
      }
    },
    name: {
      type: StringType,
      resolve(contact) {
        return contact.name;
      }
    },
    first_name: {
      type: StringType,
      resolve(contact) {
        return contact.firstname;
      }
    },
    last_name: {
      type: StringType,
      resolve(contact) {
        return contact.lastname;
      }
    },
    phone: {
      type: StringType,
      resolve(contact) {
        return contact.phone;
      }
    },
    type: {
      type: StringType,
      resolve(contact) {
        return contact.type__c;
      },
    },
    salutation: {
      type: StringType,
      resolve(contact) {
        return contact.salutation;
      },
    },
    account_id: {
      type: StringType,
      resolve(contact) {
        return contact.accountid;
      }
    },
    account: {
      type: AccountType,
      resolve(contact) {
        return contact.getAccount();
      }
    },
    opportunities: {
      type: new List(OpportunityType),
      resolve(contact) {
        return contact.getOpportunities();
      }
    },
    role: {
      type: StringType,
      // defaultValue: 'customer',
      resolve() {
        return 'customer';
      }
    }
  })
});

