import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType
} from 'graphql';
import DateType from 'graphql-date';

import UserType from './UserType';
import ContactType from './ContactType';
import { SFAccount } from '../models';

const MessageType = new ObjectType({
  name: 'ChatMessage',
  description: 'Represents a conversation message',
  fields: {
    id: {
      type: ID,
      resolve(message) {
        return message.id;
      }
    },
    body: {
      type: StringType,
      resolve(message) {
        return message.body;
      }
    },
    automated: {
      type: BooleanType,
      resolve(message) {
        return message.automated;
      }
    },
    cli_read: {
      type: BooleanType,
      resolve(message) {
        return message.cli_read;
      }
    },
    adv_read: {
      type: StringType,
      resolve(message) {
        return message.adv_read;
      }
    },
    created_at:{
      type: DateType,
      resolve(message) {
        return message.created_at;
      }
    },
    customer: {
      type: ContactType,
      resolve(message) {

        if (!message.account_id) {
          return null
        }

        return SFAccount.findOne({where: { 'externalid__c': message.account_id }}).then(account => {
            if (account) {
              return account.getContact()
            }
          });
        }
        
    },
    user: {
      type: UserType,
      resolve(message) {

        return message.getUser();

      }
    }
  }
});

export default MessageType;
