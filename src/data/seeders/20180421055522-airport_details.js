import Promise from 'bluebird';
import path from 'path';
import moment from 'moment';
import { randomBytes } from 'crypto';
import slugify from '../../core/generateSlug';
import {
  SFAircraftModel,
  SFAircraftManufacturer,
  SFAircraftCategory,
  SFAirport,
  Post,
  Term,
  TermTaxonomy,
  MediaLibrary,
  Language,
  User,
} from '../models';
import Sequelize from '../sequelize';

const filename = path.basename(__filename);
const DESCRIPTION = `Auto generated by seed name: ${filename}`;

export default {
  up: async () => {

    const author = await User.findOne();
    const en = await Language.findOne({ where: { locale: 'en' } });
    const fr = await Language.findOne({ where: { locale: 'fr' } });

    const contentEN = JSON.parse ("{\"entityMap\":{},\"blocks\":[{\"key\":\"8donc\",\"text\":\"HELLO it is me\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":14,\"style\":\"BOLD\"},{\"offset\":0,\"length\":14,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3qoma\",\"text\":\"How are you?\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":12,\"style\":\"BOLD\"},{\"offset\":0,\"length\":12,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"agvao\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}");
    const contentFR = JSON.parse ("{\"entityMap\":{},\"blocks\":[{\"key\":\"8donc\",\"text\":\"BONJOUR monsieur\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":14,\"style\":\"BOLD\"},{\"offset\":0,\"length\":14,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3qoma\",\"text\":\"Comment ca va?\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":12,\"style\":\"BOLD\"},{\"offset\":0,\"length\":12,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"agvao\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}");

    const airportImage = await MediaLibrary.findOne({ order: [Sequelize.fn('RANDOM')] });
    const sfAirports = await SFAirport.findAll({ limit: 10 });

    await Promise.each(sfAirports, async (sfAirport, index) => {
      const airportEN = await Post.create({
        post_id: 'port'+index,
        title: sfAirport.name + " english",
        summary: DESCRIPTION,
        meta: {
          template: "airport-details",
          airport_sfid: sfAirport.sfid
        },
        body: {
          main: contentEN
        },
        state: 'published',
        type: 'airport',
        published: true,
        user_id: author.id,
        language_id: en.id,
        media_id: airportImage.id,
      });

      const airportFR = await Post.create({
        post_id: 'port'+index,
        title: sfAirport.name + " francais",
        summary: DESCRIPTION,
        meta: {
          template: "airport-details",
          airport_sfid: sfAirport.sfid
        },
        body: {
          main: contentFR
        }
        ,
        state: 'published',
        type: 'airport',
        published: true,
        user_id: author.id,
        language_id: fr.id,
        media_id: airportImage.id,
      });

    });


  },
  down: async () => {
    
    await Post.destroy({
      where: {
        type: 'airport',
      },
      cascade: true,
      force: true
    });
  }
};