import Promise from 'bluebird';
import path from 'path';
import slugify from '../../core/generateSlug';
import {
  Language,
  User,
  MediaLibrary,
  Post
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

    const image = await MediaLibrary.findOne({ order: Sequelize.fn('RANDOM') });

    const relatedPostEN = await Post.findAll ({where: {type: "aircraft", language_id: en.id}, limit: 5});
    const relatedPostFR = await Post.findAll ({where: {type: "aircraft", language_id: fr.id}, limit: 5});

    const aircraftMapPageEN1 = await Post.create({
      post_id: 'jetd1',
      title: 'Genova',
      summary: 'Summary of all jet in London',
      body: {
        main: contentEN
      },
      meta: {
        template: "jet-cost-destination",
        empty_leg_list: [
          {
            empty_leg_id: "09a4958a-3ba8-4145-b3b1-8e81e9b6a23a"
          },
          {
            empty_leg_id: "113f1ad6-8e5f-4359-a9dc-d22dda94db4c"
          },
          {
            empty_leg_id: "157b744a-5db0-417b-8c3e-6e787c45e8e4"
          }
        ],
        other_destinations: [
          {
            post_uuid: "jetd2"
          },
          {
            post_uuid: "jetd3"
          },
          {
            post_uuid: "jetd4"
          }
        ]
      },
      state: 'published',
      type: 'page',
      language_id: en.id,
      user_id: author.id,
      media_id: image.id,
    });

    const aircraftMapPageFR1 = await Post.create({
      post_id: 'jetd1',
      title: 'Genova',
      summary: 'Sommaire de tous les jet a Londre',
      body: {
        main: contentFR
      },
      meta: {
        template: "jet-cost-destination",
        empty_leg_list: [
          {
            empty_leg_id: "09a4958a-3ba8-4145-b3b1-8e81e9b6a23a"
          },
          {
            empty_leg_id: "113f1ad6-8e5f-4359-a9dc-d22dda94db4c"
          },
          {
            empty_leg_id: "157b744a-5db0-417b-8c3e-6e787c45e8e4"
          }
        ],
        other_destinations: [
          {
            post_uuid: "jetd2"
          },
          {
            post_uuid: "jetd3"
          },
          {
            post_uuid: "jetd4"
          }
        ]
      },
      state: 'published',
      type: 'page',
      language_id: fr.id,
      user_id: author.id,
      media_id: image.id,
    });

    const aircraftMapPageEN2 = await Post.create({
      post_id: 'jetd2',
      title: 'London',
      summary: 'Summary of all jet in London',
      body: {
        main: contentEN
      },
      meta: {
        template: "jet-cost-destination",
        empty_leg_list: [
          {
            empty_leg_id: "09a4958a-3ba8-4145-b3b1-8e81e9b6a23a"
          },
          {
            empty_leg_id: "113f1ad6-8e5f-4359-a9dc-d22dda94db4c"
          },
          {
            empty_leg_id: "157b744a-5db0-417b-8c3e-6e787c45e8e4"
          }
        ],
        other_destinations: [
          {
            post_uuid: "jetd1"
          },
          {
            post_uuid: "jetd3"
          },
          {
            post_uuid: "jetd4"
          }
        ]
      },
      state: 'published',
      type: 'page',
      language_id: en.id,
      user_id: author.id,
      media_id: image.id,
    });

    const aircraftMapPageFR2 = await Post.create({
      post_id: 'jetd2',
      title: 'London',
      summary: 'Sommaire de tous les jet a Londre',
      body: {
        main: contentFR
      },
      meta: {
        template: "jet-cost-destination",
        empty_leg_list: [
          {
            empty_leg_id: "09a4958a-3ba8-4145-b3b1-8e81e9b6a23a"
          },
          {
            empty_leg_id: "113f1ad6-8e5f-4359-a9dc-d22dda94db4c"
          },
          {
            empty_leg_id: "157b744a-5db0-417b-8c3e-6e787c45e8e4"
          }
        ],
        other_destinations: [
          {
            post_uuid: "jetd1"
          },
          {
            post_uuid: "jetd3"
          },
          {
            post_uuid: "jetd4"
          }
        ]
      },
      state: 'published',
      type: 'page',
      language_id: fr.id,
      user_id: author.id,
      media_id: image.id,
    });

    const aircraftMapPageEN3 = await Post.create({
      post_id: 'jetd3',
      title: 'Berlin',
      summary: 'Summary of all jet in London',
      body: {
        main: contentEN
      },
      meta: {
        template: "jet-cost-destination",
        empty_leg_list: [
          {
            empty_leg_id: "09a4958a-3ba8-4145-b3b1-8e81e9b6a23a"
          },
          {
            empty_leg_id: "113f1ad6-8e5f-4359-a9dc-d22dda94db4c"
          },
          {
            empty_leg_id: "157b744a-5db0-417b-8c3e-6e787c45e8e4"
          }
        ],
        other_destinations: [
          {
            post_uuid: "jetd2"
          },
          {
            post_uuid: "jetd1"
          },
          {
            post_uuid: "jetd4"
          }
        ]
      },
      state: 'published',
      type: 'page',
      language_id: en.id,
      user_id: author.id,
      media_id: image.id,
    });

    const aircraftMapPageFR3 = await Post.create({
      post_id: 'jetd3',
      title: 'Berlin',
      summary: 'Sommaire de tous les jet a Londre',
      body: {
        main: contentFR
      },
      meta: {
        template: "jet-cost-destination",
        empty_leg_list: [
          {
            empty_leg_id: "09a4958a-3ba8-4145-b3b1-8e81e9b6a23a"
          },
          {
            empty_leg_id: "113f1ad6-8e5f-4359-a9dc-d22dda94db4c"
          },
          {
            empty_leg_id: "157b744a-5db0-417b-8c3e-6e787c45e8e4"
          }
        ],
        other_destinations: [
          {
            post_uuid: "jetd2"
          },
          {
            post_uuid: "jetd1"
          },
          {
            post_uuid: "jetd4"
          }
        ]
      },
      state: 'published',
      type: 'page',
      language_id: fr.id,
      user_id: author.id,
      media_id: image.id,
    });

    const aircraftMapPageEN4 = await Post.create({
      post_id: 'jetd4',
      title: 'Paris',
      summary: 'Summary of all jet in London',
      body: {
        main: contentEN
      },
      meta: {
        template: "jet-cost-destination",
        empty_leg_list: [
          {
            empty_leg_id: "09a4958a-3ba8-4145-b3b1-8e81e9b6a23a"
          },
          {
            empty_leg_id: "113f1ad6-8e5f-4359-a9dc-d22dda94db4c"
          },
          {
            empty_leg_id: "157b744a-5db0-417b-8c3e-6e787c45e8e4"
          }
        ],
        other_destinations: [
          {
            post_uuid: "jetd2"
          },
          {
            post_uuid: "jetd3"
          },
          {
            post_uuid: "jetd1"
          }
        ]
      },
      state: 'published',
      type: 'page',
      language_id: en.id,
      user_id: author.id,
      media_id: image.id,
    });

    const aircraftMapPageFR4 = await Post.create({
      post_id: 'jetd4',
      title: 'Paris',
      summary: 'Sommaire de tous les jet a Londre',
      body: {
        main: contentFR
      },
      meta: {
        template: "jet-cost-destination",
        empty_leg_list: [
          {
            empty_leg_id: "09a4958a-3ba8-4145-b3b1-8e81e9b6a23a"
          },
          {
            empty_leg_id: "113f1ad6-8e5f-4359-a9dc-d22dda94db4c"
          },
          {
            empty_leg_id: "157b744a-5db0-417b-8c3e-6e787c45e8e4"
          }
        ],
        other_destinations: [
          {
            post_uuid: "jetd2"
          },
          {
            post_uuid: "jetd3"
          },
          {
            post_uuid: "jetd1"
          }
        ]
      },
      state: 'published',
      type: 'page',
      language_id: fr.id,
      user_id: author.id,
      media_id: image.id,
    });
  },
  down: async () => {
    await Post.destroy({ where: { type: 'page', post_id: ['jetd1', 'jetd2', 'jetd3', 'jetd4']}, cascade: true, force: true });
  },

};