import Promise from 'bluebird';
import path from 'path';
import slugify from '../../core/generateSlug';
import {
  Language,
  User,
  MediaLibrary,
  Post,
  Term,
  TermTaxonomy,
} from '../models';

const filename = path.basename(__filename);
const DESCRIPTION = `Auto generated by seed name: ${filename}`;

export default {
  up: async (queryInterface, Sequelize) => {
    // media center, contact-us, mobile-app, press-release, news-list

    const author = await User.findOne();
    const en = await Language.findOne({ where: { locale: 'en', enabled: true } });
    const fr = await Language.findOne({ where: { locale: 'fr', enabled: true } });
    const langs = [en, fr];

    // media center
    await Promise.each(langs, async (lang) => {
      await Post.create({
        post_id: 'mediac',
        title: `Media Center ${lang.locale}`,
        slug: `media-center-${lang.locale}`,
        meta: {
          template: 'media-center',
        },
        type: 'page',
        state: 'published',
        user_id: author.id,
        summary: DESCRIPTION,
        language_id: lang.id,
      });
    });

    // contact-us
    await Promise.each(langs, async (lang) => {
      await Post.create({
        post_id: 'conktk',
        title: `Contact Us ${lang.locale}`,
        slug: `contact-us-${lang.locale}`,
        meta: {
          template: 'contact-us',
        },
        type: 'page',
        state: 'published',
        user_id: author.id,
        summary: DESCRIPTION,
        language_id: lang.id,
      });
    });

    // mobile app
    await Promise.each(langs, async (lang) => {
      await Post.create({
        post_id: 'mB4pp',
        title: `Mobile App ${lang.locale}`,
        slug: `mobile-app-${lang.locale}`,
        meta: {
          template: 'mobile-app',
        },
        type: 'page',
        state: 'published',
        user_id: author.id,
        summary: DESCRIPTION,
        language_id: lang.id,
      });
    });
   
    // press release
    await Promise.each(langs, async (lang) => {
      await Post.create({
        post_id: 'prssR',
        title: `Press Releases ${lang.locale}`,
        slug: `press-releases-${lang.locale}`,
        meta: {
          template: 'press-release',
        },
        type: 'page',
        state: 'published',
        user_id: author.id,
        summary: DESCRIPTION,
        language_id: lang.id,
      });
    });
    
    // news list
    await Promise.each(langs, async (lang) => {
      await Post.create({
        post_id: 'nl1st',
        title: `News List ${lang.locale}`,
        slug: `news-list-${lang.locale}`,
        meta: {
          template: 'news-list',
        },
        type: 'page',
        state: 'published',
        user_id: author.id,
        summary: DESCRIPTION,
        language_id: lang.id,
      });
    });

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
