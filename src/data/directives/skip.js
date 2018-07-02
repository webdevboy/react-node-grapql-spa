import {
  GraphQLDirective,
  DirectiveLocation,
} from 'graphql';

export default new GraphQLDirective({
  // register the directive name
  name: 'skip',
  // register a description  
  description: 'Directs the executor to skip this field or fragment when the `if` ' +    'argument is true.',
  // register where this directive can be used
  locations: [
    DirectiveLocation.FIELD,     
    DirectiveLocation.FRAGMENT_SPREAD,
    DirectiveLocation.INLINE_FRAGMENT,
  ],
  // what arguments can we take, when its @skip or @include it is `if`
  args: {
   if: {
     // what type params can we take? For this we only accept booleans
     type: new GraphQLNonNull(GraphQLBoolen),
     description: "Skipped when true"
   } 
  }
});