import React from 'react';
import { FormattedDate } from 'react-intl';
import cx from 'classnames';
import s from './EmptyLegsSearch.css';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Text from '../../../Primitives/Text';
import EmptyLegsFilter from '../EmptyLegsFilter';
import AccountEmptyLegsFilter from '../AccountEmptyLegsFilter';
import EmptyLegsResult from '../EmptyLegsResult';
import AccountEmptyLegsResult from '../AccountEmptyLegsResult';
import queryGetEmptyLegs from './queryGetEmptyLegs.graphql';
import Promise from 'bluebird';


class EmptyLegsSearch extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired,
  };
  // This component is used to manage the search of empty legs and the result's display
  constructor(props) {
    super(props);
    this.handleAirportFromChanged = this.handleAirportFromChanged.bind(this);
    this.handleAirportToChanged = this.handleAirportToChanged.bind(this);
    this.handlePriceRangeChanged = this.handlePriceRangeChanged.bind(this);
    this.handleDateChanged = this.handleDateChanged.bind(this);
    this.handleDateIntervalChanged = this.handleDateIntervalChanged.bind(this);
    this.handleSortChanged = this.handleSortChanged.bind(this);
    this.searchEmptyLeg = this.searchEmptyLeg.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.changeView = this.changeView.bind(this);
    this.setIsFetchingData = this.setIsFetchingData.bind(this);
    this.state = {
      from: '',
      to: '',
      date: '',
      view: 'list',
      dateInterval: false,
      price_range: { min: 1000, max: 100000 },
      passenger_range: { min: 1, max: 150 },
      sort: 1,
      isFetching : true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) { }

  changeView(view) {
    this.setState(view);
  }

  setIsFetchingData(value) {
    this.setState(value);
  }
  handleAirportFromChanged(value) {
    const theState = this.state;
    if (value) {
      theState.from = value.from;
    }
    this.fetchData(theState);
  }
  handleAirportToChanged(value) {
    const theState = this.state;
    if (value) {
      theState.to = value.to;
    }
    this.fetchData(theState);
  }
  handlePriceRangeChanged(value) {
    const theState = this.state;
    if (value && value.price_range) {
      theState.price_range = value.price_range;
    }
    this.fetchData(theState);
  }
  handlePassengerRangeChanged(value) {
    const theState = this.state;
    if (value && value.passenger_range) {
      theState.passenger_range = value.passenger_range;
    }
    this.fetchData(theState);
  }
  handleDateChanged(value) {
    const theState = this.state;
    if (value && value.date) {
      theState.date = value.date;
    }
    this.fetchData(theState);
  }
  handleDateIntervalChanged(value) {
    const theState = this.state;
    if (value && value.dateInterval) {
      theState.dateInterval = value.dateInterval;
    }
    this.fetchData(theState);
  }
  handleSortChanged(value) {
    const theState = this.state;
    if (value && value.sort) {
      theState.sort = value.sort;
    }
    this.fetchData(theState);
  }

  // Function used to retrieve data of empty leg from DB
  searchEmptyLeg = (variable) => {
    const { client } = this.context;

    return new Promise(((resolve, reject) => {
      client.query({
        query: queryGetEmptyLegs,
        variables: variable,
      }).then(({ data }) => {
        resolve(data.emptylegs);
      });
    }));
  }
  // Fetch data of empty leg from database based on search filters
  fetchData = async (filters) => {
    const variable = {};
    const newState = (filters) ? filters : this.state;
    // Handle search from airport
    if ((newState.from) && newState.from !== '') {
      const strFrom = String(newState.from);
      variable.list_from_airport_id = strFrom.split(',');
    }
    // Handle search to airport
    if ((newState.to) && newState.to !== '') {
      const strTo = String(newState.to);
      variable.list_to_airport_id = strTo.split(',');
    }
    // Handle search for price range
    if (newState.price_range) {
      variable.price_range = [newState.price_range.min, newState.price_range.max];
    }
    // Handle search for passenger range
    if (newState.passenger_range) {
      variable.passenger_range = [newState.passenger_range.min, newState.passenger_range.max];
    }
    // Handle search for date
    if (newState.date) {
      if (newState.dateInterval) {
        variable.date = [Datetime.moment(newState.date).subtract(3, 'day'), Datetime.moment(newState.date).add(3, 'day')];
      } else {
        variable.date = newState.date;
      }
    }
    //Handle sort
    if (newState.sort) {
      variable.sort = newState.sort;
    }
    const emptylegs = await this.searchEmptyLeg(variable);
    newState.data = emptylegs;
    newState.isFetching = false;
    this.setState(newState);
  }


  render() {
    
    const {pageFrom, tabType} = this.props;
    return (
      <div>
        {
          pageFrom == 'customer-area' ? 
          <div>
            <AccountEmptyLegsFilter changeView={this.changeView}
              handleAirportFromChanged={this.handleAirportFromChanged}
              handleAirportToChanged={this.handleAirportToChanged}
              handlePriceRangeChanged={this.handlePriceRangeChanged}
              handlePassengerRangeChanged={this.handlePassengerRangeChanged}
              handleDateChanged={this.handleDateChanged}
              handleDateIntervalChanged={this.handleDateIntervalChanged}
              handleSortChanged={this.handleSortChanged}
              setIsFetchingData={this.setIsFetchingData} 
              data={this.state.data}
              goMyRoutes={this.props.goMyRoutes}
              tabType={tabType}/>
            <AccountEmptyLegsResult isFetching={this.state.isFetching} data={this.state.data} view={this.state.view} goDetail={this.props.goDetail} />
          </div>
          :
          <div>
            <EmptyLegsFilter changeView={this.changeView}
              handleAirportFromChanged={this.handleAirportFromChanged}
              handleAirportToChanged={this.handleAirportToChanged}
              handlePriceRangeChanged={this.handlePriceRangeChanged}
              handleDateChanged={this.handleDateChanged}
              handleDateIntervalChanged={this.handleDateIntervalChanged}
              handleSortChanged={this.handleSortChanged}
              setIsFetchingData={this.setIsFetchingData} />
            <EmptyLegsResult isFetching={this.state.isFetching} data={this.state.data} view={this.state.view} />
          </div>
        }
      </div>
    );
  }
}


export default (withStyles(s)(EmptyLegsSearch));
