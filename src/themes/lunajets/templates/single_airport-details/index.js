import React, { Component } from "react";
import PropTypes from 'prop-types';
// import { connect } from "react-redux";
import { Query } from 'react-apollo';
import gql from "graphql-tag";

import Page from '../page';
import AirportHeader from "themes/lunajets/components/Content/Detail/Airport/AirportHeader";
import AirportDescription from "../../components/Content/Detail/Airport/AirportDescription";
import EmptyLegsResult from "themes/lunajets/components/Content/EmptyLegs/EmptyLegsResult";
import EmptyLegsDescription from "themes/lunajets/components/Content/EmptyLegs/EmptyLegsDescription";
import AirportContact from "themes/lunajets/components/Content/Detail/Airport/AirportContact";
import background from "./gfx/map.png";
import GET_AIRPORT_DETAILS from '../../queries/getAirportDetails.gql';

class AirportDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      post: {
        article, media, body, title,
      },
      hreflangs,
      data: { airport, emptyLegsFrom, emptyLegsTo },
    } = this.props;

    console.log(airport);

    return (
      <Page post={this.props.post} hreflangs={hreflangs} subscriptor={false}>
        <AirportHeader airport={airport} alt={`Map around the ${airport.name} airport-${title.toUpperCase()}`} />
        <AirportDescription
          airport={airport}
          title={title}
          name={airport.name}
          cityName={airport.city.name}
          countryCode={airport.city.country.countryCode}
          iata={airport.iata}
          icao={airport.icao}
          description={body}
        />
        <EmptyLegsDescription
          title={`${airport.name}`}
          defaultPrefix = "From "
          prefixId = "client.airportDetails.emptylegsDescription.from.prefix"
          defaultSuffix = " Airport"
          suffixId = "client.airportDetails.emptylegsDescription.from.suffix"
          sectionTitle={`Empty Legs`}
          sectionTitleId= "client.airportDetails.emptylegsFromToAirport.sectionTitle"
        />
        <EmptyLegsResult
          pagination={false}
          itemsPerPage={3}
          data={emptyLegsFrom}
        />
        <EmptyLegsDescription
          title={`${airport.name}`}
          defaultPrefix = "To "
          prefixId = "client.airportDetails.emptylegsDescription.to.prefix"
          defaultSuffix = " Airport"
          suffixId = "client.airportDetails.emptylegsDescription.to.suffix"
          sectionTitle={false}
        />
        <EmptyLegsResult
          pagination={false}
          itemsPerPage={3}
          data={emptyLegsTo}
        />
        <AirportContact />
      </Page>
    );
  }
}

AirportDetails.propTypes = {
  post: PropTypes.object,
  hreflangs: PropTypes.array,
  data: PropTypes.object,
};

AirportDetails.defaultProps = {
  post: {},
  hreflangs: [],
  data: {},
};

const PageAirportDetails = ({ post, hreflangs }) =>
  (<Query query={GET_AIRPORT_DETAILS} variables={{ sfid: post && post.meta.airport_sfid }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      return <AirportDetails {...{ post, hreflangs, data }} />;
    }}
   </Query>);

// const mapStateToProps = (state) => ({
// })

// const mapDispatchToProps = {
// }
// export default connect(mapStateToProps, mapDispatchToProps)(PageAirportDetails);

export default PageAirportDetails;
