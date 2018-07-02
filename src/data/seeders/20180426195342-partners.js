import path from 'path';
import Promise from 'bluebird';
import {
  // TeamDepartment,
  // TeamMember,
  // TeamDepartmentTranslation,
  // TeamMemberTranslation,
  Language,
  Post,
  Term,
  TermTaxonomy,
  User,
  MediaLibrary
} from '../models';
import slugify from '../../core/generateSlug';
import Sequelize from '../sequelize';

const filename = path.basename(__filename);
const DESCRIPTION = `Auto generated by seed name: ${filename}`;

export default {
  up: async () => {

    // author ====
    const author = await User.findOne();
    // languages ====
    const en = await Language.findOne({ where: { locale: 'en' } });
    const fr = await Language.findOne({ where: { locale: 'fr' } });
    // content ====
    const contentEN = JSON.parse ("{\"entityMap\":{},\"blocks\":[{\"key\":\"8donc\",\"text\":\"HELLO it is me\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":14,\"style\":\"BOLD\"},{\"offset\":0,\"length\":14,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3qoma\",\"text\":\"How are you?\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":12,\"style\":\"BOLD\"},{\"offset\":0,\"length\":12,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"agvao\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}");
    const contentFR = JSON.parse ("{\"entityMap\":{},\"blocks\":[{\"key\":\"8donc\",\"text\":\"BONJOUR monsieur\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":14,\"style\":\"BOLD\"},{\"offset\":0,\"length\":14,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3qoma\",\"text\":\"Comment ca va?\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":12,\"style\":\"BOLD\"},{\"offset\":0,\"length\":12,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"agvao\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}");
    // image ====
    const image = await MediaLibrary.findOne({ order: Sequelize.fn('RANDOM') });

    // ENGLISH
    await Post.create({
      title: 'Partners',
      post_id: 'partnr',
      meta: {
        template: 'partners',
      },
      type: 'page',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });

    await Post.create({
      title: 'Partners FR',
      post_id: 'partnr',
      meta: {
        template: 'partners',
      },
      type: 'page',
      state: 'published',
      user_id: author.id,
      language_id: fr.id,
      summary: DESCRIPTION,
    });

    await Post.create({
      title: 'Google',
      post_id: 'gogo',
      body: contentEN,
      meta: {
        template: 'partner-details',
      },
      type: 'partner',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
      media_id: image.id,
    });

    await Post.create({
      title: 'Yaahoo',
      post_id: 'yaa',
      body: contentEN,
      meta: {
        template: 'partner-details',
      },
      type: 'partner',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
      media_id: image.id,
    });

    await Post.create({
      title: 'Google FR',
      post_id: 'gogo',
      body: contentFR,
      meta: {
        template: 'partner-details',
      },
      type: 'partner',
      state: 'published',
      user_id: author.id,
      language_id: fr.id,
      summary: DESCRIPTION,
      media_id: image.id,
    });

    await Post.create({
      title: 'Yaahoo FR',
      post_id: 'yaa',
      body: contentFR,
      meta: {
        template: 'partner-details',
      },
      type: 'partner',
      state: 'published',
      user_id: author.id,
      language_id: fr.id,
      summary: DESCRIPTION,
      media_id: image.id,
    });

  },
  down: async () => {
    await Post.destroy({ where: { post_id: { $in: ['yaa', 'gogo', 'partnr'] } }, force: true, cascade: true });
  },
};