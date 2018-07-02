import express from "express";
import Promise from "bluebird";
import React from "react";
import ReactDOM from "react-dom/server";
import nodeFetch from "node-fetch";
import nodemailer from "nodemailer";
import PrettyError from "pretty-error";
import { getDataFromTree } from "react-apollo";
import aws from "aws-sdk";
import { IntlProvider } from "react-intl";
import jwt, { UnauthorizedError as Jwt401Error } from "express-jwt";
import { graphql } from "graphql";
import uppy from 'uppy-server';
import createFetch from "../core/createFetch";
import createApolloClient from "../core/createApolloClient";
import configureStore from "./store/configureStore";
import schema from "../data/schema";
import { pubsub } from "../data/pubsub";
import config from "../config";
import { themesList as themes } from '../themes';
import auth from "http-auth";

// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from "./chunk-manifest.json"; // eslint-disable-line import/no-unresolved
import routes from "./router";

// global components
import App from "./components/App";
import Html from "./components/Html";

// redux actions
import getSettings from "../shared/helpers/getSettings";
import { SITE_DEFAULT_LOCALE } from "../fixtures";
import { setRuntimeVariable } from "./actions/runtime";

import errorPageStyle from "../error/ErrorPage.css";
import { ErrorPageWithoutStyle } from "../error/ErrorPage";

const app = express.Router(); // express router

//
// Authentication using JWT tokens (we dont use sessions)
// -----------------------------------------------------------------------------
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

// Uppy Upload
app.use((req, res, next) => {
  const hostname = (__DEV__) ? `admin.${config.hostname}:${config.port}` : `admin.${config.hostname}`;
  return uppy.app({
    providerOptions: {
      s3: {
        getKey: (req, filename) => filename,
        key: req.aws.keys.accessKeyId,
        secret: req.aws.keys.secretAccessKey,
        bucket: req.aws.bucket,
        region: req.aws.keys.region,
      },
    },
    server: {
      host: hostname,
      protocol: config.ssl ? 'https' : 'http',
    },
    redisUrl: config.redis,
    filePath: "/tmp",
    debug: (__DEV__),
    secret: config.secret_token,
  })(req, res, next);
});
app.use((req, res, next) => {
  if (config.http_auth) {
    auth.connect(req.basic)(req, res, next);
  }
});
// entry point
app.get("*", async (req, res, next) => {
  try {
    const site_settings = [SITE_DEFAULT_LOCALE];
    const settings = await getSettings(site_settings);
    const locale = settings[SITE_DEFAULT_LOCALE];
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
	      bucket: req.bucket, //bucket of aws
      },
    });

    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api,
      cookie: req.headers.cookie,
      client: apolloClient,
      graphql,
    });

    const initialState = {
      auth: {
        user: req.user || null,
        token: req.cookies.id_token || null,
      }, // others if needed
    };

    const store = configureStore(initialState, {
      cookie: req.headers.cookie,
      apolloClient,
      fetch,
      history: null,
    });

    store.dispatch(
      setRuntimeVariable({
        initialNow: Date.now(),
        availableLocales: req.locales.locales,
        defaultLocale: locale,
        availableCurrencies: req.currencies,
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
      locale,
      themes,
    };

    const route = await routes.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>);
    data.styles = [{ id: "css", cssText: [...css].join("") }];

    const scripts = new Set();
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset));
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk("admin");
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);

    data.scripts = Array.from(scripts);

    data.app = {
      hostname: config.hostname,
      port: config.port,
      path: req.path,
      graphql: config.graphql,
      ws: config.ws,
      api: config.api,
      state: context.store.getState(),
      lang: locale,
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
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
  // const locale = req.language;
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: "css", cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept("./router", () => {
    console.info("[HMR] updated src/admin/index.js");
  });
}

export default app;
