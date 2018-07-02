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
const post_tags = ['Tesla', 'Model 3', 'Elon Musk', 'Electric Cars'];

export default {
  up: async () => {

    const author = await User.findOne();
    const en = await Language.findOne({ where: { locale: 'en', enabled: true } });
    const fr = await Language.findOne({ where: { locale: 'fr', enabled: true } });
    const contentEN = JSON.parse ("{\"entityMap\":{},\"blocks\":[{\"key\":\"8donc\",\"text\":\"HELLO it is me\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":14,\"style\":\"BOLD\"},{\"offset\":0,\"length\":14,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3qoma\",\"text\":\"How are you?\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":12,\"style\":\"BOLD\"},{\"offset\":0,\"length\":12,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"agvao\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}");
    const contentFR = JSON.parse ("{\"entityMap\":{},\"blocks\":[{\"key\":\"8donc\",\"text\":\"BONJOUR monsieur\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":14,\"style\":\"BOLD\"},{\"offset\":0,\"length\":14,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3qoma\",\"text\":\"Comment ca va?\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":12,\"style\":\"BOLD\"},{\"offset\":0,\"length\":12,\"style\":\"ITALIC\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"agvao\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}");


    const term_news_en = await Term.findOne ({
      where: {
        language_id: en.id,
        slug: 'news-en'
      }
    });

    const term_news_fr = await Term.findOne ({
      where: {
        language_id: fr.id,
        slug: 'news-fr'
      }
    });

    const term_taxonomies_en = await TermTaxonomy.findOne ({
      where: {
        term_id: term_news_en.id,
        taxonomy: 'article_category'
      }
    });

    const term_taxonomies_fr = await TermTaxonomy.findOne ({
      where: {
        term_id: term_news_fr.id,
        taxonomy: 'article_category'
      }
    })

    // tags term
    const tags_taxonomies = await Promise.map(post_tags, async (tag) => {
      const term = await Term.create({
        name: tag,
        // slug is generated on before Hook on Term model
        language_id: en.id,
      });
      const tax = await TermTaxonomy.create({
        term_id: term.id,
        taxonomy: 'post_tag',
      });
      return tax;
    });

    const images = await MediaLibrary.findAll({ limit: 3 });
    
    const relatedPostEN = await Post.findAll({where: { type: "article", language_id: en.id }, limit: 3});
    const relatedPostFR = await Post.findAll({where: { type: "article", language_id: fr.id }, limit: 3});

    const listEN = await Promise.map(relatedPostEN, async (post) => {
      return { post_uuid:post.id };
    });

    const listFR = await Promise.map(relatedPostFR, async (post) => {
      return {post_uuid:post.id};
    });

    const newPostFR = await Post.create({
      post_id: '2223',
      title: 'Tesla model 3 report de Luna press',
      summary: 'Sommaire francais de cet article',
      body: {
        main: contentFR  
      },
      meta: {
        template: "article-details",
        also_interesting: listFR
      },
      state: 'published',
      featured: false,
      type: 'article',
      language_id: fr.id,
      user_id: author.id,
      media_id: images[1].id,
    });
    await newPostFR.addTaxonomies([term_taxonomies_fr]);

  },
  down: async () => {
    await Post.destroy({ where: { type: 'article', post_id: '2223' }, cascade: true, force: true});

    // await TermTaxonomy.destroy({
    //   where: {
    //     taxonomy: {
    //       $in: ['post_tag', 'post_category']
    //     },
    //   },
    //   include: [
    //     {
    //       model: Term,
    //       as: 'Term',
    //     },
    //     {
    //       model: Post,
    //       as: 'Posts',
    //       where: {
    //         type: 'post',
    //       },
    //     },
    //   ],
    //   force: true,
    //   cascade: true,
    // });
    // await TermTaxonomy.destroy({ where: { taxonomy: { $in: ['post_tag', 'post_category'] } }, cascade: true });
    // await Term.destroy({
    //   where: {
    //     slug: {
    //       $in: [
    //         ...post_tags.map(tag => slugify(tag)),
    //         ...post_cats.map(tag => slugify(tag)),
    //       ],
    //     },
    //   },
    //   cascade: true,
    // });
  },
};