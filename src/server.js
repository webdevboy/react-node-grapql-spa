// global
import path from "path";
import Promise from "bluebird";
import express from "express";
import subdomain from "express-subdomain";
import bearerToken from "express-bearer-token";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { createServer } from "http";
import requestLanguage from "express-request-language";
import jwt, { UnauthorizedError as Jwt401Error } from "express-jwt";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import session from "express-session";
import nodemailer from "nodemailer";
import { crunch } from "graphql-crunch";
import compression from 'compression';
import _ from "lodash";
import auth from "http-auth";
import { graphqlExpress } from "apollo-server-express";
import expressPlayground from "graphql-playground-middleware-express";
import helmet from "helmet";
import aws from "aws-sdk";
import depthLimit from "graphql-depth-limit";
import client from "./client";
import admin from "./admin";
import api from "./core/api";
import { pubsub } from "./data/pubsub";
import schema from "./data/schema";
import SmtpConfig from "./core/drivers/smtp";
import AwsConfig from "./core/drivers/aws";
import { Language, Currency } from "./data/models";
import config from "./config";
import "./serverIntlPolyfill";

// send entire app down. Process manager will restart it
process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
  process.exit(1);
});

const app = express();
//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || "all";

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, "public"), { maxAge: 3600000 }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bearerToken());
//
// CORS MIDDLEWARE
// -----------------------------------------------------------------------------
// const escapeRegExp = str => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); // eslint-disable-line no-useless-escape
// const domainRegex = new RegExp(`(([ws|wss|http|https]:\/\/)?(\.)?)?${escapeRegExp(config.hostname)}((:)?(\/)?.*)?`); // eslint-disable-line no-useless-escape

const whitelist = [
  `http://${config.hostname}`,
  `http://www.${config.hostname}`,
  `http://admin.${config.hostname}`,
  `https://${config.hostname}:${config.port}`,
  `https://www.${config.hostname}:${config.port}`,
  `https://admin.${config.hostname}:${config.port}`,
  `https://${config.hostname}`,
  `https://www.${config.hostname}`,
  `https://admin.${config.hostname}`,
  `ws://${config.hostname}`,
  `ws://www.${config.hostname}`,
  `ws://admin.${config.hostname}`,
  `wss://${config.hostname}`,
  `wss://www.${config.hostname}`,
  `wss://admin.${config.hostname}`,
  `wss://${config.hostname}:${config.port}`,
  `wss://www.${config.hostname}:${config.port}`,
  `wss://admin.${config.hostname}:${config.port}`,
  `file://`,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (__DEV__) {
      callback(null, true);
      return;
    }
    console.log ("MOBILE APP TEST: origin => ", origin);
    console.log ("MOBILE APP TEST: whitelist => ", whitelist);
    // if the origin is undefined, it means that this request comes from a same domain
    // So there is no need to do CORS check
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
    // if (__DEV__ || origin === undefined || domainRegex.test(origin)) {
    //   return callback(null, true);
    // }
    // return callback(null, false);
  },
  methods: ["HEAD", "ACCEPT", "GET", "POST", "DELETE"],
  allowedHeaders: ["Accept", "Content-Type", "Authorization", "Set-Cookie"],
  credentials: true,
  maxAge: 3600,
};
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   console.log('HEADERS ===> ',req.headers['x-forwarded-proto']);
//   next();
// })

if (__DEV__) {
  app.enable("trust proxy");
  // app.set('subdomain offset', 1); // admin.localhost
}

// config middlewares
app.use(async (req, res, next) => {
  try {
    const smtpConfig = (await SmtpConfig()) || null;
    const awsConfig = (await AwsConfig()) || null;
    const locales = await Language.findAll({
      where: { enabled: true },
    });

    const currencies = await Currency.findAll();
    req.currencies = _.keyBy(currencies, "currency");

    req.locales = {
      ids: locales.map(({ id }) => id),
      locales: _.keyBy(locales.map(locale => locale.get({ plain: true })), "locale"),
      byId: _.keyBy(locales.map(locale => locale.get({ plain: true })), "id"),
      // locales.map(locale => locale.get({plain: true})),
      codes: locales.map(({ locale }) => locale),
    };
    req.smtp = smtpConfig;
    req.transporter = nodemailer.createTransport(smtpConfig);
    req.aws = awsConfig;
    req.s3 = new aws.S3(awsConfig.keys);
    req.bucket = awsConfig.bucket;

    return next();
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//
// API ENDPOINT
// -----------------------------------------------------------------------------
app.use(["/api", "/mobile.php"], api);

//
// LOGOUT ROUTE
// -----------------------------------------------------------------------------
app.get("/logout", (req, res) => {
  res.clearCookie("id_token", { path: "/" });
  return res.redirect("/");
});

//
// Language middleware
// -----------------------------------------------------------------------------
// app.use(async (req, res, next) => requestLanguage({
//   languages: req.locales.codes,
//   cookie: {
//     name: "lang",
//     options: {
//       path: "/",
//       maxAge: 3650 * 24 * 3600 * 1000, // 10 years in miliseconds
//     },
//     url: "/lang/{language}",
//   },
// })(req, res, next));

//
// GraphQL middleware
// -----------------------------------------------------------------------------
app.use(
  "/graphql",
  jwt({
    secret: config.secret_token,
    credentialsRequired: false,
    getToken: req => {
      if (req.token) {
        return req.token;
      } else if (req.query && req.query.token) {
        return req.query.token;
      } else if (req.cookies && req.cookies.id_token) {
        return req.cookies.id_token;
      }
    },
  }),
  graphqlExpress(req => ({
    schema,
    rootValue: {
      user: req.user, // current request
      transporter: req.transporter, // email transport layer
      pubsub, // pub sub layer
      aws: req.aws, // aws config
      s3: req.s3, // S3 instance
      bucket: req.bucket,
    },
    context: {
      aws: req.aws, // aws config
      defaultLocale: 'en'
    },
    pretty: true,
    formatError: error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack,
      path: error.path,
    }),
    validationRules: [depthLimit(5)],
    // formatResponse: response => {
      // if (req.cookies.playground === "true") {
      //   return response;
      // }

      // if (response.data && !response.data.__schema) {
      //   response.data = crunch(response.data);
      // }

    //   return response;
    // },
  })),
);

//
//  HTTP AUTHENTICATION MIDDLEWARE
// -----------------------------------------------------------------------------
const basic = auth.basic({
  realm: "Restricted Access! Please login to proceed",
  skipUser: true,
},(username, password, callback) => {
  callback(username === config.http_auth_user && password === config.http_auth_password);
});

basic.on('success', (result, req) => {
	console.log(`User authenticated: ${result.user}`);
});

basic.on('fail', (result, req) => {
	console.log(`User authentication failed: ${result.user}`);
});

basic.on('error', (error, req) => {
	console.log(`Authentication error: ${error.code + " - " + error.message}`);
});


// if on development allow to user graphiql endpoint for debug purposes
app.get("/playground",
  (req, res, next) => {
    if (config.http_auth) {
      auth.connect(basic)(req, res, next);
    }
  },
  (req, res, next) => {
    res.cookie("playground", "true");
    next();
  },
  expressPlayground({
    endpoint: "/graphql",
    subscriptionsEndpoint: "/subs",
  }),
  () => {},
); // fix for headers errors, waiting for version update

//
// APP ROUTING
// -----------------------------------------------------------------------------
app.use((req,res,next) => {
  req.basic = basic;
  next();
}, subdomain("admin", admin));

app.use((req, res, next) => {
  if (config.http_auth) {
    auth.connect(basic)(req, res, next);
  }
}, subdomain("www", client));

app.use((req, res, next) => {
  if (config.http_auth) {
    auth.connect(basic)(req, res, next);
  }
}, client);
const ws = createServer(app);

//
// Ignite the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  ws.listen(config.port);
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept(["./core/api", "./admin", "./client"], a => {
    console.info("[HMR] updated src/server.js");
  });
}

export default app;
