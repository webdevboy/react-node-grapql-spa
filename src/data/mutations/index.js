import users from "./users";
import roles from "./roles";
// import offices from './offices';
// import team from './team';
import translations from "./translations";
// import articles from './articles';
import emptylegs from "./emptylegs";
import posts from "./posts";
// import destinations from './destinations';
import media from "./media";
import urlManager from "./urlManager";
import settings from "./settings";
import customers from './customers';
import requestFlight from "./requestFlight";
import termTaxonomy from "./termTaxonomy";
import mail from "./mail";
import emailTemplate from "./emailTemplate";
import currency from './currency';
import newsletter from './newsletter';

export default {
  ...users,
  ...roles,
  ...newsletter,
  // ...offices,
  // ...team,
  ...translations,
  // ...articles,
  ...emptylegs,
  ...posts,
  ...currency,
  ...media,
  ...urlManager,
  ...settings,
  ...customers,
  ...requestFlight,
  ...termTaxonomy,
  ...mail,
  ...emailTemplate,
};
