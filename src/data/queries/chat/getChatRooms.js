import {
  GraphQLList as List,
} from "graphql";

import PaginationInput from "../../types/utils/PaginationInput";
import ChatRoomType from "../../types/ChatRoomType";
import { ChatRoom } from '../../models';
import ChatQueryType from './ChatQueryType';

export default {  
  type: new List(ChatRoomType),
  description: "Get All Chat Rooms",
  args: {
    query: {
      type: ChatQueryType,
    },
    pagination: {
      type: PaginationInput,
    },
  },
  async resolve(_, { query, pagination }) {
    try {
      return ChatRoom.findAll({ where: query, ...pagination });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
}