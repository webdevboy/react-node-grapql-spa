import {
  GraphQLID as ID,
  GraphQLList as List,
} from "graphql";
import PaginationInput from "../../types/utils/PaginationInput";
import ChatMessageType from "../../types/ChatMessageType";
import { ChatRoom } from '../../models';

export default {
  type: new List(ChatMessageType),
  args: {
    id: {
      type: ID,
    },
    pagination: {
      type: PaginationInput,
    },
  },
  async resolve(_, { id, pagination }) {
    try {
      const room = await ChatRoom.findOne({ where: { id } });
      return room.getMessages({ ...pagination, order: "created_at DESC" });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};