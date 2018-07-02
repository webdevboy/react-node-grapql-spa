import React from "react";
import _ from "lodash";
import PageBuilder from "../../../components/PageBuilder";
import Layout from "../../../components/Layout";

async function action({ store, params, next }) {
  if (!params.id) {
    const skip = await next();
    return skip;
  }

  const { languages, locales } = await store.getState().translations;
  const defaultLocale = store.getState().intl.locale || "en";
  const locale = _.find(locales.byId, { locale: defaultLocale });
  const language = _.find(languages.byId, { locale: locale.id });

  const langs = languages.ids.map(id => ({
    locale: locales.byId[languages.byId[id].locale],
    language_id: id,
  }));

  const options = {
    langDefaults: {
      locale: defaultLocale,
      language_id: language.id,
      locale_id: locale.id,
    },
    langs,
  };

  const props = {
    options,
    templates,
    components,
    id: params.id,
  };

  return {
    title: "Page builder",
    permission: "manage_website_pages",
    component: (<Layout><PageBuilder {...props} /></Layout>),
  };
}

export default action;
