import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLList as List,
  GraphQLInt as Integer,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';

const AircraftHeroshotPhotoType = new ObjectType({
  name: 'AircraftHeroshotPhoto',
  description: 'Represents a aircraft heroshotphoto on our db',
  fields() {
    return {
      id: {
        type: ID,
        resolve(model) {
          return model.id;
        },
      },
      heroshotphoto_id: {
        type: StringType,
        resolve(model) {
          return model.heroshotphoto_id;
        }
      },
    };
  }
});

export default AircraftHeroshotPhotoType;