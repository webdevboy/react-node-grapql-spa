import React from "react";
import Layout from "../../../components/Layout";
import Settings from "./Settings";
import _ from "lodash";
import { fetchSettings, fetchSensitiveSettings } from "../../../actions/settings";
import { fetchRates } from "../../../actions/rates";

const title = "Settings";

export default {

  name: "Settings",
  path: "/settings",

  async action({ client, store, route }) {
    
    const settings = await store.getState().settings.ids;
    const rates = await store.getState().rates;

    if (!settings.length) {
      await store.dispatch(fetchSettings());
      await store.dispatch(fetchSensitiveSettings());
    }
    if (!rates.length) await store.dispatch(fetchRates());


    return {
      title,
      component: (
        <Layout currentRoute={route}>
          <Settings currentRoute={route} />
        </Layout>
      ),
    };
  },

};
