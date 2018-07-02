import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLInt as Integer,
  GraphQLInterfaceType as InterfaceType,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import DateType from 'graphql-date';

import PostState from './PostState';
import MediaType from '../MediaType';
import UserType from '../UserType';
import LanguageType from '../LanguageType';
import PostType from '../PostType';


import TaxonomyType from '../TaxonomyType';
import ArticleType from '../ArticleType';
import DestinationType from '../DestinationType';
import EventType from '../EventType';
import PageType from '../PageType';
import PartnerType from '../PartnerType';
import ReviewType from '../ReviewType';
import TeamMemberType from '../TeamMemberType';
import AircraftType from '../AircraftType';
import OfficeType from '../OfficeType';
import ServiceType from '../ServiceType';

const PostInterface = new InterfaceType({
  name: 'PostInterface',
  description: `Post interface`,
  fields: () => ({
    id: { type: new NonNull(ID) },
    post_id: { type: new NonNull(ID) },
    title: { type: StringType },
    slug: { type: new NonNull(StringType) },
    summary: { type: StringType },
    body: { type: GraphQLJSON },
    meta: { type: GraphQLJSON },
    type: { type: new NonNull(StringType) },
    media: { type: MediaType },
    gallery: { type: new List(MediaType) },
    publish_at: { type: DateType },
    created_at: { type: DateType },
    updated_at: { type: DateType },
    state: { type: PostState },
    author_id: { type: ID },
    author: { type: UserType },
    language_id: { type: ID },
    language: { type: LanguageType },
    parent_id: { type: ID },
    parent: { type: ID },
    ancestors: { type: new List(PostType) },
    translations: { type: new List(PostType) },
  }),
});

export default PostInterface;