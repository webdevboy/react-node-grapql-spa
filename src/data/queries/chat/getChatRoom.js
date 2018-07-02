import {
  GraphQLID as ID,
} from "graphql";

import ChatRoomType from "../../types/ChatRoomType";
import { ChatRoom } from '../../models';

export default {  
  type: ChatRoomType,
  name: "ChatRoom",
  args: {
    id: {
      type: ID,
    },
  },
  async resolve(_, { id }) {
    try {
      return ChatRoom.findOne({ where: { id } });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};
