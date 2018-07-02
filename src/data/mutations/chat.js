import Promise from 'bluebird';
import { pubsub } from '../pubsub';

import {
  GraphQLFloat as DoubleType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
  GraphQLString as StringType,
} from 'graphql';

import { ChatRoom, ChatMessage, User, SFAccount } from '../models';

import ChatRoomType from '../types/ChatRoomType';
import MessageType from '../types/MessageType';

const createChatRoom = {
  type: ChatRoomType,
  description: 'creates a new chat room',
  args: {
    customerId: {
      type: ID
    },
    label: {
      type: StringType
    },
    color: {
      type: StringType
    }
  },
  resolve({ transporter }, args) {

    return new Promise( async (resolve, reject) => {

      try {

          const newRoom = await ChatRoom.create({
            label: args.label || null,
            color: args.color || null
          });

          if (args.customerId) {
            console.log('INSIDE CUSTOMER ID ! ', args.customerId);
            const customer = await SFAccount.findOne({ where: { externalid__c: args.customerId }});
            await newRoom.setCustomer(customer);
          }

          const automatedMessage = await ChatMessage.create({
            automated: true,
            body: 'Welcome to LunaJets Chat! How ca we help you today?'
          });

          await newRoom.addMessages(automatedMessage);

          pubsub.publish('newRoom', { newRoom });
          resolve(newRoom);

      } catch(e) {
        reject(e);
      }
      
    });

  },
};

const sendMessage = {
  type: MessageType,
  description: 'send a message to a chat room',
  args: {
    roomId: {
      type: ID
    },
    body: {
      type: StringType
    }
  },
  resolve({ req }, { roomId, body }) {
    
    console.log('req USER => ');
    console.log(req.user);
    console.log('req USER => ');
    // if (args.customerId) {
    //   console.log('INSIDE CUSTOMER ID ! ', args.customerId);
    //   const customer = await SFAccount.findOne({ where: { externalid__c: args.customerId }});
    //   await newRoom.setCustomer(customer);
    // }

    return new Promise( async (resolve, reject) => {

      try {
        
        const user = await User.findById(req.user.id);
        const room = await ChatRoom.findById(roomId);

        const newMessage = await ChatMessage.create({
          body,
        });

        await newMessage.setUser(user);
        await newMessage.setRoom(room);


        pubsub.publish('newMessage', { newMessage, roomId: room.id });
        resolve(newMessage);


      } catch(e) {
        reject(e);
      }
      
    });
  }
}

export { createChatRoom, sendMessage };
