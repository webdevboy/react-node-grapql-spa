/* eslint-disable */
import {
  MAIL_SMTP_PASSWORD,
  MAIL_SMTP_OPTIONS,
  MAIL_SMTP_PORT,
  MAIL_SMTP_SECURE,
  MAIL_SMTP_HOSTNAME,
  MAIL_SMTP_USER,
} from "../../fixtures";
import getSettings from "../../shared/helpers/getSettings";
import { decrypt } from "../crypto-helper";

export default async () => {
  try {
    const _settings = await getSettings([
      MAIL_SMTP_PASSWORD,
      MAIL_SMTP_OPTIONS,
      MAIL_SMTP_PORT,
      MAIL_SMTP_SECURE,
      MAIL_SMTP_HOSTNAME,
      MAIL_SMTP_USER,
    ]);

    return {
      host: decrypt(_settings[MAIL_SMTP_HOSTNAME]),
      port: _settings[MAIL_SMTP_PORT],
      secure: (_settings[MAIL_SMTP_SECURE] === 'true'),
      auth: {
        user: decrypt(_settings[MAIL_SMTP_USER]),
        pass: decrypt(_settings[MAIL_SMTP_PASSWORD]),
      },
      ...JSON.parse(_settings[MAIL_SMTP_OPTIONS]),
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};
