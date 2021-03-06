import path from 'path';
import Promise from 'bluebird';
import {
  // TeamDepartment,
  // TeamMember,
  // TeamDepartmentTranslation,
  // TeamMemberTranslation,
  SFAirportCity,
  SFCountry,
  Language,
  Post,
  Term,
  TermTaxonomy,
  User,
  MediaLibrary
} from '../models';
import slugify from '../../core/generateSlug';
import sequelize from '../sequelize';

const filename = path.basename(__filename);
const DESCRIPTION = `Auto generated by seed name: ${filename}`;

export default {
  up: async () => {

    // author ====
    const author = await User.findOne();
    // languages ====
    const en = await Language.findOne({ where: { locale: 'en' } });
    const fr = await Language.findOne({ where: { locale: 'fr' } });
    // image ====
    // const image = await MediaLibrary.findOne({ order: Sequelize.fn('RANDOM') });
    // ENGLISH
    const city = await SFAirportCity.findOne({ order: sequelize.fn('RANDOM'), include: [{ model: SFCountry, as: 'country' }] });

    // page
    await Post.create({
      title: 'Career',
      post_id: 'carrr',
      meta: {
        template: 'career',
      },
      type: 'page',
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });

    // page
    await Post.create({
      title: 'Career FR',
      post_id: 'carrr',
      meta: {
        template: 'career',
      },
      type: 'page',
      state: 'published',
      user_id: author.id,
      language_id: fr.id,
      summary: DESCRIPTION,
    });


    // openings
    await Post.create({
      title: 'Automation Software Engineer',
      post_id: 'job1',
      meta: {
        location: city,
        src: 'https://lunajets.breezy.hr/p/104174cf73aa-full-stack-developer-js-react--html--css',
        duration: 1, // full-time
        template: 'job-details',
      },
      type: 'job', // new type job
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });

    await Post.create({
      title: 'Automation Software Engineer FR',
      post_id: 'job1',
      meta: {
        location: city,
        src: 'https://lunajets.breezy.hr/p/104174cf73aa-full-stack-developer-js-react--html--css',
        duration: 1, // full-time
        template: 'job-details',
      },
      type: 'job', // new type job
      state: 'published',
      user_id: author.id,
      language_id: fr.id,
      summary: DESCRIPTION,
    });


    await Post.create({
      title: 'Junior Business Analyst',
      post_id: 'job2',
      meta: {
        location: city,
        src: 'https://lunajets.breezy.hr/p/104174cf73aa-full-stack-developer-js-react--html--css',
        duration: 1, // full-time
        template: 'job-details',
      },
      type: 'job', // new type job
      state: 'published',
      user_id: author.id,
      language_id: en.id,
      summary: DESCRIPTION,
    });

    await Post.create({
      title: 'Junior Business Analyst FR',
      post_id: 'job2',
      meta: {
        location: city,
        src: 'https://lunajets.breezy.hr/p/104174cf73aa-full-stack-developer-js-react--html--css',
        duration: 1, // full-time
        template: 'job-details',
      },
      type: 'job', // new type job
      state: 'published',
      user_id: author.id,
      language_id: fr.id,
      summary: DESCRIPTION,
    });

  },
  down: async () => {
    await Post.destroy({ where: { post_id: { $in: ['job1', 'job2', 'carrr'] } }, force: true, cascade: true });
  },
};
