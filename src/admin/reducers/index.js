import { combineReducers } from "redux";
import undoable from "redux-undo";
import { loadingBarReducer } from "react-redux-loading-bar";

// admin scope
import auth from "../reducers/auth";
import users from "../reducers/users";
import roles from "../reducers/userRoles";
import chat from "../reducers/chat";
import settings from "../reducers/settings";
import accounts from "../reducers/accounts";
import languages from "../reducers/languages";
import offices from "../reducers/offices";
import articles from "../reducers/articles";
// global scope
import intl from "../../shared/reducers/intl";
import rtc from "../../shared/reducers/rtc";
import destinations from "../reducers/destinations";
import cities from "../reducers/cities";
import events from "../reducers/events";
import fleet from "../reducers/fleet";
import media from "../reducers/media";
import pages from "../reducers/pages";
import posts from "../reducers/posts";
import termTaxonomy from "../reducers/termTaxonomy";
import redirections from "../reducers/redirections";
import airports from './airports';
import aircrafts from './aircrafts';
import emptyLegs from './emptyLegs';
import runtime from './runtime';
import teamMembers from './teamMembers';
import manufacturers from './manufacturers';
import categories from './categories';
import rates from './rates';

import { PageBuilderReducer } from "../components/PageBuilder";

export default function createRootReducer() {
  return combineReducers({
    // admin
    auth,
    users,
    roles,
    chat,
    settings,
    accounts,
    languages,
    offices,
    articles,
    destinations,
    cities,
    events,
    fleet,
    airports,
    media,
    pages,
    posts,
    termTaxonomy,
    redirections,
    runtime,
    aircrafts,
    emptyLegs,
    teamMembers,
	  manufacturers,
    categories,
    rates,

    // page builder
    pageBuilder: PageBuilderReducer,
    loadingBar: loadingBarReducer,
    // shared
    intl,
    rtc,
  });
}
