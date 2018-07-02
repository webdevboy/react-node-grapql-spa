/* eslint-disable */
import Promise from 'bluebird';
import _ from "lodash";
import sitemap from 'sitemap';
import fs from 'fs';
import generateUrls from 'universal-router/generateUrls';
import { Post, EmptyLeg } from "../data/models";

export default async ({ routes, langs, hostname }, s3, bucket) => {
  const index = [];
  const url = generateUrls(routes);
  const { byId: localesById, locales } = langs;

  await Promise.each(Object.keys(locales), async (locale) => {

    const urls = [];

    // homes
    const homes = await Post.findAll({ where: { slug: 'home', state: "published", language_id: locales[locale].id } });
    if (homes && homes.length) homes.forEach(({ language_id }) => urls.push(url('home', { locale })));

    // post-types
    /*
    const post_types = await Post.findAll({
      attributes: ['slug', 'type'],
      where: {
        type: { $not: 'page' },
        language_id: locales[locale].id,
      },
      raw: true,
    });
    if (post_types.length) post_types.forEach(({ slug, type }) => urls.push(url('post-type', { locale, type, slug })));
    */

    // empty-leg-type
    // const emptylegs = await EmptyLeg.findAll({ attributes: ['id'], raw: true });
    // if (emptylegs && emptylegs.length) emptylegs.forEach(({ id }) => urls.push(url('empty-leg-type', { locale, id })));

    // pages
    const pages = await Post.findAll({
      where: {
        state: "published",
        language_id: locales[locale].id,
        slug: {
          $not: 'home'
        },
        type: {
          $notIn: ['office', 'review', 'team_member'],
        },
      },
    });
    if (pages && pages.length) {
      
      pages.forEach((page) => {
        let slugsArray = [];
        if (page.meta && page.meta.pathUrl) {
          const listValue = Object.values(page.meta.pathUrl);
          const orderedList = _.orderBy(listValue, 'order', 'asc');
          const listSlug = _.map(orderedList, "url");
          slugsArray = listSlug.concat(page.slug);
        } else {
          slugsArray = [page.slug];
        }
        urls.push(url('page', {
          locale,
          slug: slugsArray
        }));
      });

    }

    const sm = sitemap.createSitemap({
      hostname,
      urls,
    });

    const filename = `sitemaps/lunajets-${locale}.xml.gz`;

    await s3.upload({
      Bucket: bucket,
      Key: filename,
      Body: sm.toGzip(),
      ContentType: 'application/xml',
      ACL: 'public-read',
      ContentEncoding: 'gzip'
    }).promise();

    const src = 'https://s3-eu-west-1.amazonaws.com/';
    const srcPrefix = src + bucket + '/';

    index.push(`${srcPrefix}${filename}`);
  });
  
  return index;
};
