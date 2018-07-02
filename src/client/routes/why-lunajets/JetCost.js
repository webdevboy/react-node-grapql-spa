import React from "react";
import Page from "../../components/Page";
import Header from "components/Layout/Header";
import background from "../home/gfx/background.jpg";
import FixedRatioImage from "components/Primitives/FixedRatioImage";
import JetCostDescription from "components/Content/JetCost/JetCostDescription";
import EstimatedPriceQuotations from "components/Content/JetCost/EstimatedPriceQuotations";
import JetCostMap from "components/Content/JetCost/JetCostMap";
import JetCostCompare from "components/Content/JetCost/JetCostCompare";

async function action({ client, params, query }) {

  return {
    title: "Private Jet Charter Cost to Geneva",
    component: (
      <Page template="Default">
        {/* Desktop banner */}
        <FixedRatioImage
          className="d-none d-md-block"
          ratio={0.3}
          image={{ src: "https://s3-eu-west-1.amazonaws.com/upgrade-it-lab/AIRCR.png" }}
        />
        {/* Mobile banner */}
        <FixedRatioImage
          className="d-md-none"
          ratio={0.8}
          image={{ src: "https://s3-eu-west-1.amazonaws.com/upgrade-it-lab/AIRCR.png" }}
        />

        <JetCostDescription />
        <EstimatedPriceQuotations />
        <JetCostMap />
        <JetCostCompare />
      </Page>
    ),
  };
}

export default action;
