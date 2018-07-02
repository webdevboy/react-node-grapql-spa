import { pubsub } from '../pubsub';
import PageType from '../types/PageType';

export const newPage = {
	type: PageType,
	subscribe: () => pubsub.asyncIterator('newPage'), // socketId subscribed newPage: { newPage }
}