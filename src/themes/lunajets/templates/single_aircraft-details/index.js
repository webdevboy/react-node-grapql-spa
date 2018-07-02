import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import cx from "classnames";
import s from './page.scss';
import Page from "../page";
import Heading from "themes/lunajets/components/Layout/Heading";
import Banner from "themes/lunajets/components/Content/Banner";
import Text from "themes/lunajets/components/Primitives/Text";
import Button from "themes/lunajets/components/Primitives/Button";
import Link from "themes/lunajets/components/Primitives/Link";
import SectionTitle from "themes/lunajets/components/Layout/SectionTitle";
import EmptyLegsOfAircraft from "themes/lunajets/components/Content/EmptyLegs/EmptyLegsOfAircraft";
import JetDetail from "themes/lunajets/components/Content/Fleet/JetDetail";
import JetSimilarAircraft from "themes/lunajets/components/Content/Fleet/JetSimilarAircraft";
import CallUs from "themes/lunajets/components/Footer/CallUs";
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class PageJetDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { hreflangs } = this.props;
    const jet = this.props.post;
    const state = {
      locations: [{ coordinates: "51.518250335096376,-0.13235092163085938" }],
      range: 100,
    };
    return [
      <Page template="Default" post={jet} callUs="true" hreflangs={hreflangs}>
        {/* Jet Details */}
        <JetDetail post={{ jet }} />

        {/* Similar Aircraft section */}
        <JetSimilarAircraft data={{ jet }} />

        {/* Empty Legs section */}
        <section className={cx("my-5")}>
          <div className={cx("container")}>
            <div className="row mb-5">
              <div className="col">
                <SectionTitle textId="client.aircraftDetails.EmptyLegsTitle" defaultMessage="Empty Legs" hx="true" />
              </div>
            </div>
          </div>
          <EmptyLegsOfAircraft aircraft_sfid={jet.meta.aircraft_sfid} />
          <div className={cx("container d-none d-md-block")}>
            <div className={cx("row justify-content-center my-5")}>
              <div className={cx("col-md-4")}>
                <Link
                  className={cx("btn btn-outline-primary w-100", s.button)}
                  onClick={this.handleDiscoverMore}
                  text="VIEW ALL EMPTY LEGS"
                  id="aircraft.details.callToAction.viewAllEmptyLegs"
                />
              </div>
            </div>
          </div>
        </section>
      </Page>,
    ];
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(PageJetDetails));
