import React from "react";
import ReactDOM from "react-dom";
import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Destinations.css";
import Sidebar from "../../components/Sidebar";
import { Menu, Switch, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";
import Breadcrumbs from "../../components/Breadcrumbs";
import Filter from "../../components/Filter";
import Editor from "../../components/Editor";
import Action from "../../components/Action";
import Page from "../../components/Page";
import cx from "classnames";
import { connect } from "react-redux";
import { addDestination, editDestination } from "admin/actions/destinations";
import history from "core/history";
// import UserInspectPanel from './UserInspectPanel';
import { random, times } from "lodash";
import { Suggest } from "@blueprintjs/labs";
import _ from "lodash";
import { editorStateToJSON, editorStateFromRaw } from "megadraft/lib/utils";


const Collapsed = ({ saveDestination, cancel }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-confirm"
      onClick={e => saveDestination}
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

class Destination extends React.Component {
  refHandlers = {
    toaster: ref => this.toaster = ref,
  };

  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const language = _.find(this.props.languagesById, { locale: this.props.defaultLocale });

    const content = (this.props.edit) ? JSON.parse(this.props.destination.body) : null;

    const destination = {
      body: editorStateFromRaw(content),
      title: (this.props.edit) ? this.props.destination.title : "",
      summary: (this.props.edit) ? this.props.destination.summary : "",
      city_id: (this.props.edit) ? this.props.destination.city.sfid : undefined,
      language_id: (this.props.edit) ? this.props.destination.language : language.id,
      published: (this.props.edit) ? this.props.destination.published : false,
    };

    this.state = {
      destination,
      baseLang: language.id,
      duplicate: false,
    };

    this.originalState = this.state;
  }

  editDestination = async () => {
    this.toaster.clear();

    const { destination } = this.state;
    const { body } = this.state.destination;
    const content = editorStateToJSON(body);

    const stateDestination = Object.assign({}, destination, { body: content });
    const editedDestination = await this.props.editDestination(this.props.id, stateDestination);

    // check for errors
    this.toaster.show(this.props.errors ? {
      message: this.props.errors.graphQLErrors[0].message || null,
      timeout: 3000,
      intent: Intent.DANGER,
      iconName: "pt-icon-error",
    } : {
      message: "Destination edited successfully!",
      timeout: 3000,
      intent: Intent.SUCCESS,
      iconName: "pt-icon-success",
      action: {
        text: "Ok",
        onClick: this.cancel,
      },
    });
  }

  saveDestination = async () => {
    const { destination } = this.state;
    const { body } = this.state.destination;
    const content = editorStateToJSON(body);

    this.toaster.clear();

    const stateDestination = Object.assign({}, destination, { body: content });
    const newDestination = await this.props.addDestination(stateDestination, this.state.duplicate);

    // check for errors
    this.toaster.show(this.props.errors ? {
      message: this.props.errors.graphQLErrors[0].message || null,
      timeout: 3000,
      intent: Intent.DANGER,
      iconName: "pt-icon-error",
    } : {
      message: "Destination created successfully!",
      timeout: 3000,
      intent: Intent.SUCCESS,
      iconName: "pt-icon-success",
      action: {
        text: "Ok",
        onClick: this.cancel,
      },
    });

    if (newDestination.response.result.destinations) {
      history.push(`/destinations/edit/${newDestination.response.result.destinations[0]}`);
    }
  }

  cancel = () => {    
    history.push("/destinations");
  }

  onChange = (editorState) => {
    this.setState({
      destination: {
        ...this.state.destination,
        body: editorState,
      },
    });
  }

  addedFile = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = ReactDOM.findDOMNode(this.refs.file).files[0];

    reader.onerror = error => console.log("Error: ", error);

    reader.onloadend = () =>
      this.setState({
        image: reader.result,
        file,
      });

    reader.readAsDataURL(file);
  }

  changeLang = (e) => {
    this.setState({
      ...this.state,
      destination: {
        ...this.state.destination,
        language_id: e.target.value,
      },
    });
  }

  handleChange = (e) => {
    this.setState({
      destination: {
        ...this.state.destination,
        [e.target.name]: e.target.value,
      },
    });
  }

  filterCity = (query, item, index) => (item.name.toLowerCase()).indexOf(query.toLowerCase()) >= 0


  clearCity = () => {
    this.setState({
      destination: {
        ...this.state.destination,
        city_id: undefined,
      },
    });
  }

  addCity = ({ sfid }) => {
    this.setState({
      destination: {
        ...this.state.destination,
        city_id: sfid,
      },
    });
  }

  toggleDuplicate = () => {
    this.setState({
      duplicate: !this.state.duplicate,
    });
  }


  render() {
    const {
      edit, languages, citiesById, currentRoute, isLoading, citiesArray,
    } = this.props;
    const { baseLang } = this.state;

    const breadcrumbs = <Breadcrumbs route={currentRoute} />;

    const actions = [
      <Action key="action-preview" icon="pt-icon-eye-open" intent="pt-intent-primary" label="Preview" />,
      <Action key="action-confirm" icon="pt-icon-confirm" loading={isLoading} intent="pt-intent-success" action={(this.props.edit) ? this.editDestination : this.saveDestination} label="Save" />,
      <Action key="action-cancel" icon="pt-icon-undo" intent="pt-intent-default" action={this.cancel} label="Close" />,
    ];

    const actionPopover = <Collapsed save={this.saveDestination} cancel={this.cancel} />;

    const renderMenuItem = ({ handleClick, item, isActive }) => (<MenuItem
      className={cx(isActive ? s.isActive : null)}
      key={item.sfid}
      text={item.name}
      label={<div><span className={s.labelCountry}>({item.country.name})</span><span className={`famfamfam-flags ${item.country.countryCode}`} /></div>}
      onClick={handleClick}
    />);

    return (
      <Page actions={actions} actionPopover={actionPopover} breadcrumbs={breadcrumbs}>
        <div className={s.destination}>

          <Toaster position={Position.TOP} ref={this.refHandlers.toaster} />

          <Editor onChange={this.onChange} value={this.state.destination.body} />

          <Sidebar>

            <form onSubmit={e => e.preventDefault()} className="content">

              <div className="header">
                <h4>{ (this.props.edit) ? "Edit Destination" : "Add Destination" }</h4>
                <div className="pt-select pt-inline">
                  <select className={cx((this.state.destination.language_id !== this.state.baseLang) ? s.notDefaultLang : null, s.langPicker, "pt-fill")} value={this.state.destination.language_id} name="language_id" onChange={this.changeLang}>
                    { languages.map(lang => <option key={`role-${lang.id}`} value={lang.id}>{lang.locale}</option>) }
                  </select>
                </div>
              </div>

              <div className="body">

                <div className="pt-form-group">
                  <label className="pt-label">
                    Title
                    <span className="pt-text-muted">(required)</span>
                    <input name="title" onChange={this.handleChange} className="pt-bold pt-input pt-large pt-fill" type="text" value={this.state.destination.title} placeholder="Title" dir="auto" />
                  </label>
                </div>

                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="description">
                    <span>Summary</span>
                    <textarea name="summary" className="pt-input pt-fill" id="description" value={this.state.destination.summary} onChange={this.handleChange} placeholder="Write a litle summary" />
                  </label>
                </div>

                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="city">
                    City
                    <span className="pt-text-muted">(required)</span>
                  </label>
                  <Suggest
                    name="city"
                    inputProps={(this.props.edit) ? {
                      onKeyDown: this.clearCity,
                      value: (this.state.destination.city_id) ? `${citiesById[this.state.destination.city_id].name} - (${citiesById[this.state.destination.city_id].country.name})` : "",
                    } : {}}
                    openOnKeyDown
                    items={citiesArray}
                    itemRenderer={renderMenuItem}
                    onItemSelect={this.addCity}
                    resetOnSelect
                    itemPredicate={this.filterCity}
                    inputValueRenderer={({ name, country }) => `${name} - (${country.name})`}
                    noResults={<MenuItem
                      iconName="pt-icon-issue"
                      text="No Results"
                      intent={Intent.WARNING}
                    />}
                  />
                </div>

                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="files">
                    Gallery
                  </label>
                  <div className={s["avatar-placeholder"]}>

                    <div className={cx(s["avatar-upload"], (this.state.image) ? s.isFilled : null)}>
                      { this.state.image ? <img src={this.state.image} /> : null }
                      <input type="file" ref="file" id="files" onChange={this.addedFile} multiple accept="image/*" />
                    </div>

                    <span className={s["avatar-label"]}>Drop here or click to choose the destination picture</span>

                  </div>

                </div>

                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="published">
                    <span>State</span>
                    <div className="pt-select pt-inline">
                      <select className={cx("pt-fill")} value={this.state.destination.published} name="published" onChange={this.handleChange}>
                        <option key="state-draft" value={false}>Draft </option>
                        <option key="state-published" value>Publish ✔</option>
                      </select>
                    </div>
                  </label>
                </div>

                {
                  (!this.props.edit) ?
                    <div className="pt-card pt-elevation-0">
                      <Switch label="Duplicate for other languages" name="duplicate" checked={this.state.duplicate} onChange={this.toggleDuplicate} />
                    </div>
                  : null
                }

              </div>

            </form>

          </Sidebar>

        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  defaultLocale: state.intl.defaultLocale,
  languagesById: state.languages.byId,
  languages: state.languages.ids.map(id => state.languages.byId[id]) || [],
  citiesArray: state.cities.ids.map(id => state.cities.byId[id]) || [],
  citiesById: state.cities.byId,
  isLoading: state.destinations.isLoading,
  errors: state.destinations.errors,
  destination: state.destinations.byId[ownProps.id] || null,
});


export default connect(mapStateToProps, { addDestination, editDestination })(withStyles(s)(Destination));

