/* eslint-disable max-len */
require('dotenv').config({ path: '.env' });

if (process.env.BROWSER) {
  throw new Error("Do not import `config.js` from inside the client-side code.");
}

module.exports = {

  // lunajets custom
  salesforce: {
    url: process.env.SF_LOGIN_URL,
    user: process.env.SF_USER,
    password: process.env.SF_PASSWORD,
    token: process.env.SF_TOKEN,
  },

  // cms stuff
  site_default_theme: "lunajets",
  site_default_title: "LunaJets",
  site_default_description: "Private jet charter",
  site_default_locale: "en",
  site_default_currency: "EUR",
  site_default_email: "Lunajets <no-reply@lunajets.com>",
  jwt_max_age: 180,
  jwt_expires: 60 * 60 * 24 * 180,

  // app
  port: process.env.PORT || 3000,
  hostname: process.env.HOSTNAME || 'localhost',
  // security
  ssl: (process.env.SSL_ENABLED === 'true'),
  secret_token: process.env.APP_SECRET || 'SECRET',
  // http auth
  http_auth: (process.env.HTTP_AUTH_ENABLED === 'true') || false,
  http_auth_user: process.env.HTTP_USER || 'luna',
  http_auth_password: process.env.HTTP_PASSWORD || 'luna',

  // redis configuration
  redis: process.env.REDIS_URL,

  // database
  db: {
    development: {
      username: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
      database: process.env.DEV_DB,
      host: process.env.DEV_DB_HOST,
      port: process.env.DEV_DB_PORT,
      dialect: "postgres",
      ssl: (process.env.DEV_DB_SSL === 'true') || false,
      pool: {
        max: process.env.DEV_DB_DYNOS || 1,
        maxConn: process.env.DEV_DB_INSTANCES || 1,
      },
      dialectOptions: {
        ssl: (process.env.DEV_DB_DIALECT_SSL === 'true') || false
      },
    },
    production: {
      username: "swtomxqjiizgxb",
      password: "db197c109dc02238e54b386a962ccbb2ef0cc3bb25342f354d1c34e67396b410",
      database: "d62m3i098ep0rk",
      host: "ec2-46-51-187-253.eu-west-1.compute.amazonaws.com",
      port: "5432",
      dialect: "postgres",
      ssl: true,
      dialectOptions: {
        ssl: true,
      },
      pool: {
        max: process.env.SERVER_DYNOS || 1,
        maxConn: process.env.MAX_DB_INSTANCES || 1,
      },
    },

  },
};