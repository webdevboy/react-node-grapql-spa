import React from "react";
import PropTypes from 'prop-types';
import { FormattedDate } from "react-intl";
import cx from "classnames";
import s from "./AccountEmptyLegsResult.scss";
import Pagination from "react-js-pagination";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import Link from "../../../Primitives/Link";
import Button from "../../../Primitives/Button";
import AccountEmptyLegRow from "../AccountEmptyLegRow";
import Map from "../../../Widgets/MapBox";
import Loading from "react-loading-animation";

import { FaAngleRight, FaAngleLeft, FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/lib/fa";

class AccountEmptyLegsResult extends React.Component {
  // This component is used to manage empty legs searching
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = {
      currentPage: 1,
      emptylegs: this.props.data,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPage: 1,
      emptylegs: nextProps.data,
    });
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  render() {
    const {
      data: emptylegs, view, isFetching, pagination, itemsPerPage
    } = this.props;
    const currentPage = this.state.currentPage;
    const legs = [];
    let slicedEmptyLeg = null;
    if (emptylegs !== null) {
      slicedEmptyLeg = emptylegs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
      // console.log('emptylegs',emptylegs);
      emptylegs.forEach(emptyleg => {
        const fromCoordinates = emptyleg.from_airport.coordinates.split(",").reverse();
        const toCoordinates = emptyleg.to_airport.coordinates.split(",").reverse();
        legs.push(fromCoordinates);
        legs.push(toCoordinates);
      });
    }

    let seoJson = "";
    if(slicedEmptyLeg) {
      seoJson += '[';
        slicedEmptyLeg.map((leg, index) => {
          seoJson += '{';
          seoJson += '  "@context": "http://schema.org",';
          seoJson += '  "@type": "FlightReservation",';
          seoJson += '  "reservationId": "'+ leg.id +'",';
          seoJson += '  "reservationStatus": "http://schema.org/Confirmed",';
          seoJson += '  "underName": {"@type": "Person", "name": "Eva Green"},';
          seoJson += '  "reservationFor": {';
          seoJson += '      "@type": "Flight",';
          seoJson += '      "flightNumber": "'+ leg.id +'",';
          seoJson += '      "airline": { "@type": "Airline", "name": "United", "iataCode": "UA"},';
          seoJson += '      "departureAirport": { "@type": "Airport", "name": "'+ leg.from_airport.name +'", "iataCode": "'+ leg.from_airport.iata +'" },';
          seoJson += '      "departureTime": "'+ leg.from_date +'",';
          seoJson += '      "arrivalAirport": { "@type": "Airport", "name": "'+ leg.to_airport.name +'", "iataCode": "'+ leg.to_airport.iata +'" },';
          seoJson += '      "arrivalTime": "'+ leg.until_date +'"';
          seoJson += '  }';
          seoJson += '}';

          if ((index+1) < slicedEmptyLeg.length) {
            seoJson += ',';
          }
        });
      seoJson += ']';
    }
    return (
      <Loading isLoading={isFetching}>
        <script type="application/ld+json">
          {seoJson}
        </script>
        <div className={s["empty-legs-result"]}>
          {slicedEmptyLeg ? (
            <div className={cx("container pl-0 pr-0 pl-sm-2 pr-sm-2")}>
              {view == "list" ? (
                // listing
                <table className={cx(s["empty-legs-listing"], "w-100")}>
                  {emptylegs.map(emptyleg => <AccountEmptyLegRow key={emptyleg.id} version={2} emptyleg={emptyleg} goDetail={() => this.props.goDetail(emptyleg)} />)}
                  <div className={cx("d-block mt-4", { "d-sm-none": pagination })}>
                    <div className={cx("row", s["btn-view-all-empty-legs"])}>
                      <div className={cx("col text-center")}>
                        <Link
                          to="#"
                          className={"btn btn-outline btn-block dk-blue conduit mx-auto my-0"}
                          text="VIEW ALL EMPTY LEGS"
                          id="client.callToAction.viewAllEmptyLegs"
                        />
                      </div>
                    </div>
                  </div>
                </table>
              ) : (
                <div className={s["mapbox"]}>
                  <Map type="emptylegs" legs={legs} emptyleg zoomControl scaleControl />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </Loading>
    );
  }
}

AccountEmptyLegsResult.propTypes = {
  data: PropTypes.array,
  isFetching: PropTypes.bool,
  itemsPerPage: PropTypes.number,
  pagination: PropTypes.bool,
  view: PropTypes.string,
};

AccountEmptyLegsResult.defaultProps = {
  data: [],
  isFetching: false,
  itemsPerPage: 7,
  pagination: true,
  view: 'list',
};

export default withStyles(s)(AccountEmptyLegsResult);
