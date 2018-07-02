import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLInt as Integer,
  GraphQLUnionType as UnionType,
} from "graphql";
import GraphQLJSON from "graphql-type-json";
import DateType from "graphql-date";

import PageType from "./PageType";
import ArticleType from "./ArticleType";
import DestinationType from "./DestinationType";
import EventType from "./EventType";
import AircraftType from "./AircraftType";
import TeamMemberType from "./TeamMemberType";
import OfficeType from "./OfficeType";
import ReviewType from "./ReviewType";
import PartnerType from "./PartnerType";
import ServiceType from "./ServiceType";
import AirportType from "./AirportType";
import JobType from "./JobType";
import HistoryType from "./HistoryType";

const PostType = new UnionType({
  name: "Post",
  description: `Post union`,
  types: [
    PageType,
    ArticleType,
    EventType,
    DestinationType,
    AircraftType,
    TeamMemberType,
    PartnerType,
    ReviewType,
    OfficeType,
    ServiceType,
    AirportType,
    JobType,
    HistoryType,
  ],
  resolveType: post => {
        
    switch (post.type) {
      case "page":
        return PageType;
      case "article":
        return ArticleType;
      case "event":
        return EventType;
      case "destination":
        return DestinationType;
      case "aircraft":
        return AircraftType;
      case "team_member":
        return TeamMemberType;
      case "partner":
        return PartnerType;
      case "review":
        return ReviewType;
      case "office":
        return OfficeType;
      case "service":
        return ServiceType;
      case "airport":
        return AirportType;
      case "job":
        return JobType;
      case "history":
        return HistoryType;
      default:
        console.error(post.type);
        return PageType;
    }
  },
});

export default PostType;
