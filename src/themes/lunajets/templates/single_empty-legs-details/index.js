import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import EmptyLegsDetailBanner from "themes/lunajets/components/Content/EmptyLegs/EmptyLegsDetailBanner";
import EmptyLegsDetailSlides from "themes/lunajets/components/Content/EmptyLegs/EmptyLegsDetailSlides";
import EmptyLegsDescription from "themes/lunajets/components/Content/EmptyLegs/EmptyLegsDescription";
import EmptyLegsSearchLocation from "themes/lunajets/components/Content/EmptyLegs/EmptyLegsSearchLocation";
import Page from "../page";

export class SingleEmptyLegsDetails extends Component {
  render() {
    const { hreflangs, emptyLeg } = this.props;

    const similarEmptyLegHeading = {
      subtitle: {
        defaultMessage: "Empty Legs",
        id: "client.banner.subtitle.",
        color: "lt-blue",
      },
      paragraph: {
        defaultMessage: "SIMILAR EMPTY LEGS",
        id: "client.similar.empty.legs",
      },
    };

    return (
      <Page hreflangs={hreflangs} callUs="true">
        <EmptyLegsDetailBanner emptyLeg={emptyLeg} />
        <EmptyLegsDetailSlides emptyLeg={emptyLeg} />
        <EmptyLegsSearchLocation
          fromAirportId={emptyLeg.from_airport.sfid}
          toAirportId={emptyLeg.to_airport.sfid}
          id={emptyLeg.id}
          heading={similarEmptyLegHeading}/>
      </Page>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SingleEmptyLegsDetails);
