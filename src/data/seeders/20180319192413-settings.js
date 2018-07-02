import AES from "crypto-js/aes";
import { Settings, Language, Currency } from "../models";
import { secret_token } from "../../config";

export default {
  up: async () => {
    const encrypt = s => {
      const cypher = AES.encrypt(s, secret_token);
      return cypher.toString();
    }

    const eur = await Currency.findOne({ where: { currency: "EUR" } });
    const en = await Language.findOne({ where: { locale: "en", enabled: true } });

    await Settings.bulkCreate([
      /**
       * DEFAULTS
       */
      {
        option: "site_default_title",
        value: "Lunajets Private Jet Charter",
      },
      {
        option: "site_default_description",
        value: "private aviation",
      },
      {
        option: "site_default_email",
        value: "no-reply@lunajets.com",
      },
      {
        option: "site_default_homepage",
        value: "home",
      },
      {
        option: "site_default_theme",
        value: "lunajets",
      },
      {
        option: "site_default_locale",
        value: en.locale,
      },
      {
        option: "site_default_currency",
        value: "EUR",
      },
      {
        option: "site_default_currency_id",
        value: eur.id,
      },
      {
        option: "site_default_locale_language_id",
        value: en.id,
      },
      {
        option: "site_maintenance",
        value: "false",
      },
      {
        option: "site_admin_email",
        value: "jose@lunajets.com",
      },
      {
        option: "site_subscribe_email",
        value: "marketing@lunajets.com",
      },
      /**
       * SMTP
       */
      {
        option: "mail_smtp_hostname",
        value: encrypt("mail.upgrade.group"),
      },
      {
        option: 'mail_smtp_port',
        value: '465',
      },
      {
        option: 'mail_smtp_secure',
        value: 'true',
      },
      {
        option: "mail_smtp_user",
        value: encrypt("ricardo.moura@upgrade.group"),
      },
      {
        option: "mail_smtp_password",
        value: encrypt("Moura020192"),
      },
      {
        option: "mail_smtp_options",
        value: JSON.stringify({
          tls: {
            rejectUnauthorized: false,
          },
        }),
      },

      /**
       * SOCIAL SETTINGS
       */
      {
        option: "social_media_facebook",
        value: "https://www.facebook.com/lunajets",
      },
      {
        option: "social_media_twitter",
        value: "https://twitter.com/lunajets",
      },
      {
        option: "social_media_instagram",
        value: "https://www.instagram.com/lunajets/",
      },
      {
        option: "social_media_youtube",
        value: "https://www.youtube.com/user/lunajets",
      },
      {
        option: "social_media_linkedin",
        value: "https://www.linkedin.com/company/lunajets-s-a-",
      },

      /**
       * AWS
       */
      {
        option: "aws_bucket",
        value: "lnjt-staging",
      },
      {
        option: "aws_cloudfront_url",
        value: "d2senxzasulqn5.cloudfront.net",
      },
      {
        option: "aws_region",
        value: "eu-west-1",
      },
      {
        option: 'aws_access_key',
        value: encrypt('AKIAJEIH3LA6MCLG5YGQ'),
      },
      {
        option: 'aws_access_pkey',
        value: encrypt('ZG3h7m8fxFYmb6oWo1URCaYGQZaJMJpp9FN+NLxP'),
      },
    ]);


  },
  down: async () => {
    await Settings.truncate();
  },
};
