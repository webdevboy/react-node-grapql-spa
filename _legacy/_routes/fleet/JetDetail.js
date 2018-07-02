import React from "react";
import cx from "classnames";
import Page from "client/components/Page";
import Heading from "components/Layout/Heading";
import Banner from "components/Content/Banner";
import Text from "components/Primitives/Text";
import Button from "components/Primitives/Button";
import FixedRatioImage from "components/Primitives/FixedRatioImage";
import SectionTitle from "components/Layout/SectionTitle";
import EmptyLegsSearch from "components/Content/EmptyLegs/EmptyLegsSearch";
import JetDetailCarrousel from "components/Content/Fleet/JetDetailCarrousel";
import JetDetailCabin from "components/Content/Fleet/JetDetailCabin";
import JetDetailMap from "components/Content/Fleet/JetDetailMap";
import { Aircrafts } from "components/Content/Fleet/JetSimilarAircraft";
import CallUs from "components/Footer/CallUs";

async function action({ params, query }) {
  console.log(params, query); // eslint-disable-line no-console
  const state = {
    locations: [{ coordinates: "51.518250335096376,-0.13235092163085938" }],
    range: 100,
  };
  return {
    title: "Jet Detail",
    component: (
      <Page template="Default" footer={<CallUs />}>
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
        <div className={cx("container my-5")}>
          <div className="row">
            <div className="col">
              <SectionTitle textId="Long Range Jets" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Heading textId="Bombardier Challenger 604" />
            </div>
          </div>
        </div>
        <JetDetailCarrousel />
        <JetDetailCabin />
        <JetDetailMap />

        {/* Empty Legs section */}
        <section className={cx("my-5")}>
          <div className={cx("container")}>
            <div className="row mb-5">
              <div className="col">
                <SectionTitle textId="Empty Legs" />
              </div>
            </div>
          </div>

          <EmptyLegsSearch />

          <div className={cx("container d-none d-md-block")}>
            <div className={cx("row justify-content-center my-5")}>
              <div className={cx("col-md-4")}>
                <Button
                  className="btn-outline-primary w-100"
                  textId="VIEW ALL EMPTY LEGS"
                  // textId="client.callToAction.viewAllEmptyLegs"
                  onClick={this.handleDiscoverMore}
                />
              </div>
            </div>
          </div>
        </section>

        {/* similar aircraft */}
        <Aircrafts />
      </Page>
    ),
  };
}

export default action;
