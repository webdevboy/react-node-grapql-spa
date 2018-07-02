import { GraphQLString, GraphQLBoolean } from "graphql";

import { SITE_DEFAULT_EMAIL, SITE_SUBSCRIBE_EMAIL } from "fixtures";
import getSettings from "shared/helpers/getSettings";

export default {
  type: GraphQLBoolean,
  description: "Add subscriber",
  args: {
    email: {
      type: GraphQLString,
    },
  },
  async resolve({ transporter }, { email }) {
    const settings = await getSettings([SITE_DEFAULT_EMAIL, SITE_SUBSCRIBE_EMAIL]);
    await transporter.sendMail({
      from: settings[SITE_DEFAULT_EMAIL],
      to: settings[SITE_SUBSCRIBE_EMAIL],
      subject: "New subscriber!",
      text: email,
    });
    return {
      result: true,
    };
  },
};
