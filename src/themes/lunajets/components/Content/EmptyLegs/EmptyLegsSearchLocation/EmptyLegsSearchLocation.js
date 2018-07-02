import React from "react";
import { FormattedDate } from "react-intl";
import cx from "classnames";
import s from "./EmptyLegsSearchLocation.scss";
import PropTypes from "prop-types";
import Datetime from "react-datetime";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import EmptyLegsResult from "../EmptyLegsResult";
import queryGetEmptyLegs from "./queryGetEmptyLegs.graphql";
import Promise from "bluebird";

class EmptyLegsSearchLocation extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired,
  };
  // This component is used to manage the search of empty legs and the result's display
  constructor(props) {
    super(props);
    this.searchEmptyLeg = this.searchEmptyLeg.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.changeView = this.changeView.bind(this);
    this.setIsFetchingData = this.setIsFetchingData.bind(this);
    this.state = {
      from: "",
      to: "",
      date: "",
      view: "list",
      dateInterval: false,
      price_range: { min: 1000, max: 100000 },
      sort: 1,
      isFetching: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {}

  changeView(view) {
    this.setState(view);
  }

  setIsFetchingData(value) {
    this.setState(value);
  }

  // Function used to retrieve data of empty leg from DB
  searchEmptyLeg = variable => {
    const { client } = this.context;

    return new Promise((resolve, reject) => {
      client
        .query({
          query: queryGetEmptyLegs,
          variables: variable,
        })
        .then(({ data }) => {
          resolve(data.emptylegs);
        });
    });
  };

  // Fetch data of empty leg from database based on search filters
  fetchData = async () => {
    const { toAirportId, fromAirportId, id } = this.props;

    const variable = {};
    const newState = this.state;

    // Handle search from airport
    if (fromAirportId && fromAirportId !== "") {
      const strFrom = String(fromAirportId);
      variable.list_from_airport_id = strFrom.split(",");
    }

    // Handle search to airport
    if (toAirportId && toAirportId !== "") {
      const strTo = String(toAirportId);
      variable.list_to_airport_id = strTo.split(",");
    }

    const emptylegs = await this.searchEmptyLeg(variable);
    newState.data = emptylegs.filter(em => em.id !== id);
    newState.isFetching = false;
    this.setState(newState);
  };

  render() {
    return (
      <div className={s["emptylegs-description"]}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col")}>
              <h2 className={"section-title lt-blue"}>
                <Text strong={true} defaultMessage="Similar Empty legs" id="emptyleg.detail.search.title" />
              </h2>
            </div>
          </div>

          <div className={cx("row")}>
            <div className={cx("col section-heading")}>
              <Text strong={true} defaultMessage="Same destination, different date" id="emptyleg.detail.search.title" />
            </div>
          </div>
        </div>
        <EmptyLegsResult isFetching={this.state.isFetching} data={this.state.data} view={this.state.view} />
      </div>
    );
  }
}

export default withStyles(s)(EmptyLegsSearchLocation);
