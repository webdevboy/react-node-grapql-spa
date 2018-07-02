import React from 'react';
import Page from '../../components/Page';
import Header from 'components/Layout/Header';
import background from '../home/gfx/background.jpg';
import FixedRatioImage from "components/Primitives/FixedRatioImage";
import JetCostDestinationDescription from "components/Content/JetCost/JetCostDestinationDescription";
import EstimatedPriceQuotations from "components/Content/JetCost/EstimatedPriceQuotations";
import DestinationsList from "components/Content/Lists/DestinationsList";

async function action({ client, params, query }) {
  console.log(params, query);

  return {
    title: 'Private Jet Charter Cost to Geneva',
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

        <JetCostDestinationDescription />
        <EstimatedPriceQuotations />
        <DestinationsList />
      </Page>
    ),
  };
}

export default action;