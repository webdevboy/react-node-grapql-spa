import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as Integer,
  GraphQLInputObjectType as InputType,
} from "graphql";
import DateType from "graphql-date";

import jwt from "jsonwebtoken";
import ErrorType from "../types/ErrorType";
import ChatRoomType from "../types/ChatRoomType";
import MessageType from "../types/MessageType";

import CustomerType from "../types/CustomerType";
import CustomerLoginType from "../types/CustomerLoginType";
import PaginationType from "../types/PaginationType";

import sequelize from "../sequelize";
import { Room, Message, User } from "../models";
import { SF_Contact, SF_Account } from "../models/salesforce";

export const getChatRooms = {
  type: new List(ChatRoomType),
  name: "ChatRooms",
  description: "Find All Chat Rooms",
  args: {
    query: {
      type: new InputType({
        name: "ChatArguments",
        fields: {
          color: {
            type: StringType,
          },
          blocked: {
            type: BooleanType,
          },
          archived: {
            type: BooleanType,
          },
          account_id: {
            type: ID,
          },
        },
      }),
    },
    pagination: {
      type: PaginationType,
    },
  },
  resolve(_, { query, pagination }) {
    try {
      return Room.findAll({ where: query, ...pagination });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};

export const getSingleChatRoom = {
  type: ChatRoomType,
  name: "ChatRoom",
  description: "Find Single Chat Room by ID",
  args: {
    id: {
      type: ID,
    },
  },
  resolve(_, { id }) {
    try {
      return Room.findOne({ where: { id } });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};


export const getMessagesFromChatRoom = {
  type: new List(MessageType),
  name: "GetMessages",
  description: "Find Messages from a single chat room",
  args: {
    id: {
      type: ID,
    },
    pagination: {
      type: PaginationType,
    },
  },
  async resolve(_, { id, pagination }) {
    try {
      const room = await Room.findOne({ where: { id } });
      return room.getMessages({ ...pagination, order: "created_at DESC" });

      // console.log(messages)
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
