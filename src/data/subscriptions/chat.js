import { pubsub } from '../pubsub';
import { withFilter } from 'graphql-subscriptions';

import MessageType from '../types/MessageType';
import ChatRoomType from '../types/ChatRoomType';

import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
} from 'graphql';

export const newMessage = {
	type: MessageType,
	args: {
		roomId: {
			type: new NonNull(ID)
		}
	},
	subscribe: withFilter(
		() => pubsub.asyncIterator('newMessage'),
		(payload, variables) => {
        	return payload.roomId === variables.roomId;
      	}
    )
}

export const newRoom = {
	type: ChatRoomType,
	subscribe: () => pubsub.asyncIterator('newRoom'), // socketId subscribed newPage: { newPage }
}