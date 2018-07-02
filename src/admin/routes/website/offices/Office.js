import React from "react";
import ReactDOM from "react-dom";
import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Offices.css";
import { Menu, Switch, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";
import Breadcrumbs from "admin/components/Breadcrumbs";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import cx from "classnames";
import { connect } from "react-redux";
import { addOffice, editOffice } from "admin/actions/offices";
import history from "core/history";
// import UserInspectPanel from './UserInspectPanel';
import { random, times } from "lodash";

const GOOGLE_API_KEY = "AIzaSyDH7XYmx1EiTYlM7GSkqS4FsDetFjr5328";
const Collapsed = ({ saveOffice, cancel }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-confirm"
      onClick={e => saveOffice}
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

class Office extends React.Component {
  refHandlers = {
    toaster: ref => this.toaster = ref,
  };

  static propTypes = {
  };

  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    console.log("OFFICE PROPS => ", this);

    const state = {
      name: "",
      address: "",
      postal_code: "",
      location: "",
      country: "",
      phone: "",
      alt_phone: "",
      fax: "",
      email: "",
      coordinates: {},
    };

    this.state = (this.props.edit) ? Object.assign(state, this.props.office) : state;

    this.originalState = this.state;
  }

  editOffice = async () => {
    this.toaster.clear();

    const office = {
      name: this.state.name,
      address: this.state.address,
      postal_code: this.state.postal_code,
      location: this.state.location,
      country: this.state.country,
      phone: this.state.phone,
      alt_phone: this.state.alt_phone,
      fax: this.state.fax,
      email: this.state.email,
      coordinates: this.state.coordinates,
    };

    Object.keys(office).forEach((field) => {
      if (this.props.office[field] === office[field]) {
        delete office[field];
      }
    });

    if (Object.keys(office).length) {
      await this.props.editOffice(this.props.office.id, office);

      // check for errors
      this.toaster.show(this.props.errors ? {
        message: this.props.errors.graphQLErrors[0].message || null,
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error",
      } : {
        message: "Office edited successfully!",
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

  saveOffice = async () => {
    this.toaster.clear();

    const office = {
      name: this.state.name,
      address: this.state.address,
      postal_code: this.state.postal_code,
      location: this.state.location,
      country: this.state.country,
      phone: this.state.phone,
      alt_phone: this.state.alt_phone,
      fax: this.state.fax,
      email: this.state.email,
      coordinates: this.state.coordinates,
    };

    Object.keys(office).forEach((field) => {
      if (field === "name" && !office[field]) {
        this.toaster.show({
          message: `${_.capitalize(field)} is required!`,
          timeout: 3000,
          intent: Intent.DANGER,
          iconName: "pt-icon-error",
        });
      }
    });

    await this.props.addOffice(office);

    this.setState(this.originalState);

    // check for errors
    this.toaster.show(this.props.errors ? {
      message: this.props.errors.graphQLErrors[0].message || null,
      timeout: 3000,
      intent: Intent.DANGER,
      iconName: "pt-icon-error",
    } : {
      message: "Office created successfully!",
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
      history.push("/offices");
    } else {
      history.goBack();
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }


  getCoordinates = (e) => {
    e.preventDefault();
    const address = encodeURI(this.state.address);
    const city = encodeURI(this.state.location);
    const country = encodeURI(this.state.country);
    const { fetch } = this.context;

    const coordinates = fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}+${city}+${country}&key=${GOOGLE_API_KEY}`, { timeout: 10000 })
      .then(async response => response.json())
      .then(({ results }) => {
        if (results.length) {
          this.setState({ coordinates: results[0].geometry.location });
        }
      });

    // console.log(coordinates);
  }


  render() {
    const { edit, currentRoute, isLoading } = this.props;

    const breadcrumbs = <Breadcrumbs route={currentRoute} />;

    const actions = [
      <Action key="action-confirm" icon="pt-icon-confirm" loading={isLoading} intent="pt-intent-success" action={(this.props.edit) ? this.editOffice : this.saveOffice} label="Save" />,
      <Action key="action-cancel" icon="pt-icon-undo" intent="pt-intent-default" action={this.cancel} label="Close" />,
    ];

    const actionPopover = <Collapsed save={this.saveOffice} cancel={this.cancel} />;

    return (
      <Page actions={actions} actionPopover={actionPopover} breadcrumbs={breadcrumbs}>
        <div className={s.office}>

          <Toaster position={Position.TOP} ref={this.refHandlers.toaster} />

          <form onSubmit={e => e.preventDefault()} className={s["office-form"]}>

            <div className={s["lj-form"]}>
              <div className="pt-form-group">
                <label className="pt-label" style={{ flex: "1" }}>
                  Name
                  <span className="pt-text-muted">(required)</span>
                  <input name="name" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.name} placeholder="Name" dir="auto" />
                </label>
              </div>

              <div className="pt-form-group">
                <label className="pt-label" style={{ flex: "1" }}>
                  Address
                  <span className="pt-text-muted">(required)</span>
                  <input name="address" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.address} placeholder="Address" dir="auto" />
                </label>
              </div>

              <div className="pt-form-group pt-inline">
                <label className="pt-label" style={{ flex: "1" }}>
                  Location
                  <span className="pt-text-muted">(required)</span>
                  <input name="location" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.location} placeholder="City" dir="auto" />
                </label>

                <label className="pt-label" style={{ flex: "1", margin: "0" }}>
                  Zip Code
                  <span className="pt-text-muted">(required)</span>
                  <input name="postal_code" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.postal_code} placeholder="Postal Code" dir="auto" />
                </label>
              </div>

              <div className="pt-form-group pt-inline">
                <label className="pt-label" style={{ flex: "1" }}>
                  Country
                  <span className="pt-text-muted">(required)</span>
                  <input name="country" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.country} placeholder="Country" dir="auto" onBlur={this.getCoordinates} />
                </label>
                <label className="pt-label" style={{ flex: "1", margin: "0" }}>
                  E-mail
                  <span className="pt-text-muted">(required)</span>
                  <input name="email" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.email} placeholder="Email" dir="auto" />
                </label>
              </div>
              <div className="pt-form-group pt-inline">
                <label className="pt-label" style={{ flex: "1" }}>
                  Phone 1
                  <span className="pt-text-muted">(required)</span>
                  <input name="phone" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.phone} placeholder="Phone 1" dir="auto" />
                </label>
                <label className="pt-label" style={{ flex: "1" }}>
                  Phone 2
                  <input name="alt_phone" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.alt_phone} placeholder="Phone 2" dir="auto" />
                </label>
                <label className="pt-label" style={{ flex: "1", margin: "0" }}>
                  Fax
                  <input name="fax" onChange={this.handleChange} className="pt-input pt-fill" type="text" value={this.state.fax} placeholder="Fax" dir="auto" />
                </label>
              </div>
            </div>
          </form>

        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.offices.isLoading,
  errors: state.offices.errors,
  office: state.offices.byId[ownProps.id] || null,
});


export default connect(mapStateToProps, { addOffice, editOffice })(withStyles(s)(Office));

