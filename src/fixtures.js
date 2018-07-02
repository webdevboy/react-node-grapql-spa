import { themes } from "./themes";

export const LANGUAGE_CACHE_KEY = "SITE_LANGUAGES";
export const SETTINGS_CACHE_KEY = "GLOBAL_SETTINGS";
export const POSTS_CACHE_KEY = "SITE_POSTS";
export const ARTICLES_CACHE_KEY = "SITE_ARTICLES";
export const EVENTS_CACHE_KEY = "SITE_EVENTS";
export const DESTINATIONS_CACHE_KEY = "SITE_DESTINATIONS";
export const AIRCRAFTS_CACHE_KEY = "SITE_AIRCRAFTS";
export const PARTNERS_CACHE_KEY = "SITE_PARTNERS";
export const TEAM_MEMBERS_CACHE_KEY = "SITE_TEAM_MEMBERS";
export const PAGES_CACHE_KEY = "SITE_PAGES";

export const EMPTY_LEGS_CACHE_KEY = "SITE_EMPTY_LEGS";
export const SF_AIRCRAFTS_CACHE_KEY = "SITE_SF_AIRCRAFTS";

export const SALESFORCE_TOKEN = "salesforce_token";
export const SALESFORCE_LOGIN_URL = "salesforce_login_url";
export const SALESFORCE_USER = "salesforce_user";
export const SALESFORCE_PASSWORD = "salesforce_password";

export const SITE_DEFAULT_THEME = "site_default_theme";
export const SITE_DEFAULT_HOMEPAGE = "site_default_homepage";
export const SITE_DEFAULT_TITLE = "site_default_title";
export const SITE_DEFAULT_DESCRIPTION = "site_default_description";
export const SITE_DEFAULT_CURRENCY_ID = "site_default_currency_id";
export const SITE_DEFAULT_LOCALE_LANGUAGE_ID = "site_default_locale_language_id";
export const SITE_DEFAULT_LOCALE = "site_default_locale";
export const SITE_DEFAULT_CURRENCY = "site_default_currency";
export const SITE_DEFAULT_EMAIL = "site_default_email";
export const SITE_ADMIN_EMAIL = "site_admin_email";
export const SITE_SUBSCRIBE_EMAIL = "site_subscribe_email";
export const SITE_MAINTENANCE = "site_maintenance";

export const AWS_REGION = "aws_region";
export const AWS_BUCKET = "aws_bucket";
export const AWS_ACCESS_PKEY = "aws_access_pkey";
export const AWS_ACCESS_KEY = "aws_access_key";
export const AWS_CLOUDFRONT_URL = "aws_cloudfront_url";

export const MAIL_SMTP_PASSWORD = "mail_smtp_password";
export const MAIL_SMTP_OPTIONS = "mail_smtp_options";
export const MAIL_SMTP_PORT = "mail_smtp_port";
export const MAIL_SMTP_SECURE = "mail_smtp_secure";
export const MAIL_SMTP_HOSTNAME = "mail_smtp_hostname";
export const MAIL_SMTP_USER = "mail_smtp_user";

export const SOCIAL_MEDIA_FACEBOOK = "social_media_facebook";
export const SOCIAL_MEDIA_TWITTER = "social_media_twitter";
export const SOCIAL_MEDIA_LINKEDIN = "social_media_linkedin";
export const SOCIAL_MEDIA_INSTAGRAM = "social_media_instagram";
export const SOCIAL_MEDIA_YOUTUBE = "social_media_youtube";

export const SETTINGS = {
  site: {
    [SITE_DEFAULT_THEME]: {
      label: "Default Theme",
      type: "select",
      values: Object.keys(themes),
      order: 3,
    },
    [SITE_DEFAULT_HOMEPAGE]: {
      label: "Website Home Page",
      disabled: true,
      order: 6,
    },
    [SITE_DEFAULT_TITLE]: {
      label: "Website Default Title",
      order: 1,
    },
    [SITE_DEFAULT_DESCRIPTION]: {
      label: "Website Default Meta Description",
      order: 2,
    },
    [SITE_DEFAULT_LOCALE]: {
      label: "Default Locale",
      type: "select",
      state: "runtime.availableLocales",
      objectKeys: {
        label: "language",
        value: "locale",
      },
      order: 4,
    },
    [SITE_DEFAULT_CURRENCY]: {
      label: "Default Currency",
      type: "select",
      state: "runtime.availableCurrencies",
      objectKeys: {
        label: "currency",
        value: "currency",
      },
      order: 5,
    },
    [SITE_DEFAULT_EMAIL]: {
      label: "Default Email",
      order: 7,
    },
    [SITE_ADMIN_EMAIL]: {
      label: "Admin Email",
      order: 8,
    },
    [SITE_SUBSCRIBE_EMAIL]: {
      label: "Subscribe Email",
      default: "marketing@lunajets.com",
      order: 9,
    },
  },
  aws: {
    [AWS_BUCKET]: {
      label: "AWS Bucket",
    },
    [AWS_REGION]: {
      label: "AWS Region",
    },
    [AWS_ACCESS_KEY]: {
      label: "AWS Access Key",
      hidden: true,
    },
    [AWS_ACCESS_PKEY]: {
      label: "AWS Access Private Key",
      hidden: true,
    },
    [AWS_CLOUDFRONT_URL]: {
      label: "CloudFront URL",
    },
  },
  smtp: {
    [MAIL_SMTP_PASSWORD]: {
      label: "SMTP Password",
      hidden: true,
      order: 3,
    },
    // [MAIL_SMTP_OPTIONS]: {
    //   label: 'SMTP Options',
    //   order: 5,
    // },
    [MAIL_SMTP_PORT]: {
      label: "SMTP Port",
      order: 1,
    },
    [MAIL_SMTP_SECURE]: {
      label: "SMTP SSL",
      order: 4,
      type: "switch",
    },
    [MAIL_SMTP_HOSTNAME]: {
      label: "SMTP Hostname",
      hidden: true,
      order: 0,
    },
    [MAIL_SMTP_USER]: {
      label: "SMTP Username",
      hidden: true,
      order: 2,
    },
  },
  social: {
    [SOCIAL_MEDIA_FACEBOOK]: {
      label: "Facebook",
    },
    [SOCIAL_MEDIA_TWITTER]: {
      label: "Twitter",
    },
    [SOCIAL_MEDIA_LINKEDIN]: {
      label: "Linked In",
    },
    [SOCIAL_MEDIA_INSTAGRAM]: {
      label: "Instagram",
    },
    [SOCIAL_MEDIA_YOUTUBE]: {
      label: "Youtube",
    },
  },
};
