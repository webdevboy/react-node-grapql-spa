import React from "react";
import ReactDOM from "react-dom";
import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./EmptyLegs.css";
import {
  Menu,
  Checkbox,
  Switch,
  Button,
  ContextMenu,
  Tooltip,
  Overlay,
  MenuItem,
  MenuDivider,
  Popover,
  Intent,
  Toaster,
  PopoverInteractionKind,
  Position
} from "@blueprintjs/core";
import Breadcrumbs from "admin/components/Breadcrumbs";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import cx from "classnames";
import { connect } from "react-redux";
import { addEmptyLeg } from "admin/actions/emptyLegs";
import { Suggest, MultiSelect } from "@blueprintjs/labs";
import history from "core/history";
import TooltipLabel from "admin/components/TooltipLabel";
import { DateRangePicker, DateTimePicker, TimePickerPrecision, DateRangeInput } from "@blueprintjs/datetime";
import { random, times } from "lodash";
import moment from "moment";
import LoadingSpinner from "admin/components/LoadingSpinner";
import getAirportsQuery from "admin/queries/fetchSFAirports.graphql";
import getAircraftPostForEmptyLeg from "admin/queries/fetchAircraftPostForEmptyLeg.graphql";
import getAccountQuery from "admin/queries/fetchSF_Account.graphql";
import getFleetAircraftQuery from "admin/queries/fetchSF_Fleet_Aircraft.graphql";
import getFleetAircraftOperatorQuery from "admin/queries/fetchSF_Fleet_AircraftOperator.graphql";

const Collapsed = ({ saveEmptyLeg, cancel }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-confirm"
      onClick={e => saveEmptyLeg()}
      intent={Intent.SUCCESS}
      text="Save"
      className={cx(s.menuItem)}
    />
    <MenuItem
      iconName="pt-icon-undo"
      onClick={e => cancel}
      text="Cancel"
      intent={Intent.NONE}
      className={cx(s.menuItem)}
    />
  </Menu>
);

class EmptyLeg extends React.Component {
  refHandlers = {
    toaster: ref => (this.toaster = ref)
  };

  static propTypes = {};

  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const { emptyLeg, currenciesArray } = this.props;
    var defaultFromDate = new Date();
    defaultFromDate.setHours(0);
    defaultFromDate.setMinutes(0);
    defaultFromDate.setSeconds(0);
    defaultFromDate = this.stripTimeZone(defaultFromDate);
    var defaultUntilDate = new Date();
    defaultUntilDate.setHours(23);
    defaultUntilDate.setMinutes(59);
    defaultUntilDate.setSeconds(0);
    defaultUntilDate = this.stripTimeZone(defaultUntilDate);

    let newEmptyLeg = {
      from_airport_sfid: undefined,
      to_airport_sfid: undefined,
      aircraft_sfid: undefined,
      details: undefined,
      price: undefined,
      published: false,
      featured: false,
      currency_id: undefined,
      from_date: defaultFromDate,
      until_date: defaultUntilDate
    };

    if (emptyLeg) {
      newEmptyLeg = {
        ...emptyLeg,
        from_airport_sfid: emptyLeg.from_airport.sfid,
        to_airport_sfid: emptyLeg.to_airport.sfid,
        aircraft_sfid: emptyLeg.aircraft.sfid,
        currency_id: emptyLeg.currency.id,
        from_date: emptyLeg.from_date ? new Date(emptyLeg.from_date) : defaultFromDate,
        until_date: emptyLeg.until_date ? new Date(emptyLeg.until_date) : defaultUntilDate
      };
    }

    // Currency must be EUR
    if (currenciesArray) {
      currenciesArray.map(currency => {
        if (currency.currency === "EUR") {
          newEmptyLeg.currency_id = currency.id;
        }
      });
    }

    this.state = {
      isLoading: false,
      emptyLeg: newEmptyLeg,
      aircraftPostsArray: [],
      aircraftPostsSource: "",
      airportQuery: "",
      airportsArray: [],
      accountsArray: [],
      fleetsArray: [],
      display_from_date: this.addTimeZone(newEmptyLeg.from_date),
      display_until_date: this.addTimeZone(newEmptyLeg.until_date) ,
      sessionFromDate: newEmptyLeg.from_date < defaultFromDate ? newEmptyLeg.from_date : defaultFromDate,
    };

    this.originalState = this.state;
    this.retrieveEditorData = this.retrieveEditorData.bind(this);
  }


  addTimeZone(utcDate) {
    var currentDate = new Date();
    var localTime = new Date(utcDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000);
    return localTime;
  }

  stripTimeZone(localTime) {
    var utcTime = new Date(localTime.getTime() - localTime.getTimezoneOffset() * 60 * 1000);
    return utcTime;
  }

  resetEmptyLeg = () => {
    const { currenciesArray } = this.props;
    this.aircraftPostSuggest.input.value = "";
    this.aircraftPostSuggest.state.selectedItem = null;
    this.fleetSuggest.input.value = "";
    this.fleetSuggest.state.selectedItem = null;
    this.accountSuggest.input.value = "";
    this.accountSuggest.state.selectedItem = null;
    this.airportToSuggest.input.value = "";
    this.airportToSuggest.state.selectedItem = null;
    this.airportFromSuggest.input.value = "";
    this.airportFromSuggest.state.selectedItem = null;
    var defaultFromDate = new Date();
    defaultFromDate.setHours(0);
    defaultFromDate.setMinutes(0);
    defaultFromDate.setSeconds(0);
    defaultFromDate = this.stripTimeZone(defaultFromDate);
    var defaultUntilDate = new Date();
    defaultUntilDate.setHours(23);
    defaultUntilDate.setMinutes(59);
    defaultUntilDate.setSeconds(0);
    defaultUntilDate = this.stripTimeZone(defaultUntilDate);

    let newEmptyLeg = {
      from_airport_sfid: undefined,
      to_airport_sfid: undefined,
      aircraft_sfid: undefined,
      details: undefined,
      price: "",
      published: false,
      featured: false,
      currency_id: undefined,
      from_date: defaultFromDate,
      until_date: defaultUntilDate
    };
    if (currenciesArray) {
      currenciesArray.map(currency => {
        if (currency.currency === "EUR") {
          newEmptyLeg.currency_id = currency.id;
        }
      });
    }
    this.setState({
      isLoading: false,
      updateFromDate: false,
      updateUntilDate: false,
      emptyLeg: newEmptyLeg,
      aircraftPostsArray: [],
      aircraftPostsSource: "",
      airportQuery: "",
      fleetsArray: [],
      sessionFromDate: defaultFromDate,
      display_from_date: this.addTimeZone(newEmptyLeg.from_date),
      display_until_date: this.addTimeZone(newEmptyLeg.until_date),
      isSaving:false,
    });
  };
  componentDidMount() {
    this.retrieveEditorData();
  }

  retrieveEditorData = async () => {
    let airports = await this.fetchSfAirport();
    let fleetAircraftOperators = await this.fetchSfFleetAircraftOperator();
    if (airports.length > 0 && fleetAircraftOperators.length > 0) {
      let operatorsSfid = [];
      fleetAircraftOperators.map(fleet => {
        if (operatorsSfid.indexOf(fleet.operator__c) === -1) {
          operatorsSfid.push(fleet.operator__c);
        }
      });

      let accounts = await this.fetchSfAccount();
      if (accounts.length > 0) {
        this.setState({
          ...this.state,
          aircraftPostsArray: [],
          aircraftPostsSource: "",
          airportsArray: airports,
          accountsArray: accounts
        });
        // In case of edit, fetch other data
        // if (this.props.edit) {
        let accountSfid =
          this.state.emptyLeg && this.state.emptyLeg.details && this.state.emptyLeg.details.account_sfid;
        // Fetch list of fleet with the given account
        if (accountSfid) {
          const fleetAircrafts = await this.fetchSfFleetAircraft(accountSfid);
          if (fleetAircrafts.length > 0) {
            this.setState({
              ...this.state,
              fleetsArray: fleetAircrafts
            });

            let aircraftSfid = this.state.emptyLeg && this.state.emptyLeg.aircraft_sfid;
            // Fetch the corresponding post
            if (aircraftSfid) {
              const aircraftPostsArray = await this.fetchAircraftPost(aircraftSfid);
              if (aircraftPostsArray.length > 0) {
                this.setState({
                  ...this.state,
                  aircraftPostsArray: aircraftPostsArray,
                  aircraftPostsSource: "sameAircraft"
                });
              }
            }
            // }
          }
        }
      }
    }
  };

  validateEmptyLeg(emptyLeg) {
    var errorLog = "";
    if (!emptyLeg.details) {
      errorLog = "Please select empty leg data";
    } else if (!emptyLeg.details.account_sfid) {
      errorLog = "Please select empty leg Operator";
    } else if (!emptyLeg.details.fleet_aircraft_sfid) {
      errorLog = "Please select empty leg Operating Aircraft";
    } else if (!emptyLeg.details.aircraftPost_post_id) {
      errorLog = "Please select empty leg Aircraft Model";
    } else if (!emptyLeg.from_date) {
      errorLog = "Please select empty leg From Date";
    } else if (!emptyLeg.until_date) {
      errorLog = "Please select empty leg Until Date";
    } else if (!emptyLeg.from_airport_sfid) {
      errorLog = "Please select empty leg Departure Airport";
    } else if (!emptyLeg.to_airport_sfid) {
      errorLog = "Please select empty leg Arrival Airport";
    } else if (!emptyLeg.price) {
      errorLog = "Please select empty leg Price";
    } else if (!emptyLeg.currency_id) {
      errorLog = "Please select empty leg Currency";
    } else if (emptyLeg.details.from_date > emptyLeg.details.until_date) {
      errorLog = "Departure time is after arrival time. Please correct the departure time!";
    }

    return errorLog;
  }

  saveEmptyLeg = async postAction => {
    const { emptyLeg } = this.state;
    this.toaster.clear();
    let errorMessage = this.validateEmptyLeg(emptyLeg);
    if (errorMessage) {
      this.toaster.show({
        message: errorMessage,
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error",
      });
      return;
    }

    let search_content = this.fleetSuggest.input.value;
    search_content = search_content.concat(
      " ",
      this.airportFromSuggest.input.value,
      " ",
      this.airportToSuggest.input.value
    );

    const newEmptyLeg = {
      ...emptyLeg,
      details: {
        ...emptyLeg.details,
        search_content: search_content.toLowerCase(),
      },
    };

    this.setState({
      isSaving: true,
    });

    await this.props.addEmptyLeg(newEmptyLeg);

    this.setState({
      isSaving: false,
    });

    // this.setState(this.originalState);

    // check for errors
    this.toaster.show(
      this.props.errors
        ? {
            message: this.props.errors.graphQLErrors[0].message || null,
            timeout: 3000,
            intent: Intent.DANGER,
            iconName: "pt-icon-error",
          }
        : {
            message: "Empty Leg saved successfully!",
            timeout: 3000,
            intent: Intent.SUCCESS,
            iconName: "pt-icon-success",
            action: {
              text: "Ok",
              onClick: this.goToManage,
            },
          }
    );
    if (postAction) {
      postAction === "close" && this.goToManage();
      postAction === "new" && this.resetEmptyLeg();
    }
  };

  goToManage = () => {
    history.push("/website/empty-legs");
  };

  goToAddNew = () => {
    history.push("/website/empty-legs/add#");
  };

  cancel = () => {
    if (!history.length) {
      history.push("/empty-legs");
    } else {
      history.goBack();
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  renderMenuItem = ({ handleClick, item, isActive }) => (
    <MenuItem
      className={cx(isActive ? s.isActive : null)}
      key={item.sfid}
      text={item.full_name}
      onClick={handleClick}
    />
  );

  renderOperatorMenuItem = ({ handleClick, item, isActive }) => (
    <MenuItem className={cx(isActive ? s.isActive : null)} key={item.sfid} text={item.name} onClick={handleClick} />
  );

  renderFleetMenuItem = ({ handleClick, item, isActive }) => {
    const manuName = item.aircraft && item.aircraft.manufacturer ? item.aircraft.manufacturer.name : "";
    const aircraftName = item.aircraft ? item.aircraft.name : "";
    const name = item ? item.name : "";
    return (
      <MenuItem
        className={cx(isActive ? s.isActive : null)}
        key={item.sfid}
        text={manuName + " " + aircraftName + " " + name}
        onClick={handleClick}
      />
    );
  };

  renderAircraftMenuItem = ({ handleClick, item, isActive }) => (
    <MenuItem className={cx(isActive ? s.isActive : null)} key={item.id} text={item.title} onClick={handleClick} />
  );

  renderCurrencyMenuItem = ({ handleClick, item, isActive }) => (
    <MenuItem className={cx(isActive ? s.isActive : null)} key={item.id} text={item.currency} onClick={handleClick} />
  );

  addFleet = async fleet => {
    if (fleet) {
      // manufacturer + aircraft_model_sf.name + fleet_aircraft.name
      this.aircraftPostSuggest.input.value = "";
      this.aircraftPostSuggest.state.selectedItem = null;

      this.setState({
        ...this.state,
        emptyLeg: {
          ...this.state.emptyLeg,
          details: {
            ...this.state.emptyLeg.details,
            available_seats: fleet.aircraft ? fleet.aircraft.seats : null,
            fleet_aircraft_sfid: fleet.sfid,
            manufacturer_name: fleet.aircraft && fleet.aircraft.manufacturer ? fleet.aircraft.manufacturer.name : null,
            aircraft_model_name: fleet.aircraft ? fleet.aircraft.name : null,
            registration_number: fleet.name,
            aircraftPost_id: undefined,
            aircraftPost_post_id: undefined,
            aircraftPost_title: undefined,
            aircraftPost_image: undefined
          }
        }
      });

      const aircraftPostsArray = await this.fetchAircraftPost(fleet.aircraft.sfid);

      if (aircraftPostsArray && aircraftPostsArray.length > 0) {
        this.setState({
          ...this.state,
          aircraftPostsArray: aircraftPostsArray,
          aircraftPostsSource: "sameAircraft"
        });
      } else if (fleet.aircraft.manufacturer) {
        // search with the manufacturer id if it it not null
        const manuPostsArray = await this.fetchAircraftPost(null, fleet.aircraft.manufacturer.sfid);
        if (manuPostsArray && manuPostsArray.length > 0) {
          this.setState({
            ...this.state,
            aircraftPostsArray: manuPostsArray,
            aircraftPostsSource: "sameManu"
          });
        }
      }
    }
  };

  addAccount = async account => {
    if (account) {
      let toUpdateAccount = true;
      if (
        this.state.emptyLeg &&
        this.state.emptyLeg.details &&
        this.state.emptyLeg.details.account_sfid === account.sfid
      ) {
        toUpdateAccount = false;
      }

      if (toUpdateAccount) {
        // Reset the previous selection
        this.aircraftPostSuggest.input.value = "";
        this.aircraftPostSuggest.state.selectedItem = null;
        this.fleetSuggest.input.value = "";
        this.fleetSuggest.state.selectedItem = null;

        this.setState({
          ...this.state,
          fleetsArray: [],
          aircraftPostsArray: [],
          aircraftPostsSource: "",
          emptyLeg: {
            ...this.state.emptyLeg,
            details: {
              ...this.state.emptyLeg.details,
              account_sfid: account.sfid,
              account_name: account.name,
              aircraftPost_id: undefined,
              aircraftPost_post_id: undefined,
              aircraftPost_title: undefined,
              aircraftPost_image: undefined,
              fleet_aircraft_sfid: undefined,
              manufacturer_name: undefined,
              aircraft_model_name: undefined,
              registration_number: undefined,
              available_seats: undefined
            }
          }
        });
        // Search the fleet with this account:
        const fleetAircrafts = await this.fetchSfFleetAircraft(account.sfid);
        if (fleetAircrafts.length > 0) {
          this.setState({
            ...this.state,
            fleetsArray: fleetAircrafts
          });
        }
      }
    }
  };

  addFromAirport = airport => {
    if (airport) {
      this.setState({
        ...this.state,
        emptyLeg: {
          ...this.state.emptyLeg,
          from_airport_sfid: airport.sfid
        }
      });
    }
  };

  addToAirport = airport => {
    if (airport) {
      this.setState({
        ...this.state,
        emptyLeg: {
          ...this.state.emptyLeg,
          to_airport_sfid: airport.sfid
        }
      });
    }
  };

  addAircraftPost = aircraftPost => {
    if (aircraftPost) {
      this.setState({
        ...this.state,
        emptyLeg: {
          ...this.state.emptyLeg,
          aircraft_sfid: aircraftPost.meta.aircraft_sfid,
          details: {
            ...this.state.emptyLeg.details,
            aircraftPost_post_id: aircraftPost.post_id,
            aircraftPost_title: aircraftPost.title,
            aircraftPost_image: aircraftPost.media && aircraftPost.media.src
          }
        }
      });
    }
  };

  addCurrency = currency => {
    this.setState({
      ...this.state,
      emptyLeg: {
        ...this.state.emptyLeg,
        currency_id: currency.id
      }
    });
  };

  handleFromDateChange = date => {
    let utcTime = this.stripTimeZone(date);

    if (this.state.emptyLeg && this.state.display_until_date && this.state.display_until_date > date) {
      this.setState({
        ...this.state,
        display_from_date: date,
        emptyLeg: {
          ...this.state.emptyLeg,
          from_date: utcTime
        }
      });
    } else {
      this.setState({
        ...this.state,
        display_from_date: date,
        display_until_date: date,
        emptyLeg: {
          ...this.state.emptyLeg,
          from_date: utcTime,
          until_date: utcTime
        }
      });
    }
  };

  handleUntilDateChange = date => {
    let utcTime = this.stripTimeZone(date);
    // To avoid having departure time after arrival time
    if (this.state.emptyLeg && this.state.display_from_date && this.state.display_from_date > date) {
      this.setState({
        ...this.state,
        display_from_date: date,
        display_until_date: date,
        emptyLeg: {
          ...this.state.emptyLeg,
          from_date: utcTime,
          until_date: utcTime
        }
      });
    } else {
      this.setState({
        ...this.state,
        display_until_date: date,
        emptyLeg: {
          ...this.state.emptyLeg,
          until_date: utcTime
        }
      });
    }
  };

  handlePriceChange = inPrice => {
    this.setState({
      ...this.state,
      emptyLeg: {
        ...this.state.emptyLeg,
        price: inPrice.target.value
      }
    });
  };

  handleFeaturedChange = inCheckbox => {
    let newFeatured = !this.state.emptyLeg.featured;
    this.setState({
      ...this.state,
      emptyLeg: {
        ...this.state.emptyLeg,
        featured: newFeatured
      }
    });
  };

  handlePublishedChange = inCheckbox => {
    let newPublished = !this.state.emptyLeg.published;
    this.setState({
      ...this.state,
      emptyLeg: {
        ...this.state.emptyLeg,
        published: newPublished
      }
    });
  };

  fetchAircraftPost = (aircraft_sfid, manu_sfid) => {
    const { client } = this.context;
    return new Promise((resolve, reject) => {
      client
        .query({
          query: getAircraftPostForEmptyLeg,
          variables: {
            aircraft_sfid: aircraft_sfid,
            manu_sfid: manu_sfid,
            language_id: this.props.defaultLanguage.id
          }
        })
        .then(({ data }) => {
          resolve(data.posts);
        });
    });
  };

  filterAircraftPost = async (query, item, index) => {
    const entry = _.toLower(`${item.name}`);
    const loweredQuery = query.toLowerCase();
    return String(entry).includes(loweredQuery);
  };

  filterFleet = async (query, item, index) => {
    const entry = _.toLower(`${item.name}`);
    const loweredQuery = query.toLowerCase();
    return String(entry).includes(loweredQuery);
  };

  fetchSfAccount = () => {
    const { client } = this.context;

    return new Promise((resolve, reject) => {
      client
        .query({
          query: getAccountQuery,
          variables: {
            recordTypeId: "012w0000000FzWQAA0"
          }
        })
        .then(({ data }) => {
          resolve(data.accounts);
        });
    });
  };

  fetchSfFleetAircraft = account_sfid => {
    const { client } = this.context;

    return new Promise((resolve, reject) => {
      client
        .query({
          query: getFleetAircraftQuery,
          variables: {
            account_sfid: account_sfid
          }
        })
        .then(({ data }) => {
          resolve(data.fleetAircrafts);
        });
    });
  };

  fetchSfFleetAircraftOperator = () => {
    const { client } = this.context;

    return new Promise((resolve, reject) => {
      client
        .query({
          query: getFleetAircraftOperatorQuery,
          variables: {}
        })
        .then(({ data }) => {
          resolve(data.fleetAircrafts);
        });
    });
  };

  filterAccount = (query, item, index) => item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;

  searchSfAirport = async () => {
    this.setState({
      isLoading: true
    });
    const { airportQuery } = this.state;
    let airports = await this.fetchSfAirport(airportQuery, 20);
    if (airports.length > 0) {
      this.setState({
        ...this.state,
        airportsArray: airports,
        isLoading: false
      });
    }
  };

  fetchSfAirport = (query, limit) => {
    const { client } = this.context;

    return new Promise((resolve, reject) => {
      client
        .query({
          query: getAirportsQuery,
          fetchPolicy: "cache-first",
          variables: {
            search: query,
            limit: limit ? limit : 20
          }
        })
        .then(({ data }) => {
          resolve(data.airports);
        });
    });
  };

  debouncedFetch = _.debounce(this.searchSfAirport, 200);

  filterAirport = (query, item, index) => {
    const entry = _.toLower(`${item.full_name}`);
    const loweredQuery = query.toLowerCase();

    if (loweredQuery !== this.state.airportQuery && loweredQuery.length > 2) {
      this.setState({
        ...this.state,
        airportQuery: loweredQuery
      });
      this.debouncedFetch();
    }

    return String(entry).includes(loweredQuery);
  };

  render() {
    const { edit, currentRoute, isLoading } = this.props;
    const {
      sessionFromDate,
      suggestEdited,
      emptyLeg,
      aircraftPostsArray,
      aircraftPostsSource,
      airportsArray,
      accountsArray,
      fleetsArray,
      display_from_date,
      display_until_date
    } = this.state;
    const breadcrumbs = <Breadcrumbs route={currentRoute} />;
    const timeProps = {
      precision: TimePickerPrecision.MINUTE,
      useAmPm: true,
      showArrowButtons: true
    };
    const Loading = (
      <MenuItem
        className={s.menuloader}
        text="Fetching Models ..."
        label={<Button type="button" className={cx("pt-button pt-fill pt-minimal")} loading />}
      />
    );

    const NoResults = <MenuItem iconName="pt-icon-issue" text="No Results" intent={Intent.WARNING} />;

    const actions = [
      <Action
        key="action-confirm"
        icon="pt-icon-confirm"
        loading={isLoading}
        intent="pt-intent-success"
        action={() => this.saveEmptyLeg("new")}
        label="Save & New"
        saving= {this.state.isSaving}
      />,
      <Action
        key="action-confirm"
        icon="pt-icon-confirm"
        loading={isLoading}
        intent="pt-intent-success"
        action={() => this.saveEmptyLeg("close")}
        label="Save & Close"
      />,
      // <Action
      //   key="action-confirm"
      //   icon="pt-icon-confirm"
      //   loading={isLoading}
      //   intent="pt-intent-success"
      //   action={() => this.saveEmptyLeg()}
      //   label="Save"
      // />,
      <Action key="action-cancel" icon="pt-icon-undo" intent="pt-intent-default" action={this.cancel} label="Close" />
    ];

    const actionPopover = <Collapsed save={this.saveEmptyLeg} cancel={this.cancel} />;

    var fromAirport = emptyLeg.from_airport ? emptyLeg.from_airport.full_name : "";

    if (emptyLeg.from_airport_sfid && airportsArray) {
      airportsArray.map(airport => {
        if (airport.sfid === emptyLeg.from_airport_sfid) {
          fromAirport = airport.full_name;
        }
      });
    }

    let toAirport = emptyLeg.to_airport ? emptyLeg.to_airport.full_name : "";

    if (emptyLeg.to_airport_sfid && airportsArray) {
      airportsArray.map(airport => {
        if (airport.sfid === emptyLeg.to_airport_sfid) {
          toAirport = airport.full_name;
        }
      });
    }

    let emptyLegAircraftTitle = undefined;
    let emptyLegAircraftImage = undefined;
    if (emptyLeg.details && emptyLeg.details.aircraftPost_title) {
      emptyLegAircraftTitle = emptyLeg.details.aircraftPost_title;
    }

    if (emptyLeg.details && emptyLeg.details.aircraftPost_image) {
      emptyLegAircraftImage = emptyLeg.details.aircraftPost_image;
    }

    let emptyLegFleet = "";
    if (emptyLeg.details && emptyLeg.details.aircraft_model_name) {
      emptyLegFleet =
        emptyLeg.details.manufacturer_name +
        " " +
        emptyLeg.details.aircraft_model_name +
        " (" +
        emptyLeg.details.registration_number +
        ")";
    }

    let emptyLegAccount = "";
    if (emptyLeg.details && emptyLeg.details.account_name) {
      emptyLegAccount = emptyLeg.details.account_name;
    }

    let availability = "";
    if (emptyLeg.details !== undefined) {
      if (emptyLeg.details.available_seats) {
        availability = emptyLeg.details.available_seats;
      }
    }

    var minDateFiveYear = new Date();
    minDateFiveYear.setFullYear(minDateFiveYear.getFullYear() - 5);
    var maxDateFiveYear = new Date();
    maxDateFiveYear.setFullYear(maxDateFiveYear.getFullYear() + 5);

    let datePickerFromDate = moment(sessionFromDate, ["YYYY-MM-DDTHH:mm:ss.SSS"]).toDate();
    let editOptionsForStartDate = { minDate: datePickerFromDate, maxDate: maxDateFiveYear };
    let editOptionsForEndDate = { minDate: minDateFiveYear, maxDate: maxDateFiveYear };
    let emptyLegFromDate = undefined;
    let emptyLegToDate = undefined;

    if (display_from_date && display_until_date) {
      const fromDate = moment(display_from_date, ["YYYY-MM-DDTHH:mm:ss.SSS"]);
      emptyLegFromDate = fromDate.toDate();
      const untilDate = moment(display_until_date, ["YYYY-MM-DDTHH:mm:ss.SSS"]);
      emptyLegToDate = untilDate.toDate();

      // Corrupted data where until_date < from_date
      // Change until date same as from date
      if (emptyLegFromDate > emptyLegToDate) {
        emptyLegToDate = emptyLegFromDate;
      }

      // Start date of date picker for "until_date" is from the "from_date"
      editOptionsForEndDate = { minDate: emptyLegFromDate, maxDate: maxDateFiveYear };
    }

    let aircraftPostSourceDescription = undefined;
    if (emptyLeg.details && emptyLeg.details.manufacturer_name) {
      if (aircraftPostsSource === "sameManu") {
        aircraftPostSourceDescription =
          "Unable to find an exact match of operation aircraft, please select a nearest model of the same manufacturer " +
          emptyLeg.details.manufacturer_name;
      } else if (aircraftPostsSource !== "sameAircraft") {
        aircraftPostSourceDescription =
          "Unable to find aircrafts with same manufacturer " + emptyLeg.details.manufacturer_name + "!";
      }
    }

    return (
      <Page actions={actions} actionPopover={actionPopover} breadcrumbs={breadcrumbs}>
        <div className={s.emptyLeg}>
          <Toaster position={Position.TOP} ref={this.refHandlers.toaster} />

          <form onSubmit={e => e.preventDefault()} className={s["emptyLegs-form"]}>
            <div className="container">
              {/* Account */}
              <div className={cx("pt-form-group")}>
                <label className="pt-label" htmlFor="account">
                  <TooltipLabel label="Operator" required tooltip="Select the account" />
                </label>
                <Suggest
                  name="Operator"
                  inputProps={
                    edit && !suggestEdited
                      ? {
                          value: emptyLegAccount ? emptyLegAccount : "",
                          onChange: e => {
                            this.setState({ suggestEdited: true });
                          }
                        }
                      : {}
                  }
                  ref={ref => (this.accountSuggest = ref)}
                  items={accountsArray}
                  popoverProps={{ className: s.suggester }}
                  itemRenderer={this.renderOperatorMenuItem}
                  className="pt-fill"
                  onItemSelect={this.addAccount}
                  itemPredicate={this.filterAccount}
                  resetOnSelect
                  inputValueRenderer={({ name }) => `${name}`}
                  noResults={<MenuItem iconName="pt-icon-issue" text="No Results" intent={Intent.WARNING} />}
                />
              </div>
              {/* Fleet Aicraft Name */}
              <div className={cx("pt-form-group")}>
                <label className="pt-label" htmlFor="fleet">
                  <TooltipLabel label="Operating Aircraft" required tooltip="Select the fleet" />
                </label>
                <Suggest
                  name="Operating Aircraft"
                  inputProps={
                    edit && !suggestEdited
                      ? {
                          value: emptyLegFleet ? emptyLegFleet : "",
                          onChange: e => {
                            this.setState({ suggestEdited: true });
                          }
                        }
                      : {}
                  }
                  ref={ref => (this.fleetSuggest = ref)}
                  items={fleetsArray}
                  popoverProps={{ className: s.suggester }}
                  itemRenderer={this.renderFleetMenuItem}
                  className="pt-fill"
                  onItemSelect={this.addFleet}
                  itemPredicate={this.filterFleet}
                  resetOnSelect
                  inputValueRenderer={({ name, aircraft }) =>
                    `${aircraft.manufacturer ? aircraft.manufacturer.name : ""} ${aircraft.name} ${name}`
                  }
                  noResults={<MenuItem iconName="pt-icon-issue" text="No Results" intent={Intent.WARNING} />}
                />
              </div>
              {/* Aircraft Posts */}
              <div className={cx("pt-form-group")}>
                <label className="pt-label" htmlFor="aircraft">
                  <TooltipLabel label="(Nearest) Aircraft Model" required tooltip="Select the aircraft" />
                </label>
                {aircraftPostSourceDescription ? (
                  <span style={{ color: "orange" }}>{aircraftPostSourceDescription}</span>
                ) : null}
                <Suggest
                  name="(Nearest) Aircraft Model"
                  inputProps={
                    edit && !suggestEdited
                      ? {
                          value: emptyLegAircraftTitle ? emptyLegAircraftTitle : "",
                          onChange: e => {
                            this.setState({ suggestEdited: true });
                          }
                        }
                      : {}
                  }
                  ref={ref => (this.aircraftPostSuggest = ref)}
                  items={aircraftPostsArray}
                  popoverProps={{ className: s.suggester }}
                  itemRenderer={this.renderAircraftMenuItem}
                  className="pt-fill"
                  onItemSelect={this.addAircraftPost}
                  itemPredicate={this.filterAircraftPost}
                  resetOnSelect
                  inputValueRenderer={({ title }) => `${title}`}
                  noResults={<MenuItem iconName="pt-icon-issue" text="No Results" intent={Intent.WARNING} />}
                />
              </div>
              <div className={cx("pt-form-group")}>
                {emptyLegAircraftImage ? (
                  <img
                    src={emptyLegAircraftImage}
                    className="img-responsive"
                    alt="Aircraft Model Image"
                    width="230"
                    height="170"
                  />
                ) : (
                  <span>Aircraft Post Image</span>
                )}
              </div>
              {/* From Until Date */}
              <div className={cx("pt-form-group", s["date"])}>
                <label className="pt-label">
                  <TooltipLabel label="From Date" required>
                    <span>Choose the first departure date and time for the empty leg</span>
                  </TooltipLabel>
                </label>
                <DateTimePicker
                  value={emptyLegFromDate}
                  onChange={this.handleFromDateChange}
                  timePickerProps={timeProps}
                  datePickerProps={editOptionsForStartDate}
                />
              </div>
              <div className={cx("pt-form-group", s["date"])}>
                <label className="pt-label">
                  <TooltipLabel label="Until Date" required>
                    <span>Choose the last departure date and time for the empty leg</span>
                  </TooltipLabel>
                </label>
                <DateTimePicker
                  value={emptyLegToDate}
                  onChange={this.handleUntilDateChange}
                  timePickerProps={timeProps}
                  datePickerProps={editOptionsForEndDate}
                />
              </div>

              {/* From Airport */}
              <div className={cx("pt-form-group")}>
                <label className="pt-label" htmlFor="fromAirport">
                  <TooltipLabel label="From Airport" required tooltip="Select the departure airport" />
                </label>
                <Suggest
                  name="FromAirport"
                  inputProps={
                    edit && !suggestEdited
                      ? {
                          value: fromAirport ? fromAirport : "",
                          onChange: e => {
                            this.setState({ suggestEdited: true });
                          }
                        }
                      : {}
                  }
                  ref={ref => (this.airportFromSuggest = ref)}
                  items={airportsArray}
                  popoverProps={{ className: s.suggester }}
                  itemRenderer={this.renderMenuItem}
                  className="pt-fill"
                  onItemSelect={this.addFromAirport}
                  itemPredicate={this.filterAirport}
                  resetOnSelect
                  inputValueRenderer={({ full_name }) => `${full_name}`}
                  noResults={this.state.isLoading ? <LoadingSpinner /> : NoResults}
                />
              </div>

              {/* To Airport */}
              <div className={cx("pt-form-group")}>
                <label className="pt-label" htmlFor="toAirport">
                  <TooltipLabel label="To Airport" required tooltip="Select the arrival airport" />
                </label>
                <Suggest
                  name="ToAirport"
                  inputProps={
                    edit && !suggestEdited
                      ? {
                          value: toAirport ? toAirport : "",
                          onChange: e => {
                            this.setState({ suggestEdited: true });
                          }
                        }
                      : {}
                  }
                  ref={ref => (this.airportToSuggest = ref)}
                  items={airportsArray}
                  popoverProps={{ className: s.suggester }}
                  itemRenderer={this.renderMenuItem}
                  className="pt-fill"
                  onItemSelect={this.addToAirport}
                  itemPredicate={this.filterAirport}
                  resetOnSelect
                  inputValueRenderer={({ full_name }) => `${full_name}`}
                  noResults={this.state.isLoading ? <LoadingSpinner /> : NoResults}
                />
              </div>

              {/* Price */}
              <div className="pt-form-group">
                <label className="pt-label" htmlFor="empty_leg_price">
                  <span>Price</span>
                  <div className="pt-input-group">
                    <input
                      type="price"
                      name="price"
                      value={this.state.emptyLeg.price}
                      className="pt-input pt-fill"
                      id="empty_leg_price"
                      onChange={this.handlePriceChange}
                      placeholder="Price"
                    />
                  </div>
                </label>
              </div>

              {/* Featured */}
              <div className="pt-form-group">
                <Checkbox checked={emptyLeg.featured} label="Featured" onChange={this.handleFeaturedChange} />
              </div>

              {/* Published */}
              <div className="pt-form-group">
                <Checkbox checked={emptyLeg.published} label="Publish" onChange={this.handlePublishedChange} />
              </div>
            </div>
          </form>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const availableLocales = state.runtime.availableLocales;
  const languages = _.keyBy(Object.values(availableLocales), "id");
  const defaultLanguage = availableLocales[state.runtime.defaultLocale];
  return {
    languages,
    defaultLanguage
  };
};

export default connect(mapStateToProps, { addEmptyLeg })(withStyles(s)(EmptyLeg));
