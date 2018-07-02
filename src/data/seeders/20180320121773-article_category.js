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

const post_cats_en = [
  {
    name: "News",
    slug: "news-en",
    displayName: "News"
  },
  {
    name: "CSR",
    slug: "csr-en",
    displayName: "Corporate Social Responsibility"

  },
  {
    name: "Our Tips",
    slug: "our-tips-en",
    displayName: "Our Tips"
  },
  {
    name: "Corporate Services",
    slug: "corporate-services-en",
    displayName: "Corporate Services"
  },
  {
    name: "Services",
    slug: "services-en",
    displayName: "Services"
  },
  {
    name: "Media Coverage",
    slug: "media-coverage-en",
    displayName: "Media Coverage"
  },
  {
    name: "Press Release",
    slug: "press-release-en",
    displayName: "Media Coverage"
  },
];

const post_cats_fr = [
  {
    name: "News",
    slug: "news-fr",
    displayName: "Actualité"
  },
  {
    name: "CSR",
    slug: "csr-fr",
    displayName: "Responsabilité Sociale Des Entreprises"
  },
  {
    name: "Our Tips",
    slug: "our-tips-fr",
    displayName: "Nos Conseils"
  },
  {
    name: "Corporate Services",
    slug: "corporate-services-fr",
    displayName: "Industrie d'Entreprise"
  },
  {
    name: "Services",
    slug: "services-fr",
    displayName: "Services"
  },
  {
    name: "Media Coverage",
    slug: "media-coverage-fr",
    displayName: "Media Coverage"
  },
  {
    name: "Press Release",
    slug: "press-release-fr",
    displayName: "Revue de Presse"
  },
];

export default {
  up: async () => {

    const author = await User.findOne();
    const en = await Language.findOne({ where: { locale: 'en', enabled: true } });
    const fr = await Language.findOne({ where: { locale: 'fr', enabled: true } });
    
    // category term EN
    const cats_taxonomies_en = await Promise.map(post_cats_en, async (cat) => {
      const term = await Term.create({
        name: cat.name,
        slug: cat.slug,
        meta: {
          displayName: cat.displayName
        },
        language_id: en.id,
      });
      const tax = await TermTaxonomy.create({
        term_id: term.id,
        taxonomy: 'article_category',
      });
      return tax;
    });

    // category term FR
    const cats_taxonomies_fr = await Promise.map(post_cats_fr, async (cat) => {
      const term = await Term.create({
        name: cat.name,
        slug: cat.slug,
        meta: {
          displayName: cat.displayName
        },
        language_id: fr.id,
      });
      const tax = await TermTaxonomy.create({
        term_id: term.id,
        taxonomy: 'article_category',
      });
      return tax;
    });
  },
  down: async () => {

    await TermTaxonomy.destroy({
      where: {
        taxonomy: {
          $in: ['article_category']
        },
      },
      include: [
        {
          model: Term,
          as: 'Term',
        },
        {
          model: Post,
          as: 'Posts',
          where: {
            type: 'article',
          },
        },
      ],
      force: true,
      cascade: true,
    });
    
    await Term.destroy({
      where: {
        name: {
          $in: [
            ...post_cats_en.map(cat => cat.name),
            ...post_cats_fr.map(cat => cat.name),
          ],
        },
      },
      cascade: true,
    });
  },
};