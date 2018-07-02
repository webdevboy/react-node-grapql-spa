import _ from "lodash";
import React from "react";
import generateUrls from "universal-router/generateUrls";
import { getIntl, setLocale } from "../../shared/actions/intl";
import { getIpInfo } from "../../themes/lunajets/actions/IpInfo";
import { setEditMode } from "../../themes/lunajets/actions/auth";
import Cookies from "js-cookie";

import QUERY_GET_POSTS from "./queries/queryGetPosts.gql";
import QUERY_GET_POST from "./queries/queryGetPost.gql";
import QUERY_GET_POSTS_BY_SLUG from "./queries/queryGetPostsBySlug.gql";
import QUERY_GET_EMPTY_LEG from "./queries/queryGetEmptyLeg.gql";
import slugify from 'slugify';

const routes = {
  name: "root",
  path: "/:locale([a-z]{2})?", // locale

  // Keep in mind, routes are evaluated in order
  children: [
    {
      /**
       * HOME PAGE ROUTE
       */
      name: "home",
      chunk: "home",
      path: "",
      async action({ theme, client, params, query, homePage, store, next, router }) {
        const { templates: Templates } = theme;
        const { availableLocales } = store.getState().runtime;
        const { defaultLocale, messages } = store.getState().intl;
        const { id, locale } = _.find(availableLocales, {
          locale: params.locale || defaultLocale,
        });

        const {
          data: { post },
        } = await client.query({
          query: QUERY_GET_POST,
          variables: {
            slug: homePage, // 'home'
            type: "page",
            language_id: id,
          },
        });

        // if not found, jump out
        if (!post) {
          const jump = await next();
          return jump;
        }

        const { title, meta, summary, translations } = post;

        /**
         * FIND THE TEMPLATE BASED ON THE HIERARCHY ORDER
         */
        const Template = (await Templates["home"]) || Templates["page"];

        const xDefault = {
          locale: defaultLocale,
        };

        if (params.locale && params.locale !== defaultLocale) {
          const x = _.find(translations, ({ language }) => (language.locale === defaultLocale));
          xDefault.locale = x.locale;
        }

        const url = generateUrls(router);
        const hreflangs = [
          // translations
          ...translations.map(translation => ({
            locale: translation.language.locale,
            path: url("home", { locale: translation.language.locale }),
          })),
          {
            // current
            locale: params.locale || defaultLocale,
            path: url("home", { locale: params.locale || defaultLocale }),
          },
          {
            locale: "x-default",
            path: url("home", xDefault),
          },
        ];

        return {
          meta: {
            ...meta,
            title,
            description: summary,
          },
          hreflangs,
          params,
          query,
          component: <Template post={post} isHomePage />,
        };
      },
    },
    require("./newsletter").default,
    require("./customer-area").default,
    {
      /**
       * SEARCH PAGE ROUTE
       */
      name: "search",
      chunk: "search",
      path: "/search",
      async action({ theme, client, params, homePage, store, next, router, query }) {
        const { templates: Templates } = theme;
        const Template = await Templates["page_search"];
        const hreflangs = [];
        return {
          meta: {
            title: "Search",
          },
          component: <Template {...{ ...query, hreflangs }} />,
        };
      },
    },
    {
      /**
       * PAGES
       * Slug path (e.g. evergreen/events/single-event, jet-prive/vol-a-lisbon)
       */
      name: "page",
      path: "/:slug*", // private-jet-charter/fly-to-lisbon
      chunk: "page",
      // evergreen/events/single-event
      async action({ params, next, client, theme, store, router, query }) {
        const { availableLocales } = store.getState().runtime;
        const { defaultLocale } = store.getState().intl;
        const { id } = _.find(availableLocales, {
          locale: params.locale || defaultLocale,
        });
        
        const slugs = _.clone(params.slug) || [];

        // console.log(slugs);
        // let slugs = _.clone(params.slug);
        // console.log('slugs => ', slugs);
        // const lastSlug = slugs[slugs.length - 1];
        // console.log('lastSlug => ',lastSlug);

        // console.log('true slugs => ', params.slug);
        const {
          data: { posts },
        } = await client.query({
          query: QUERY_GET_POSTS_BY_SLUG,
          variables: {
            slug: params.slug[params.slug.length - 1],
            language_id: id
          }
        });
        //Analyse the url stored in meta (pathUrl) to find the correct page
        // const postFiltered = _.filter(posts, (post, index) => {

        //   const listValue = post.meta.pathUrl ? Object.values(post.meta.pathUrl) : [];
        //   const listSlug = _.map(listValue, 'url');
        //   console.log(listSlug);
          
        //   return ((params.slug.length === 0 || !post.meta.pathUrl || _.isEmpty(post.meta.pathUrl))) ||
        //     _.isEqual(slugs.sort(), listSlug.sort())
        // });

        // Analyse the url stored in meta (pathUrl) to find the correct page
        const postFiltered = _.filter(posts, (post, index) => {
          const listValue = post.meta.pathUrl ? Object.values(post.meta.pathUrl) : [];

          // console.log(_.sortBy(listValue, 'order'));
          
          const listSlug = _.map(_.sortBy(listValue, 'order'), 'url').concat(post.slug);
      
          return (_.isEqual(
              params.slug,
              listSlug,
            )
          );
        });

        // console.log(postFiltered);
        if (!postFiltered || !postFiltered.length || postFiltered.length > 1) {
          console.log("jumping route!");
          const jump = await next();
          return jump;
        }

        const post = postFiltered[0];
        const { meta, summary, state, title, translations, slug, body, media } = post;

        /** DRAFT MODE */
        if (state === "draft") {
          const { user } = store.getState().auth;
          if (!user || (user && !user.is_admin)) {
            console.log("jumping route! no privileges");
            const jump = await next();
            return jump;
          }
        }
        const Templates = theme.templates;

        /**
         * page_${slug}
         * page_${meta.template}
         * page
         */
        const Template =
          (await (meta.template && Templates[`page_${meta.template}`])) ||
          (await (meta.template && Templates[`single_${meta.template}`])) ||
          Templates[`page`];
        
        
        // console.log('post => ',post);
        const xDefault = {};
        if (params.locale && params.locale !== defaultLocale) {
          const x = _.find(translations, ({ language }) => language.locale === defaultLocale);
          if (x) {
            xDefault.locale = defaultLocale;
            xDefault.slug = (x.meta.pathUrl && Object.keys(x.meta.pathUrl).length)
              ? _.map(_.sortBy(Object.values(x.meta.pathUrl), 'order'), 'url').concat(x.slug)
              : [x.slug];
          }
        }

        // hreflangs
        // console.log('params => ',params);
        const url = generateUrls(router);
        const hreflangs = [
          ...translations.map(translation => ({
            locale: translation.language.locale,
            path: url("page", {
              locale: translation.language.locale,
              slug: (translation.meta.pathUrl && Object.keys(translation.meta.pathUrl).length)
                ? _.map(_.sortBy(Object.values(translation.meta.pathUrl), 'order'), 'url').concat(translation.slug)
                : [translation.slug],
            }),
          })),
          // current
          {
            locale: params.locale || defaultLocale,
            path: url("page", {
              locale: params.locale || defaultLocale,
              slug: params.slug, //translation.ancestors.map(ancestor => ancestor.slug).concat(translation.slug),
            }),
          },
          {
            locale: "x-default",
            path: url("page", xDefault),
          },
        ];

        // console.log('hreflangs page => ',hreflangs);
        return {
          meta: {
            title,
            description: summary,
            author: meta.author || null,
            keywords: meta.keywords || null,
          },
          hreflangs,
          component: <Template post={post} />,
        };
      },
    },
    {
      name: "empty-leg-type",
      chunk: "empty-leg-post",
      /**
       * CUSTOM POST TYPE
       * SEO example: /en/empty-leg-flights/empty-leg-london-paris-38/
       */

      path: "/:slug/:id", // empty leg detailis id: 'destination'
      async action({ params, next, client, theme, store, router, query }) {
        console.log("STARTING EMPTYLEG ROUTE");
        const { templates: Templates } = theme;
        const { availableLocales } = store.getState().runtime;
        const { defaultLocale } = store.getState().intl;
        const { id } = _.find(availableLocales, {
          locale: params.locale || defaultLocale,
        });

        const {
          data: { posts },
        } = await client.query({
          query: QUERY_GET_POSTS_BY_SLUG,
          variables: {
            slug: params.slug,
            language_id: id
          }
        });

        // console.log(posts);

        //Analyse the  meta data
        const postFiltered = _.filter(posts, post => post.meta.template === "empty-legs");

        // console.log(postFiltered);
        if (!postFiltered || !postFiltered.length || postFiltered.length > 1) {
          console.log("jumping route!");
          const jump = await next();
          return jump;
        }

        // Parse the params.id to extract the empty leg id
        let emptyLegId = params.id;
        emptyLegId = emptyLegId.slice(emptyLegId.lastIndexOf("-") + 1).trim();  
        if (isNaN(emptyLegId)) {
          const jump = await next();
          return jump;
        }
        
        const variables = {
          language_id: id,
          id: emptyLegId,
        };

        const {
          data: { emptyleg },
        } = await client.query({
          query: QUERY_GET_EMPTY_LEG,
          variables,
        });

        // if not found, jump out
        if (!emptyleg) {
          const route = await next();
          return route;
        }

        // console.log('empty-leg',emptyleg);

        // search for template by the following order on 1st occurance
        /**
         * single_${type}-${slug}.tpl // eg: single-aircraft-bombardier-global-6000.tpl
         * single_${type}.tpl // eg: single-aircraft.tpl
         * single.tpl
         */
        const Template = Templates[`single_empty-legs-details`];

        const url = generateUrls(router);

        function getEmptyLegLink(locale) {
          const language_id = availableLocales[locale].id;
          const slugEL = _.find(emptyleg.translations, { language_id });
          const nameFrom = slugify((emptyleg.from_airport.city[`name_${locale}`] || emptyleg.from_airport.city['name']), { lower: true, remove: /[$*^`´|_§#€?&$+~.%=()'"!,\\/\:@]/i });
          const nameTo = slugify((emptyleg.to_airport.city[`name_${locale}`] || emptyleg.to_airport.city['name']), { lower: true, remove: /[$*^`´|_§#€?&$+~.%=()'"!,\\/\:@]/i });;
          return `${slugEL.translation||slugEL.defaultMessage}-${nameFrom}-${nameTo}-${emptyleg.id}`;
        };
      
        const hreflangs = [
          ...postFiltered[0].translations.map(translation => ({
            locale: translation.language.locale,
            path: url("empty-leg-type", {
              locale: translation.language.locale,
              slug: translation.slug,
              id: getEmptyLegLink(translation.language.locale)
            })
          })),
          // current
          {
            locale: params.locale || defaultLocale,
            path: url("empty-leg-type", {
              locale: params.locale || defaultLocale,
              slug: postFiltered[0].slug,
              id: getEmptyLegLink(params.locale || defaultLocale)
            })
          },
          {
            locale: "x-default",
            path: url("empty-leg-type", {
              locale: params.locale || defaultLocale,
              slug: postFiltered[0].slug,
              id: getEmptyLegLink(params.locale || defaultLocale)
            })
          }
        ];

        const fromCityName = emptyleg.from_airport[`name_${params.locale}`];
        const toCityName = emptyleg.to_airport[`name_${params.locale}`];
        const title = `${emptyleg.from_airport.iata}, ${fromCityName} - ${emptyleg.to_airport.iata}, ${toCityName}`;

        return {
          meta: {
            title: `Empty Leg - ${title}`,
            description: `Book a private jet charter Empty Leg and save up to 75% - ${title}`,
            keywords: `empty leg, ${emptyleg.from_airport.iata}, ${fromCityName}, ${
              emptyleg.to_airport.iata
            }, ${toCityName}`,
          },
          hreflangs,
          component: <Template emptyLeg={emptyleg} />,
        };
      },
    },
    {
      path: "(.*)",
      name: "Not Found",
      load: () => import(/* webpackChunkName: "client-404" */ "./404"),
    },
  ],
  async action({ next, meta, theme, client, params, store, isMaintenance, query, locale }) {
    console.log("START MIDDLEWARE");
    const { theme: Theme, templates: Templates } = theme;

    if (isMaintenance) {
      return {
        meta: {
          title: "503 - Service Unavailable",
        },
        component: Templates["503"],
        status: 503,
      };
    }

    if (params.locale) { await store.dispatch(setLocale({ locale: params.locale })) }
    if (!store.getState().ipInfo.ip) { await store.dispatch(getIpInfo()) }

    const route = await next();
    console.log("AFTER MIDDLEWARE");

    const context = {
      params: route.params,
      query: route.query,
      hreflangs: route.hreflangs,
    };

    if (route.redirect) {
      return route;
    }

    route.meta = {
      title: `${route.meta.title || "Untitled Page"} | ${meta.title}`,
      description: route.meta.description || meta.description,
      keywords: route.meta.keywords || meta.keywords,
      author: route.meta.author || meta.author,
    };

    // const editor = store.getState().
    // wraps the component with the theme
    route.component = (
      <Theme context={context} editor={false}>
        {route.component}
      </Theme>
    );
    route.locale = params.locale || locale;

    return route;
  },
};

// The error page is available by permanent url for development mode
// if (__DEV__) {
//   routes.children.unshift({
//     path: "/error",
//     action: require("./error").default,
//   });
// }

export default routes;
