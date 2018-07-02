// import _ from 'lodash';
// import slugify from 'slugify';
// import faker from 'faker';
import sequelize from '../sequelize';
import seed from '../seed';

import {
  SF_Account,
  SF_Contact,
  SF_AircraftModel,
  SF_AircraftManufacturer,
  SF_AircraftCategory,
  SF_Trip,
  SF_Airport,
  SF_AirportCity,
  SF_Country,
} from './salesforce';

// models
import User from './User';
import UserRole from './UserRole';
import UserPermission from './UserPermission';
import UrlManager from './standalone/UrlManager';
import Settings from './standalone/Settings';
import Template from './standalone/Template';
import Note from './standalone/Note';
import Sitemap from './standalone/Sitemap';
import Locale from './translation/Locale';
import Language from './translation/Language';
import Meta from './translation/Meta';
import StringTranslation from './translation/StringTranslation';
import RichTextTranslation from './translation/RichTextTranslation';
import Page from './website/Page';
import Component from './website/Component';
import Media from './website/Media';
import MediaTranslation from './website/MediaTranslation';
import MediaReference from './website/MediaReference';
import Room from './chat/Room';
import Message from './chat/Message';
import Currency from './currency/Currency';
import Rate from './currency/Rate';
import Team from './lunajets/Team';
import TeamMember from './lunajets/TeamMember';
import EmptyLeg from './lunajets/EmptyLeg';
import Office from './lunajets/Office';
import CustomerMessages from './chat/CustomerMessages';
import UserMessages from './chat/UserMessages';
import CustomerNotes from './chat/CustomerNotes';
import Partners from './website/Partners';
import Testimonials from './website/Testimonials';
import Article from './website/Article';
import ArticleCategory from './website/ArticleCategory';
import Event from './website/Event';
import Aircraft from './lunajets/Aircraft';
import AircraftCategory from './lunajets/AircraftCategory';
import AircraftManufacturer from './lunajets/AircraftManufacturer';
import Destination from './lunajets/Destination';

Event.belongsTo(User, {
  as: 'Author',
  foreignKey: 'user_id',
});

Event.belongsTo(Language, {
  as: 'Language',
  foreignKey: 'language_id',
});

Event.belongsTo(SF_AirportCity, {
  foreignKey: 'airport_city_sfid',
  sourceKey: 'sfid',
  targetKey: 'sfid',
  as: 'City',
});

Event.belongsTo(Media, {
  as: 'Media',
  foreignKey: 'media_id',
});

Language.hasMany(Event, {
  as: 'Events',
});

Destination.belongsTo(SF_AirportCity, {
  foreignKey: 'airport_city_sfid',
  sourceKey: 'sfid',
  targetKey: 'sfid',
  as: 'City',
});

SF_AirportCity.hasOne(Destination, {
  as: 'Destination',
});

Destination.belongsTo(User, {
  as: 'Author',
  foreignKey: 'user_id',
});

Destination.belongsTo(Language, {
  foreignKey: 'language_id',
  as: 'Language',
});

Aircraft.belongsTo(SF_AircraftModel, {
  constraints: false,
  foreignKey: 'aircraft_model_sfid',
  sourceKey: 'sfid',
  targetKey: 'sfid',
  as: 'Model',
});

AircraftManufacturer.belongsTo(SF_AircraftManufacturer, {
  foreignKey: 'external_manufacturer_sfid',
  as: 'Manufacturer',
});

SF_AircraftManufacturer.hasOne(AircraftManufacturer, {
  as: 'Manufacturer',
  foreignKey: 'external_manufacturer_sfid',
});

SF_AircraftModel.belongsTo(SF_AircraftCategory, {
  constraints: false,
  foreignKey: 'aircraft_categories__c',
  sourceKey: 'sfid',
  targetKey: 'sfid',
  as: 'Category',
});

SF_AircraftModel.belongsTo(SF_AircraftManufacturer, {
  constraints: false,
  foreignKey: 'manufacturer__c',
  sourceKey: 'sfid',
  targetKey: 'sfid',
  as: 'Manufacturer',
});

Aircraft.belongsTo(AircraftCategory, {
  foreignKey: 'category_id',
  as: 'Category',
});

Aircraft.belongsTo(Language, {
  as: 'Language',
  foreignKey: 'language_id',
});

Aircraft.belongsTo(AircraftManufacturer, {
  foreignKey: 'manufacturer_id',
  as: 'Manufacturer',
});

Aircraft.belongsTo(Media, {
  as: 'Media',
  foreignKey: 'media_id',
});

Aircraft.belongsToMany(Media, {
  as: 'Gallery',
  foreignKey: 'aircraft_id',
  through: '_aircraft_media_gallery',
  underscored: true,
  timestamps: false,
});

Media.belongsToMany(Aircraft, {
  as: 'Aircrafts',
  foreignKey: 'aircraft_media_id',
  through: '_aircraft_media_gallery',
  underscored: true,
  timestamps: false,
});

AircraftCategory.belongsTo(Language, {
  as: 'Language',
  foreignKey: 'language_id',
});

AircraftCategory.belongsTo(Media, {
  as: 'Media',
  foreignKey: 'media_id',
});

AircraftManufacturer.belongsTo(Language, {
  as: 'Language',
  foreignKey: 'language_id',
});

AircraftManufacturer.belongsTo(Media, {
  as: 'Media',
  foreignKey: 'media_id',
});

SF_Country.hasMany(SF_AirportCity, {
  constraints: false,
  foreignKey: 'country__c',
  sourceKey: 'sfid',
  as: 'Cities',
});

SF_AirportCity.hasMany(SF_Airport, {
  constraints: false,
  foreignKey: 'airport_city__c',
  sourceKey: 'sfid',
  as: 'Airports',
});

SF_AirportCity.belongsTo(SF_Country, {
  constraints: false,
  foreignKey: 'country__c',
  targetKey: 'sfid',
  as: 'Country',
});

SF_Airport.belongsTo(SF_AirportCity, {
  constraints: false,
  foreignKey: 'airport_city__c',
  targetKey: 'sfid',
  as: 'City',
});

/*

  ARTICLES =================================
*/

Language.hasMany(Article, {
  as: 'Articles',
});

Language.hasMany(ArticleCategory, {
  as: 'ArticleCategories',
});

ArticleCategory.belongsTo(Language, {
  as: 'Language',
  foreignKey: 'language_id',
});

ArticleCategory.hasMany(Article, {
  as: 'Articles',
  sourceKey: 'id',
  foreignKey: 'category_id',
});

Article.belongsTo(User, {
  as: 'Author',
  foreignKey: 'user_id',
});

Article.belongsTo(Media, {
  as: 'Media',
  foreignKey: 'media_id',
});

Article.belongsTo(Language, {
  as: 'Language',
  foreignKey: 'language_id',
});

Article.belongsTo(ArticleCategory, {
  as: 'Category',
  targetKey: 'id',
  foreignKey: 'category_id',
});

Article.belongsToMany(Media, {
  as: 'Gallery',
  foreignKey: 'media_id',
  through: '_articles_media_gallery',
  underscored: true,
  timestamps: false,
});

Media.belongsToMany(Article, {
  as: 'Article',
  foreignKey: 'article_id',
  through: '_articles_media_gallery',
  underscored: true,
  timestamps: false,
});

Testimonials.belongsTo(SF_Contact, {
  foreignKey: 'customer_contact_id',
  targetKey: 'sfid',
  as: 'Contact',
  constraints: false,
});

Testimonials.belongsTo(SF_Trip, {
  foreignKey: 'trip_id',
  targetKey: 'sfid',
  as: 'Trip',
  constraints: false,
});

Testimonials.belongsTo(Language, {
  foreignKey: 'language_id',
  as: 'Language',
});

Partners.belongsTo(Media, {
  foreignKey: 'media_id',
  as: 'Media',
});

Partners.belongsTo(Language, {
  foreignKey: 'language_id',
  as: 'Language',
});

SF_Account.hasMany(Message, {
  foreignKey: 'account_id',
  targetKey: 'externalid__c',
  constraints: false,
});

Message.belongsTo(SF_Account, {
  as: 'Customer',
  foreignKey: 'account_id',
  targetKey: 'externalid__c',
  constraints: false,
});

// SF_Account.belongsToMany(Message, {
//   foreignKey: 'account_id',
//   targetKey: 'externalid__c',
//   through: CustomerMessages,
//   constraints: false,
// });

// ROOM
Room.belongsTo(SF_Account, {
  foreignKey: 'account_id',
  targetKey: 'externalid__c',
  as: 'Customer',
  constraints: false,
});

SF_Account.hasOne(Room, {
  foreignKey: 'account_id',
  as: 'Room',
  constraints: false,
});

SF_Account.belongsToMany(Note, {
  as: 'Notes',
  foreignKey: 'account_id',
  through: CustomerNotes,
  underscored: true,
  timestamps: false,
  constraints: false,
});

Note.belongsToMany(SF_Account, {
  as: 'Customers',
  foreignKey: 'note_id',
  through: CustomerNotes,
  underscored: true,
  timestamps: false,
  constraints: false,
});

Language.belongsTo(Locale, {
  as: 'Locale',
  foreignKey: 'locale_id',
});

EmptyLeg.belongsTo(Currency, {
  as: 'Currency',
  foreignKey: 'currency_id',
});

EmptyLeg.belongsTo(Aircraft, {
  as: 'Aircraft',
  foreignKey: 'aircraft_id',
});

EmptyLeg.belongsTo(SF_Airport, {
  as: 'FromAirport',
  foreignKey: 'from_airport_id',
  sourceKey: 'id',
  constraints: false,
});

EmptyLeg.belongsTo(SF_Airport, {
  as: 'ToAirport',
  foreignKey: 'to_airport_id',
  sourceKey: 'id',
  constraints: false,
});

Locale.hasOne(Language, {
  as: 'Language',
});

TeamMember.belongsTo(Media, {
  as: 'Photo',
  foreignKey: 'media_id',
});

TeamMember.belongsToMany(Team, {
  as: 'Teams',
  foreignKey: 'member_id',
  through: '_team_members',
  underscored: true,
  timestamps: false,
});

Team.belongsToMany(TeamMember, {
  as: 'Members',
  foreignKey: 'team_id',
  through: '_team_members',
  underscored: true,
  timestamps: false,
});

TeamMember.belongsTo(User, {
  as: 'User',
  foreignKey: 'user_id',
});

Rate.belongsTo(Currency, {
  foreignKey: 'currency_from_id',
  as: 'From',
  undescored: true,
  timestamps: false,
});

Rate.belongsTo(Currency, {
  foreignKey: 'currency_to_id',
  as: 'To',
  underscored: true,
  timestamps: false,
});

StringTranslation.belongsTo(Language, {
  foreignKey: 'language_id',
  as: 'Language',
  timestamps: false,
});

Language.hasMany(StringTranslation, {
  foreignKey: 'language_id',
  as: 'Translations',
  timestamps: false,
});

RichTextTranslation.belongsTo(Language, {
  foreignKey: 'language_id',
  as: 'Language',
  timestamps: false,
});

Language.hasMany(RichTextTranslation, {
  foreignKey: 'language_id',
  as: 'RichTextTranslation',
  timestamps: false,
});

Message.belongsTo(Room, {
  as: 'Room',
  foreignKey: 'room_id',
  // through: 'chat_room_messages',
  underscored: true,
  timestamps: false,
});

Room.hasMany(Message, {
  as: 'Messages',
  foreignKey: 'room_id',
});

Room.belongsToMany(Note, {
  as: 'Notes',
  foreignKey: 'room_id',
  through: 'chat_room_notes',
  underscored: true,
  timestamps: false,
});

Message.belongsTo(User, {
  as: 'User',
  foreignKey: 'user_id',
  underscored: true,
  timestamps: false,
});

User.hasMany(Message);

Page.belongsTo(Page, {
  as: 'Children',
  foreignKey: 'parent_id',
});

Sitemap.belongsTo(Meta, {
  foreignKey: 'meta_id',
  as: 'Meta',
});

Page.belongsTo(User, {
  as: 'Owner',
  foreignKey: 'user_id',
});

UserRole.hasMany(User, {
  foreignKey: 'role_id',
  as: 'Users',
  timestamps: false,
});

User.belongsTo(UserRole, {
  foreignKey: 'role_id',
  as: 'Role',
  timestamps: false,
});

UserRole.belongsToMany(UserPermission, {
  foreignKey: 'role_id',
  through: '_role_permissions',
  timestamps: false,
  as: 'Permissions',
});

UserPermission.belongsToMany(UserRole, {
  foreignKey: 'permission_id',
  through: '_role_permissions',
  timestamps: false,
  as: 'Roles',
});

Media.belongsToMany(Language, {
  foreignKey: 'media_id',
  through: MediaTranslation,
  as: 'Translations',
});

Language.belongsToMany(Media, {
  through: MediaTranslation,
  foreignKey: 'language_id',
  as: 'MediaTranslations',
});

Media.hasMany(MediaTranslation, {
  as: 'Translations',
  foreignKey: 'media_id',
});

MediaReference.belongsTo(Media, {
  foreignKey: 'media_library_id',
  as: 'Media',
});

//
// CUSTOMER ACCOUNTS
// =========================================

SF_Account.hasMany(SF_Contact, {
  foreignKey: 'accountid',
  sourceKey: 'sfid',
  as: 'Contacts',
  constraints: false,
  allowNull: false,
});

SF_Contact.belongsTo(SF_Account, {
  foreignKey: 'accountid',
  targetKey: 'sfid',
  as: 'Account',
  allowNull: false,
});

async function sync({ force }) {
  return sequelize.sync([force]).then(async () => {
    if (force) {
      // await seed();
    }
  });
}

export default { sync };
export {
  Locale,
  StringTranslation,
  RichTextTranslation,
  Language,
  CustomerMessages,
  UserMessages,
  Meta,
  User,
  UserRole,
  UserPermission,
  Settings,
  Sitemap,
  Page,
  Template,
  UrlManager,
  Rate,
  Media,
  MediaReference,
  Currency,
  Message,
  Room,
  Component,
  Office,
  Team,
  TeamMember,
  MediaTranslation,
  EmptyLeg,
  Article,
  ArticleCategory,
  Aircraft,
  AircraftManufacturer,
  AircraftCategory,
  Destination,
  Event,
};
