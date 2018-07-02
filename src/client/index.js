import express from "express";
import Promise from "bluebird";
import React from "react";
import ReactDOM from "react-dom/server";
import { IntlProvider } from "react-intl";
import "../serverIntlPolyfill";
import { graphql } from "graphql";
import nodeFetch from "node-fetch";
import nodemailer from "nodemailer";
import PrettyError from "pretty-error";
import { getDataFromTree } from "react-apollo";
import aws from "aws-sdk";
import sm from "sitemap";
import fs from "fs";
import MobileDetect from 'mobile-detect';
import jwt, { UnauthorizedError as Jwt401Error } from "express-jwt";
import createFetch from "../core/createFetch";
import createApolloClient from "../core/createApolloClient";
import configureWebsocketClient from "../core/configureWebsocketClient";
import configureStore from "./store/configureStore";
import schema from "../data/schema";
import { pubsub } from "../data/pubsub";
import config from "../config";
import { execute } from "apollo-link";
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from "./chunk-manifest.json"; // eslint-disable-line import/no-unresolved
import routes from "./router";
import redirections from './redirections';
import { Redirection } from "../data/models";
import pathToRegexp from "path-to-regexp";

// global components
import App from "./components/App";
import Html from "./components/Html";
import themes from "../themes";

// shared
import sharedReducers from "../shared/reducers"; // reducers
import getSettings from "../shared/helpers/getSettings";

import { getIntl, setLocale, setDefaultLocale, setBaseCurrency, setCurrency } from "../shared/actions/intl";
import { setRuntimeVariable } from "../shared/actions/runtime";
import { setRichMediaList } from "../shared/actions/media";
import { fetchRates } from "../shared/actions/rates";
import { me } from "../themes/lunajets/actions/auth";

import errorPageStyle from "../error/ErrorPage.css";
import { ErrorPageWithoutStyle } from "../error/ErrorPage";

import {
  SITE_DEFAULT_THEME,
  SITE_DEFAULT_HOMEPAGE,
  SITE_DEFAULT_TITLE,
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_CURRENCY_ID,
  SITE_DEFAULT_LOCALE_LANGUAGE_ID,
  SITE_DEFAULT_LOCALE,
  SITE_DEFAULT_CURRENCY,
  SITE_MAINTENANCE,
} from "../fixtures";

// generate routes urls for sitemap
import generateUrls from "../core/generateUrls";
const app = express.Router(); // express router

app.get("/sitemap.xml", async (req, res, next) => {
  try {
    const hostname = `https://www.${config.hostname}${__DEV__ ? ":" + config.port : ""}`;

    const urls = await generateUrls({
      routes,
      langs: req.locales,
      hostname,
    }, req.s3, req.bucket);

    // const urls = indexes.map(sitemap => );

    const sitemap = sm.buildSitemapIndex({
      hostname,
      urls,
    });

    res.header("Content-Type", "application/xml");
    return res.send(sitemap.toString());
  } catch (e) {
    return next(e);
  }
});

app.use(async (req, res, next) => {
  try {
    if (req.method === "GET") {
      const urls = await Redirection.findAll();
      urls && urls.length && urls.length > 0 && urls.map(url => {
        const links = url.link;
        if (links && links.length > 0){
          var keys = [];
          var result;
          var re;
          for (var i = 0; i < links.length; i++) {
            re = pathToRegexp(links[i],keys);
            result = re.exec(req.path);
            if (result){
              break;
            }
          }
          if (result && url.redirect){
            let listVar = {};

            keys.map(key => {
              if (key.name && key.name.includes("var")){
                const arr = key.name.split("var");
                listVar[key.name] = result[arr[1]];
              }
            });
            var toPath = pathToRegexp.compile(url.redirect);
            return res.redirect(url.http_code || 301, toPath(listVar));
          }
        }
      })
    }
    next();
  } catch (e) {
    return next(e);
  }
});

//app.use(redirections);

app.use(
  jwt({
    secret: config.secret_token,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token,
  }),
);
// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
});
// entry point
app.get("/:locale([a-z]{2})?/*", async (req, res, next) => {
  try {
    const site_settings = [
      SITE_DEFAULT_THEME,
      SITE_DEFAULT_HOMEPAGE,
      SITE_DEFAULT_TITLE,
      SITE_DEFAULT_DESCRIPTION,
      SITE_DEFAULT_CURRENCY_ID,
      SITE_DEFAULT_LOCALE,
      SITE_DEFAULT_CURRENCY,
      SITE_MAINTENANCE,
    ];
    const settings = await getSettings(site_settings);
    const theme = themes(settings[SITE_DEFAULT_THEME]);
    const locale = req.params.locale || settings[SITE_DEFAULT_LOCALE];
    const md = new MobileDetect(req.headers['user-agent']);
    const gclid = req.query.gclid;

    if (gclid) {
      console.log('GCLID => ', gclid);
      res.cookie('gclid', gclid, { secure: true });
    }

    // console.log("TESTE => ", req.params);
    const css = new Set();
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    const apolloClient = createApolloClient({
      schema,
      rootValue: {
        user: req.user, // current request
        transporter: req.transporter, // email transport layer
        pubsub, // pub sub layer
        s3: req.s3, // S3 instance
      },
    });

    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api,
      cookie: req.headers.cookie,
      client: apolloClient,
      graphql,
    });

    console.log(req.user);

    const initialState = {
      auth: {
        loading: false,
        errors: null,
        user: req.user,
        token: req.cookies.id_token || null,
        edit_mode: (req.user && req.user.is_admin) ? req.cookies.editMode : false,
        activate: false,
        reset_password: false,
        migrated: false,
      }, // others if needed
    };

    const store = configureStore(
      initialState,
      {
        ...sharedReducers,
        ...theme.reducers,
      },
      {
        cookie: req.headers.cookie,
        apolloClient,
        fetch,
        history: null, // should never be used on server
      },
    );

    // console.log(store);
    if (req.user) {
      store.dispatch(me()); // set user
    }
    store.dispatch(
      setRuntimeVariable({
        name: "initialNow",
        value: Date.now(),
      }),
    );
    
    store.dispatch(fetchRates());

    // dispatch to store runtime.availableLocales
    store.dispatch(
      setRuntimeVariable({
        name: "availableLocales",
        value: req.locales.locales,
      }),
    );

    // dispatch to store runtime.availableCurrencies
    store.dispatch(
      setRuntimeVariable({
        name: "availableCurrencies",
        value: req.currencies,
      }),
    );

    // dispatch default locale
    store.dispatch(setDefaultLocale({ locale: settings[SITE_DEFAULT_LOCALE] }));
    // dispatch the locale and return the intl context type
    const intl = await store.dispatch(
      setLocale({
        locale,
      }),
    );

    await store.dispatch(setRichMediaList());

    // set base currency to make price convertions
    store.dispatch(
      setBaseCurrency({
        currency: req.currencies[settings[SITE_DEFAULT_CURRENCY]].currency,
      }),
    );

    const context = {
      insertCss,
      fetch,
      pathname: req.path,
      query: req.query,
      store,
      storeSubscription: null,
      client: apolloClient,
      intl,
      isMaintenance: settings[SITE_MAINTENANCE] === "true",
      homePage: settings[SITE_DEFAULT_HOMEPAGE],
      meta: {
        title: settings[SITE_DEFAULT_TITLE],
        description: settings[SITE_DEFAULT_DESCRIPTION],
      },
      theme,
      locale,
      isMobile: (md.mobile()) || false,
    };

    const route = await routes.resolve(context);
    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    const rootComponent = <App context={context}>{route.component}</App>;
    await getDataFromTree(rootComponent);
    // this is here because of Apollo redux APOLLO_QUERY_STOP action
    await Promise.delay(0);
    data.children = await ReactDOM.renderToString(rootComponent);
    data.styles = [{ id: "css", cssText: [...css].join("") }];

    const scripts = new Set();
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset));
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk("client");
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);

    data.scripts = Array.from(scripts);

    // console.log("LOCALE ===>", locale);
    data.app = {
      hostname: config.hostname,
      path: req.path,
      graphql: config.graphql,
      ws: config.ws,
      api: `${(config.ssl) ? 'https:' : 'http:'}//www.${config.hostname}${(__DEV__) ? ':'+config.port : ''}`,
      state: context.store.getState(),
      apolloState: context.client.extract(),
      lang: intl.locale,
      theme: settings[SITE_DEFAULT_THEME],
      meta: {
        title: settings[SITE_DEFAULT_TITLE],
        description: settings[SITE_DEFAULT_DESCRIPTION],
      },
      isMaintenance: settings[SITE_MAINTENANCE] === "true",
      homePage: settings[SITE_DEFAULT_HOMEPAGE],
      currency: settings[SITE_DEFAULT_CURRENCY],
      isMobile: (md.mobile()) || false,
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200).send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage("express");

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const locale = req.language;
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: "css", cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
      app={{ lang: locale }}
    >
      {ReactDOM.renderToString(
        <ErrorPageWithoutStyle error={err} />
      )}
    </Html>,
  );
  res.status(err.status || 500).send(`<!doctype html>${html}`);
});

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept(["./router", "../core/generateUrls", "../themes"], () => {
    console.info("[HMR] updated src/client/index.js");
  });
}

export default app;
