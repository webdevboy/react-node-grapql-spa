import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EstimatedPriceQuotations.css';
import Text from '../../../Primitives/Text';
import SectionTitle from "../../../Layout/SectionTitle";
import Button from "../../../Primitives/Button";
import EmptyLegRow from "../../../Content/EmptyLegs/EmptyLegRow";

class EstimatedPriceQuotations extends React.Component {
  render() {
    const emptyLegsList = [
      {
        id: "a928998b-f884-40e9-b0e3-b699131170d9",
        from_date: "2018-05-01T00:00:00.000Z",
        to_date: "2018-05-30T00:00:00.000Z",
        seats: 100,
        price: 10000.99,
        featured: true,
        archived: true,
        published: true,
        from_airport: {
          name: "Padova",
          distance: null,
          sfid: "a065E000000rdbPQAQ",
          id: 13,
          icao: "LIPU",
          iata: "QPA",
          coordinates: "45.38555556,11.835",
          helipad: false,
          time_to_utc: "1",
          city: {
            sfid: "a0I5E000000d4mPUAQ",
            name: "Padova",
            country: {
              sfid: "a0K5E0000010IubUAE",
              name: "Italy",
              countryCode: "it",
              __typename: "CountryType",
            },
            __typename: "AirportCityType",
          },
          __typename: "AirportType",
        },
        to_airport: {
          name: "Olbia Costa Smeralda",
          distance: null,
          sfid: "a065E000000rdbOQAQ",
          id: 12,
          icao: "LIEO",
          iata: "OLB",
          coordinates: "40.88583333,9.516944444",
          helipad: false,
          time_to_utc: "1",
          city: {
            sfid: "a0I5E000000d4mOUAQ",
            name: "Olbia",
            country: {
              sfid: "a0K5E0000010IubUAE",
              name: "Italy",
              countryCode: "it",
              __typename: "CountryType",
            },
            __typename: "AirportCityType",
          },
          __typename: "AirportType",
        },
        __typename: "EmptyLegType",
      },
      {
        id: "cb5964be-02c8-4625-b188-a35d3354ed5a",
        from_date: "2018-05-01T00:00:00.000Z",
        to_date: "2018-05-30T00:00:00.000Z",
        seats: 9,
        price: 15000.99,
        featured: true,
        archived: true,
        published: true,
        from_airport: {
          name: "Akita",
          distance: null,
          sfid: "a065E000000rdbiQAA",
          id: 30,
          icao: "RJSK",
          iata: "AXT",
          coordinates: "39.6025,140.2169444",
          helipad: false,
          time_to_utc: "9",
          city: {
            sfid: "a0I5E000000d3X6UAI",
            name: "Akita",
            country: {
              sfid: "a0K5E0000010IudUAE",
              name: "Japan",
              countryCode: "jp",
              __typename: "CountryType",
            },
            __typename: "AirportCityType",
          },
          __typename: "AirportType",
        },
        to_airport: {
          name: "Fukuoka",
          distance: null,
          sfid: "a065E000000rdbnQAA",
          id: 35,
          icao: "RJFF",
          iata: "FUK",
          coordinates: "33.58388889,130.45",
          helipad: false,
          time_to_utc: "9",
          city: {
            sfid: "a0I5E000000d3XCUAY",
            name: "Fukuoka",
            country: {
              sfid: "a0K5E0000010IudUAE",
              name: "Japan",
              countryCode: "jp",
              __typename: "CountryType",
            },
            __typename: "AirportCityType",
          },
          __typename: "AirportType",
        },
        __typename: "EmptyLegType",
      },
    ];

    const { classnames, id, data } = this.props;

    return (
      <div className="container lj-pad-y-50">
        <div className="row">
          <div className="col">
            <SectionTitle textId="client.jetCostDestination.estimatedPriceQuotations" defaultMessage="Estimated Price Quotations"/>
          </div>
        </div>

        <div className={cx("row py-5", s["empty-legs-listing"])}>
          <div className="col">
            {emptyLegsList.map(emptyleg => {
              return <EmptyLegRow key={emptyleg.id} version={3} emptyleg={emptyleg} />;
            })}
          </div>
        </div>

        <div className="row">
          <div className="col d-flex justify-content-center">
            <Button className={cx("btn-outline-primary w-100")} textId="client.jetCostDestination.askUsForAQuote" />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(EstimatedPriceQuotations);
