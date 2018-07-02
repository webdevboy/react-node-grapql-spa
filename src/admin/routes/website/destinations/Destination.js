import React from "react";
import ReactDOM from "react-dom";
import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Destinations.css";
import Sidebar from "admin/components/Sidebar";
import { Menu, Switch, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";
import Breadcrumbs from "admin/components/Breadcrumbs";
import TooltipLabel from "admin/components/TooltipLabel";
import Filter from "admin/components/Filter";
import Editor from "admin/components/Editor";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import DestinationPreview from "admin/components/Destinations/DestinationPreview";
import cx from "classnames";
import { connect } from "react-redux";
import { addDestination, editDestination } from "admin/actions/destinations";
import history from "core/history";
// import UserInspectPanel from './UserInspectPanel';
import { random, times } from "lodash";
import { Suggest } from "@blueprintjs/labs";
import _ from "lodash";
import { editorStateToJSON, editorStateFromRaw } from "megadraft/lib/utils";

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

    const {
      edit, translate, params, duplicate, destination, langId, defaultLocale, baseLang,
    } = this.props;

    let newDestination = {
      body: null,
      title: "",
      summary: "",
      city_id: undefined,
      language_id: baseLang,
      published: false,
    };

    if (edit) {
      newDestination = {
        ...newDestination,
        body: destination.body,
        title: destination.title,
        summary: destination.summary,
        published: destination.published,
        language_id: destination.language,
        city_id: destination.city.sfid,
      };
    }

    if (translate) {
      newDestination = {
        ...newDestination,
        city_id: destination.city.sfid,
        language_id: langId,
        published: false,
        destination_id: destination.destination_id,
      };

      if (duplicate) {
        newDestination = {
          ...newDestination,
          body: destination.body,
          title: destination.title,
          summary: destination.summary,
        };
      }
    }

    this.state = {
      destination: newDestination,
      duplicate: false,
      previewOpened: false
    };

    this.originalState = this.state;
  }

  preview = () => {
    const { destination } = this.state;
    this.destinationpreview.openPreview(destination);
  };

  edit = async () => {
    const { destination } = this.state;
    this.toaster.clear();

    const edited = await this.props.editDestination(this.props.id, destination);

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

  create = async () => {
    const { destination } = this.state;
    this.toaster.clear();

    const item = await this.props.addDestination(destination, this.state.duplicate);

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

    if (item.response.result.destinations) {
      history.push(`/website/destinations/edit/${item.response.result.destinations[0]}`);
    }
  }

  cancel = () => {
    history.push("/website/destinations");
  }

  onEditorChange = (editorState) => {
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

  renderMenuItem = ({ handleClick, item, isActive }) => (<MenuItem
    className={cx(isActive ? s.isActive : null)}
    key={item.sfid}
    text={item.name}
    label={<div><span className={s.labelCountry}>({item.country.name})</span><span className={`famfamfam-flags ${item.country.countryCode}`} /></div>}
    onClick={handleClick}
  />)

  render() {
    const {
      edit, languages, currentRoute, citiesById, isLoading, citiesArray, baseLang,
    } = this.props;

    const breadcrumbs = <Breadcrumbs route={currentRoute} />;

    const actions = [
      <Action key="action-preview" icon="pt-icon-eye-open" intent="pt-intent-primary" label="Preview" action={(this.preview)}/>,
      <Action key="action-confirm" icon="pt-icon-confirm" loading={isLoading} intent="pt-intent-success" action={(this.props.edit) ? this.edit : this.create} label="Save" />,
      <Action key="action-cancel" icon="pt-icon-undo" intent="pt-intent-default" action={this.cancel} label="Close" />,
    ];

    const langOpts = {};
    if (this.props.edit || this.props.translate) {
      langOpts.disabled = "disabled";
    }

    return (
      <Page actions={actions} breadcrumbs={breadcrumbs}>
        <div className={s.destination}>
          <DestinationPreview onRef={ref => (this.destinationpreview = ref)} />
          <Toaster position={Position.TOP} ref={this.refHandlers.toaster} />

          <Editor onChange={this.onEditorChange} value={this.state.destination.body} />

          <Sidebar expandable float>

            <form onSubmit={e => e.preventDefault()} className="content">

              <div className="header">
                <h4>{ (this.props.edit) ? "Edit Destination" : "Add Destination" }</h4>
                <div className="pt-select pt-inline">
                  <select {...langOpts} className={cx((this.state.destination.language_id !== baseLang) ? s.notDefaultLang : null, s.langPicker, "pt-fill")} value={this.state.destination.language_id} name="language_id" onChange={this.changeLang}>
                    { languages.map(lang => <option key={`role-${lang.id}`} value={lang.id}>{lang.locale}</option>) }
                  </select>
                </div>
              </div>

              <div className="body">

                <div className="pt-form-group">
                  <label className="pt-label">
                    <TooltipLabel label="Title" required tooltip="Destination title, Maximum length of 80 Characters" />
                    <input name="title" onChange={this.handleChange} className="pt-bold pt-input pt-large pt-fill" type="text" value={this.state.destination.title} placeholder="Title" dir="auto" />
                  </label>
                </div>

                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="description">
                    <TooltipLabel label="Summary" tooltip="A little summary about the destination, this might appear as a title when hovering a link or a component targeting this destination, also this will be used as meta description for the destination page. Maximum length of 160 Characters" />
                    <textarea name="summary" className="pt-input pt-fill" id="description" value={this.state.destination.summary} onChange={this.handleChange} placeholder="Write a litle summary" />
                  </label>
                </div>

                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="city">
                    <TooltipLabel label="City" required tooltip="Select a city which this destination belongs to." />
                  </label>
                  <Suggest
                    name="city"
                    inputProps={(this.props.edit || this.props.translate) ? {
                      readOnly: "readOnly",
                      value: (this.state.destination.city_id) ? `${citiesById[this.state.destination.city_id].name} - (${citiesById[this.state.destination.city_id].country.name})` : "",
                    } : {}}
                    openOnKeyDown
                    items={citiesArray}
                    itemRenderer={this.renderMenuItem}
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
                        <option key="state-draft" value={false}>Draft ✖</option>
                        <option key="state-published" value>Publish ✔</option>
                      </select>
                    </div>
                  </label>
                </div>

                {
                  (!(this.props.edit || this.props.translate)) ?
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

const mapStateToProps = (state, ownProps) => {
  // gets the defautlLocale languages.id
  // locale code => language.id
  const languagesById = state.languages.byId;
  const languages = Object(state.languages.ids) || [];
  const defaultLocale = state.intl.locale || 'en';
  const locale = _.find(languages, { locale: defaultLocale });

  const citiesIds = state.cities.ids;
  const citiesById = state.cities.byId;


  const allCities = citiesIds.map(id => citiesById[id]) || [];
  const destionationsCitiesIds = state.destinations.ids.map(id => state.destinations.byId[id].city.sfid);

  // excludes cities already included on the db
  // only if is adding
  const citiesArray = (!ownProps.edit && !ownProps.translate) ? allCities.filter(city => !destionationsCitiesIds.includes(city.sfid)) : allCities;


  return {
    defaultLocale,
    languagesById,
    languages,
    baseLang: language.id,
    citiesArray,
    citiesById,
    isLoading: state.destinations.isLoading,
    errors: state.destinations.errors,
    destination: state.destinations.byId[ownProps.id] || null,
  };
};


export default connect(mapStateToProps, { addDestination, editDestination })(withStyles(s)(Destination));

