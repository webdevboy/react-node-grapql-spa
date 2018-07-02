import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLInt as Integer,
} from 'graphql';
import DateType from 'graphql-date';
import MessageType from './ChatMessageType';
import ContactType from './ContactType';
import { Message, SFAccount } from '../models';

export default new ObjectType({
  name: 'ChatRoom',
  description: 'Represents a Chat Room',
  fields: {
    id: {
      type: ID,
      resolve(chat) {
        return chat.id;
      }
    },
    label: {
      type: StringType,
      resolve(chat) {
        return chat.label;
      }
    },
    color: {
      type: StringType,
      resolve(chat) {
        return chat.color;
      }
    },
    archived: {
      type: BooleanType,
      resolve(chat) {
        return chat.archived;
      }
    },
    blocked: {
      type: BooleanType,
      resolve(chat) {
        return chat.blocked;
      }
    },
    created_at:{
      type: DateType,
      resolve(chat) {
        return chat.created_at;
      }
    },
    customer:{
      type: ContactType,
      resolve(chat) {
        if (!chat.account_id) {
          return null
        }
        return SFAccount.findOne({where: { 'externalid__c': chat.account_id }}).then(account => {
          if (account) {
            return account.getContact()
          }
        });
      }
    },
    total_messages: {
      type: Integer,
      resolve(chat) {
        // return 5
        return chat.countMessages();
        // return Message.count({where: { account_id: chat.account_id }})
      }
    },
    last_message: {
      type: MessageType,
      async resolve(chat) {
        const last_message = await chat.getMessages({ limit: 1, order: 'created_at DESC' });
        return last_message[0] || null;
      }
    },
    messages: {
      type: new List(MessageType),
      resolve(chat) {
        return chat.getMessages({ order: 'created_at DESC' });
      }
    },
  }
});
