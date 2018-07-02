import React from "react";
import ReactDOM from "react-dom";
import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Fleet.css";
import { Menu, Checkbox, Switch, Button, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position, NumericInput, Keys } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/labs";
import Breadcrumbs from "admin/components/Breadcrumbs";
import Filter from "admin/components/Filter";
import Sidebar from "admin/components/Sidebar";

import Action from "admin/components/Action";
import Page from "admin/components/Page";
import TooltipLabel from "admin/components/TooltipLabel";

import cx from "classnames";
import { connect } from "react-redux";
import { addAircraft, editAircraft } from "admin/actions/fleets";
import history from "core/history";
import fetchModels from "./fetchSFAircraftModels.graphql";
import { random, times } from "lodash";
import _ from "lodash";

const Collapsed = ({ saveAircraft, cancel }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-confirm"
      onClick={e => saveAircraft}
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

class Aircraft extends React.Component {
  refHandlers = {
    toaster: ref => this.toaster = ref,
    modelInput: ref => this.modelInput = ref.input,
    manufacturerInput: ref => this.manufacturerInput = ref.input,
    categoryInput: ref => this.categoryInput = ref.input,
  };

  static propTypes = {
  };

  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const aircraft = {
      body: null,
      details: {
        cabin_height: 0,
        cabin_width: 0,
        cabin_length: 0,
        seats: 0,
        luggage_small: 0,
        luggage_standard: 0,
        luggage_m3: 0,
        speed: 0,
        range: 0,
      },
      model_id: undefined,
      category_id: undefined,
      manufacturer_id: undefined,
      order: "",
      featured: "",
      published: "",
    };

    this.aircrafts = [];
    this.state = {
      aircraft,
      models: [],
      isLoading: false,
    };

    this.originalState = this.state;
  }

  editAircraft = async () => {
    this.toaster.clear();

    const aircraft = {
      body: this.state.body,
      details: this.state.details,
      order: this.state.order,
      featured: this.state.featured,
      published: this.state.published,
    };

    Object.keys(aircraft).forEach((field) => {
      if (this.props.aircraft[field] === aircraft[field]) {
        delete aircraft[field];
      }
    });

    if (Object.keys(aircraft).length) {
      await this.props.editAircraft(this.props.aircraft.id, aircraft);

      // check for errors
      this.toaster.show(this.props.errors ? {
        message: this.props.errors.graphQLErrors[0].message || null,
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error",
      } : {
        message: "Aircraft edited successfully!",
        timeout: 3000,
        intent: Intent.SUCCESS,
        iconName: "pt-icon-success",
        action: {
          text: "Ok",
          onClick: this.cancel,
        },
      });
    } else {
      return this.toaster.show({
        message: "You have to change something!",
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error",
      });
    }
  }

  saveAircraft = async () => {
    this.toaster.clear();

    const aircraft = {
      body: this.state.body,
      details: this.state.details,
      order: this.state.order,
      featured: this.state.featured,
      published: this.state.published,
    };

    Object.keys(aircraft).forEach((field) => {
      if (field === "name" && !aircraft[field]) {
        this.toaster.show({
          message: `${_.capitalize(field)} is required!`,
          timeout: 3000,
          intent: Intent.DANGER,
          iconName: "pt-icon-error",
        });
      }
    });

    await this.props.addAircraft(aircraft);

    this.setState(this.originalState);

    // check for errors
    this.toaster.show(this.props.errors ? {
      message: this.props.errors.graphQLErrors[0].message || null,
      timeout: 3000,
      intent: Intent.DANGER,
      iconName: "pt-icon-error",
    } : {
      message: "Aircraftcreated successfully!",
      timeout: 3000,
      intent: Intent.SUCCESS,
      iconName: "pt-icon-success",
      action: {
        text: "Ok",
        onClick: this.cancel,
      },
    });
  }

  cancel = () => {
    if (!history.length) {
      history.push("/website/aircrafts");
    } else {
      history.goBack();
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }


  handleChangeDetails = (e) => {
    this.setState({
      details: {
        ...this.state.details,
        [e.target.name]: e.target.value,
      },
    });
  }

  addModel = ({ sfid, category, manufacturer }) => {
    this.setState({
      aircraft: {
        ...this.state.aircraft,
        model_id: sfid,
        category_id: category,
        manufacturer_id: manufacturer,
      },
    });
  }

  filterModel = (query, item, index) => {
    const { categoriesById, manufacturersById } = this.props;
    const entry = _.toLower(`${item.manufacturer && manufacturersById[item.manufacturer].name} ${item.name} - ${item.category && categoriesById[item.category].name}`);
    const loweredQuery = query.toLowerCase();
    return String(entry).includes(loweredQuery);
  }

  renderModelItem = ({ handleClick, item, isActive }) => {
    const { categoriesById, manufacturersById } = this.props;
    return (
      <MenuItem
        className={cx(isActive ? s.isActive : null)}
        key={item.sfid}
        text={`${item.manufacturer && manufacturersById[item.manufacturer].name} ${item.name}`}
        label={item.category && categoriesById[item.category].name}
        onClick={handleClick}
      />
    );
  }

  renderModelItemValue = (item) => {
    const { categoriesById, manufacturersById } = this.props;
    return `${item.manufacturer && manufacturersById[item.manufacturer].name} ${item.name}`;
  }

  componentDidMount() {
    console.log(this.manufacturerInput);
    this.modelInput.placeholder = "Search for Aircraft Models ...";
  }


  render() {
    const {
      edit, models, categories, manufacturers, modelsById, categoriesById, manufacturersById, currentRoute, isLoading,
    } = this.props;

    const breadcrumbs = <Breadcrumbs route={currentRoute} />;

    const actions = [
      <Action key="action-confirm" icon="pt-icon-confirm" loading={isLoading} intent="pt-intent-success" action={(this.props.edit) ? this.editAircraft : this.saveAircraft} label="Save" />,
      <Action key="action-cancel" icon="pt-icon-undo" intent="pt-intent-default" action={this.cancel} label="Close" />,
    ];

    const actionPopover = <Collapsed save={this.saveAircraft} cancel={this.cancel} />;

    const Loading = (
      <MenuItem
        className={s.menuloader}
        text="Fetching Models ..."
        label={<Button type="button" className={cx("pt-button pt-fill pt-minimal")} loading />}
      />
    );

    const NoResults = (
      <MenuItem
        iconName="pt-icon-issue"
        text="No Results"
        intent={Intent.WARNING}
      />
    );

    return (
      <Page actions={actions} actionPopover={actionPopover} breadcrumbs={breadcrumbs}>
        <div className={s.aircraft}>

          <Toaster position={Position.TOP} ref={this.refHandlers.toaster} />

          <form onSubmit={e => e.preventDefault()} className={s["aircraft-form"]}>

            <div className={s["lj-form"]}>

              <div className="pt-form-group">
                <h3 style={{ marginBottom: "20px" }}>Aircraft Model</h3>
                <div className="pt-form-group pt-inline">
                  <div className="pt-form-group" style={{ flex: "1", marginRight: "10px" }}>
                    <label className="pt-label">
                      <TooltipLabel required label="Model" tooltip="Please select a aircraft model living on salesforce, in order to populate the properties" />
                    </label>
                    <Suggest
                      ref={this.refHandlers.modelInput}
                      name="model"
                      items={models}
                      popoverProps={{ className: s.suggester }}
                      itemRenderer={this.renderModelItem}
                      className="pt-fill"
                      value={this.state.aircraft.model_id}
                      onItemSelect={this.addModel}
                      itemPredicate={this.filterModel}
                      resetOnSelect
                      inputValueRenderer={this.renderModelItemValue}
                      noResults={(this.state.isLoading) ? Loading : NoResults}
                    />
                  </div>
                  <div className="pt-form-group" style={{ flex: "1", marginRight: "10px" }}>
                    <label className="pt-label">
                      <TooltipLabel required label="Manufacturer" tooltip="Manually change the aircraft manufacturer (will affect only the website), by default it will be in sync with salesforce manufacturers" />
                    </label>
                    <div className="pt-input-group">
                      <input type="text" readOnly className="pt-input pt-disabled pt-fill" value={(this.state.aircraft.manufacturer_id) ? manufacturersById[this.state.aircraft.manufacturer_id].name : ""} />
                    </div>
                  </div>
                  <div className="pt-form-group" style={{ flex: "1" }}>
                    <label className="pt-label" >
                      <TooltipLabel required label="Category" tooltip="Manually change the aircraft category (will affect only the website), by default it will be in sync with salesforce categories" />
                    </label>
                    <div className="pt-input-group">
                      <input type="text" readOnly className="pt-input pt-disabled pt-fill" value={(this.state.aircraft.category_id) ? categoriesById[this.state.aircraft.category_id].name : ""} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-form-group">
                <h3 style={{ marginTop: "25px", marginBottom: "20px" }}>Aircraft Details</h3>
                <div className="pt-form-group">
                  <h5 style={{ marginTop: "15px", marginBottom: "10px" }}>Cabin Size</h5>
                  <div className="pt-form-group pt-inline">
                    <div className="pt-form-group" style={{ marginRight: "10px" }}>
                      <label className="pt-label" style={{ flex: "1" }}>
                        Cabin Height
                      </label>
                      <NumericInput buttonPosition="right" min="0" name="cabin_height" onChange={this.handleChangeDetails} value={this.state.aircraft.details.cabin_height} placeholder="Height" dir="auto" />
                    </div>
                    <div className="pt-form-group" style={{ marginRight: "10px" }}>
                      <label className="pt-label" style={{ flex: "1" }}>
                        Cabin Width
                      </label>
                      <NumericInput name="cabin_width" onChange={this.handleChangeDetails} buttonPosition="right" min="0" value={this.state.aircraft.details.cabin_width} placeholder="Width" dir="auto" />
                    </div>
                    <div className="pt-form-group" style={{ marginRight: "10px" }}>
                      <label className="pt-label" style={{ flex: "1" }}>
                        Cabin Length
                      </label>
                      <NumericInput name="cabin_length" onChange={this.handleChangeDetails} buttonPosition="right" min="0" value={this.state.aircraft.details.cabin_width} placeholder="Width" dir="auto" />
                    </div>
                  </div>
                </div>
                <div className="pt-form-group">
                  <h5 style={{ marginTop: "15px", marginBottom: "10px" }}>Luggage &amp; Seats</h5>
                  <div className="pt-form-group pt-inline">
                    <div className="pt-form-group" style={{ marginRight: "10px" }}>
                      <label className="pt-label" style={{ flex: "1" }}>
                        Passenger Seats
                      </label>
                      <NumericInput name="passengerSeats" onChange={this.handleChangeDetails} buttonPosition="right" min="0" value={this.state.aircraft.seats} placeholder="Passanger Seats" dir="auto" />
                    </div>
                    <div className="pt-form-group" style={{ marginRight: "10px" }}>
                      <label className="pt-label" style={{ flex: "1" }}>
                        Luggage Small
                      </label>
                      <NumericInput name="luggageSmall" onChange={this.handleChangeDetails} buttonPosition="right" min="0" value={this.state.aircraft.luggage_small} placeholder="Luggage Small" dir="auto" />
                    </div>
                    <div className="pt-form-group" style={{ marginRight: "10px" }}>
                      <label className="pt-label" style={{ flex: "1" }}>
                      Luggage Standard
                      </label>
                      <NumericInput name="luggageStd" onChange={this.handleChangeDetails} buttonPosition="right" min="0" value={this.state.aircraft.luggage_standard} placeholder="Luggage Standard" dir="auto" />
                    </div>
                    <div className="pt-form-group" style={{ marginRight: "10px" }}>
                      <label className="pt-label" style={{ flex: "1" }}>
                      Luggage m<sup>3</sup>
                      </label>
                      <NumericInput name="luggageStd" onChange={this.handleChangeDetails} buttonPosition="right" min="0" value={this.state.aircraft.luggage_m3} placeholder="Luggage cube meters" dir="auto" />
                    </div>
                  </div>
                </div>

                <div className="pt-form group">
                  <h5 style={{ marginTop: "15px", marginBottom: "10px" }}>Aircraft Specs</h5>
                  <div className="pt-form-group pt-inline">
                    <div className="pt-form-group" style={{ marginRight: "10px" }}>
                      <label className="pt-label" style={{ flex: "1" }}>
                        Speed <sup>(m/s)</sup>
                      </label>
                      <NumericInput name="speed" onChange={this.handleChangeDetails} buttonPosition="right" min="0" value={this.state.aircraft.speed} placeholder="Aircraft Speed" dir="auto" />
                    </div>
                    <div className="pt-form-group" style={{ marginRight: "10px" }}>
                      <label className="pt-label" style={{ flex: "1" }}>
                        Range <sup>(nm)</sup>
                      </label>
                      <NumericInput name="range" onChange={this.handleChangeDetails} buttonPosition="right" min="0" value={this.state.aircraft.range} placeholder="Aircraft Range" dir="auto" />
                    </div>
                  </div>
                </div>

              </div>

            </div>

            <Sidebar width="33" fixed>

              <div className={s["avatar-placeholder"]}>
                <div className="pt-form-group">
                  <Checkbox checked={this.state.isEnabled} label="Featured" onChange={this.handleChange} className="pt-align-right" />
                </div>
                <div className="pt-form-group">
                  <Checkbox checked={this.state.isEnabled} label="Publish" onChange={this.handleChange} className="pt-align-right" />
                </div>
              </div>

            </Sidebar>
          </form>


        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { models, categories, manufacturers } = state.fleet;

  return {
    categories: categories.ids.map(id => categories.byId[id]),
    categoriesById: categories.byId,
    manufacturers: manufacturers.ids.map(id => manufacturers.byId[id]),
    manufacturersById: manufacturers.byId,
    models: models.ids.map(id => models.byId[id]),
    modelsById: models.byId,
  };
};


export default connect(mapStateToProps, { addAircraft, editAircraft })(withStyles(s)(Aircraft));
