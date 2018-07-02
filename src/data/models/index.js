/* eslint-disable */
import * as Models from './';
import cache, { ttl } from '../cache';
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';
import sequelize from '../sequelize';

const DEFAULT_TTL = { ttl: ttl.hours(2) };
delete Models.Index; // remove me

Object.keys(Models).forEach((model) => {
  if (Models[model].associate) {
    Models[model].associate(Models);
  }
});

// const cached = {};
// const notCached = ['EmptyLeg','Post'];
if (process.env.NO_CACHE !== 'migration') {
  Object.keys(Models).forEach((model) => {
    // if (!notCached.includes(model)) {
      Models[model] = cache(Models[model], DEFAULT_TTL);
    // }
  });
}

//console.log('MODELS');

// export const context = createContext(sequelize); // must not be called before all models and associations are defined
export const {
  UserRole,
  UserPermission,
  User,
  Subscriptions, // newsletter

  StringTranslation,
  RichTextTranslation,
  Settings,

  // salesforce models
  SFCountry,
  SFContact,
  SFAccount,
  SFAirportCity,
  SFAirport,
  SFAircraftModel,
  SFAircraftManufacturer,
  SFAircraftCategory,
  SFEmail,
  SFEmailMessage,
  SFFleetAircraft,
  SFOpportunity,
  SFOperatorQuote,
  SFTrip,
  Lead,
  Redirection,
  Rate,
 
  EmptyLeg,
  MediaTranslation,
  MediaReference,
  MediaLibrary,
  Language,
  Device,
  CustomerNotes,
  Currency,
  ChatRoom,
  ChatNote,
  ChatMessage,
  // ArticleTag,
  // ArticleCategory,
  // Article,
  // AircraftHeroshotPhoto,
  // AircraftManufacturer,
  // AircraftCategory,
  // Aircraft,
  Post,
  Term,
  TermTaxonomy,
  EmailTemplates,
} = Models;

export default Models;
