import 'whatwg-fetch';
import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';
import queryString from 'query-string';
import { createPath } from 'history/PathUtils';
import { addLocaleData } from 'react-intl'
import initReactFastclick from 'react-fastclick';
import App from './components/App';
import router from './router';
import sharedReducers from '../shared/reducers';
import createFetch from '../core/createFetch';
import configureStore from './store/configureStore';
import { updateMeta, updateTitle, updateHreflang, clearHreflangs } from '../DOMUtils';
import history from 'core/history';
import createApolloClient from '../core/createApolloClient';
import configureWebsocketClient from '../core/configureWebsocketClient';
import { getIntl } from '../shared/actions/intl';
import Cookies from 'js-cookie';
import _ from 'lodash';
import MobileDetect from 'mobile-detect';
import { setRichMediaList } from "../shared/actions/media";
/* @intl-code-template import ${lang} from 'react-intl/locale-data/${lang}'; */
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import de from "react-intl/locale-data/de";
/* @intl-code-template-end */
import themes from '../themes';

/* @intl-code-template addLocaleData(${lang}); */
addLocaleData(en);
addLocaleData(fr);
addLocaleData(de);
/* @intl-code-template-end */

// Universal HTTP client
const fetch = createFetch(window.fetch, {
  baseUrl: window.App.api,
});

const md = new MobileDetect(window.navigator.userAgent);

const apolloClient = createApolloClient();
const theme = themes(window.App.theme);
// Initialize a new Redux store
// http://redux.js.org/docs/basics/UsageWithReact.html
const store = configureStore(
  window.App.state, // ini tial state
  {
    ...sharedReducers,
    ...theme.reducers, // root reducer from theme
  },
  // options
  {
    apolloClient,
    fetch,
    history,
  },
);


// Global (context) variables that can be easily accessed from any React component
// https://facebook.github.io/react/docs/context.html
const context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => { removeCss.forEach(f => f()); };
  },
  // For react-apollo
  client: apolloClient,
  store,
  storeSubscription: null,
  fetch,
  intl: store.dispatch(getIntl()),
  theme,
  meta: window.App.meta,
  isMaintenance: window.App.isMaintenance,
  homePage: window.App.homePage,
  hostname: window.App.hostname,
  isMobile: (md.mobile()) || false,
};

const isMobile = () => (window.innerWidth < 992);
const toggleBodyMobileClass = () => {
  window.isMobile = isMobile();
  const event = new CustomEvent("toggle-mobile", { "detail": isMobile() });
  const body = document.getElementsByTagName("body")[0];
  body.classList.toggle("mobile", isMobile());
  body.dispatchEvent(event);
};
window.addEventListener("resize", () => toggleBodyMobileClass());

// Make taps on links and buttons work fast on mobiles
// FastClick.attach(document.body);
// we've replaced for react fast-click, wasnt working with react-select
initReactFastclick();
toggleBodyMobileClass();

// fix for chrome on android
// issue: https://stackoverflow.com/questions/32963400/android-keyboard-shrinking-the-viewport-and-elements-using-unit-vh-in-css#40313008
// let viewheight = $(window).height();
// let viewwidth = $(window).width();
// let viewport = document.querySelector("meta[name=viewport]");
// viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");

const dataLayer = window.dataLayer || [];
const container = document.getElementById("app");
let appInstance;
let currentLocation = history.location;

// Switch off the native scroll restoration behavior and handle it manually
// https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
const scrollPositionsHistory = {};
const updateMetas = (route) => {
  updateTitle(route.meta.title);
  updateMeta("description", route.meta.description);
  if (route.meta && route.meta.author) {
    updateMeta("author", route.meta.author);
  }
  if (route.meta && route.meta.keywords) {
    updateMeta("keywords", route.meta.keywords);
  }
  clearHreflangs();
  if (route.hreflangs && route.hreflangs.length) {
    route.hreflangs.forEach(({ locale, path }) => {
      updateHreflang(locale, path)
    });
  }
}
// Re-render the app when window.location changes
async function onLocationChange(location, action) {

  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  };
  // Delete stored scroll position for next page if any
  if (action === "PUSH") {
    delete scrollPositionsHistory[location.key];
  }
  currentLocation = location;
  context.intl = await store.dispatch(getIntl());
  await store.dispatch(setRichMediaList());

  const isInitialRender = !action;
  try {
    context.pathname = location.pathname;
    context.query = queryString.parse(location.search);
    context.locale = store.getState().intl.locale;

    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const route = await router.resolve(context);

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return;
    }

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }

    const renderReactApp = isInitialRender ? ReactDOM.hydrate : ReactDOM.render;
    appInstance = renderReactApp(<App context={context}>{route.component}</App>, container, () => {
      if (isInitialRender) {
        // Switch off the native scroll restoration behavior and handle it manually
        // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
        if (window.history && "scrollRestoration" in window.history) {
          window.history.scrollRestoration = "manual";
        }

        updateMetas(route);
        
        const elem = document.getElementById("css");
        if (elem) elem.parentNode.removeChild(elem);
        return;
      }

      updateMetas(route);

      // updateCustomMeta('og:url', route.canonicalUrl);
      // updateCustomMeta('og:image', route.imageUrl);
      // updateLink('canonical', route.canonicalUrl);

      let scrollX = 0;
      let scrollY = 0;
      const pos = scrollPositionsHistory[location.key];
      if (pos) {
        scrollX = pos.scrollX;
        scrollY = pos.scrollY;
      } else {
        const targetHash = location.hash.substr(1);
        if (targetHash) {
          const target = document.getElementById(targetHash);
          if (target) {
            scrollY = window.pageYOffset + target.getBoundingClientRect().top;
          }
        }
      }

      // Restore the scroll position if it was saved into the state
      // or scroll to the given #hash anchor
      // or scroll to top of the page
      window.scrollTo(scrollX, scrollY);

      // Google Analytics tracking. Don't send 'pageview' event after
      // the initial rendering, as it was already sent
 
      dataLayer.push({
        event: 'location:change',
        attributes: {
          route: history.location,
        }
      });

    });
  } catch (error) {
    if (__DEV__) {
      throw error;
    }

    console.error(error);

    // Do a full page reload if error occurs during client-side navigation
    if (!isInitialRender && currentLocation.key === location.key) {
      console.error("RSK will reload your page after error");
      window.location.reload();
    }
  }
}

let isHistoryObserved = false;
export default function main() {
  // Handle client-side navigation by using HTML5 History API
  // For more information visit https://github.com/mjackson/history#readme
  currentLocation = history.location;
  if (!isHistoryObserved) {
    isHistoryObserved = true;
    history.listen(onLocationChange);
  }
  onLocationChange(currentLocation);
}

// globally accesible entry point
window.RSK_ENTRY = main;

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept(["./router", "../themes"], () => {
    if (appInstance && appInstance.updater.isMounted(appInstance)) {
      // Force-update the whole tree, including components that refuse to update
      deepForceUpdate(appInstance);
    }

    onLocationChange(currentLocation);
  });
}
