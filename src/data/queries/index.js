import auth from "./auth";
import users from "./users";
import aircrafts from "./aircrafts";
import airports from "./airports";
// import heroshotphoto from "./heroshotphoto";
import settings from "./settings";
import languages from "./languages";
import chat from "./chat";
// import pages from "./pages";
// import offices from "./offices";
import media from "./media";
// import team from './team';
import roles from "./roles";
import translations from "./translations";
import articles from "./articles";
import redirections from "./redirections";
import permissions from "./permissions";
// import customers from './customers';
// import events from './events';
import cities from './cities';
import sf_account from "./sf_account";
import sf_airportcity from './sf_airportcity';
import sf_airport from "./sf_airport";
import sf_fleetaircraft from "./sf_fleetaircraft";
// import destinations from './destinations';
import rates from "./rates";
import currencies from "./currency";
import emptyleg from "./emptyleg";
import stringtranslation from "./stringtranslation";
import richtexttranslation from "./richtexttranslation";
import aws from "./aws";
// import sitemap from './sitemap';
import posts from "./posts";
import countries from "./countries";
import homepage from "./homepage";
import evergreen from "./evergreen";
import emailtemplate from "./emailtemplate";

export default {
  ...auth,
  ...users,
  ...aircrafts,
  ...airports,
  ...sf_fleetaircraft,
  // ...heroshotphoto,
  ...settings,
  ...languages,
  ...chat,
  // ...pages,
  // ...offices,
  ...media,
  // ...team,
  ...roles,
  ...translations,
  ...redirections,
  ...articles,
  ...permissions,
  // ...customers,
  // ...events,
  ...cities,
  ...sf_account,
  ...sf_airportcity,
  ...sf_airport,
  // ...destinations,
  ...rates,
  ...currencies,
  ...emptyleg,
  ...stringtranslation,
  ...richtexttranslation,
  ...aws,
  // ...sitemap,
  ...posts,
  ...countries,
  ...homepage,
  ...evergreen,
  ...emailtemplate,
};
