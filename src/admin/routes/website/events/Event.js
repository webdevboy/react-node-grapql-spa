import React from "react";
import ReactDOM from "react-dom";
import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Events.css";
import {
  Menu,
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
  Position,
} from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/labs";
import Breadcrumbs from "admin/components/Breadcrumbs";
import Filter from "admin/components/Filter";
import Editor from "admin/components/Editor";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import TooltipLabel from "admin/components/TooltipLabel";
import Sidebar from "admin/components/Sidebar";
import cx from "classnames";
import { connect } from "react-redux";
import { addEvent, editEvent, editCity, editDate } from "../../../actions/events";
import history from "../../../../core/history";
// import UserInspectPanel from './UserInspectPanel';
import _ from "lodash";
import { EditorState } from "draft-js";
import { editorStateToJSON, editorStateFromRaw } from "megadraft/lib/utils";
import { DateRangePicker, DateRangeInput } from "@blueprintjs/datetime";
import moment from "moment";
import EventPreview from "admin/components/Events/EventPreview";
import PhotoGallery from "admin/components/PhotoGallery";
import Loading from "react-loading-animation";
import { fetchMedia } from "admin/actions/media";
import getStringsTranslations from "admin/queries/getStringsTranslations.graphql";
import getLanguage from "admin/queries/getLanguage.graphql";

class Event extends React.Component {
  refHandlers = {
    toaster: ref => (this.toaster = ref),
    modal: ref => (this.modal = ref),
  };

  constructor(props) {
    super(props);
    const { edit, translate, params, duplicate, event, langId, baseLang, defaultLocale, messages } = this.props;

    let newEvent = {
      body: null,
      title: "",
      summary: "",
      city_id: undefined,
      language_id: baseLang,
      published: false,
      from_date: undefined,
      until_date: undefined,
      display_helicopter_transfer: false,
    };

    if (edit) {
      newEvent = {
        ...newEvent,
        body: event.body,
        title: event.title,
        summary: event.summary,
        city_id: event.city.sfid,
        city: event.city,
        language_id: event.language,
        published: event.published,
        from_date: new Date(event.from_date),
        until_date: new Date(event.until_date),
        media: event.media,
        url: event.url,
        display_helicopter_transfer: event.display_helicopter_transfer,
        event_id: event.event_id,
      };
    }

    if (translate) {
      newEvent = {
        ...newEvent,
        city_id: event.city.sfid,
        language_id: langId,
        published: false,
        from_date: new Date(event.from_date),
        until_date: new Date(event.until_date),
        event_id: event.event_id,
      };

      if (duplicate) {
        newEvent = {
          ...newEvent,
          body: event.body,
          title: event.title,
          summary: event.summary,
        };
      }
    }

    this.state = {
      event: newEvent,
      duplicate: false,
      previewOpened: false,
      isGalleryLoading: false,
	  messages: messages,
	  locale: defaultLocale,
    };

    this.originalState = this.state;
  }

  changeLang = e => {
    this.setState({
	  messages: messages,
	  locale: lang.data.language.locale.locale,
      event: {
        ...this.state.event,
        language_id: e.target.value,
      },
    });
  };

  edit = async () => {
    const { event } = this.state;
    await this.props.editEvent(this.props.id, event);
    await this.props.editCity(event.event_id, event.city_id);
    await this.props.editDate(event.event_id, event.from_date, event.until_date);

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
            message: "Event edited successfully!",
            timeout: 3000,
            intent: Intent.SUCCESS,
            iconName: "pt-icon-success",
            action: {
              text: "Ok",
              onClick: this.cancel,
            },
          },
    );
  };

  create = async () => {
    this.toaster.clear();
    const { event, duplicate } = this.state;
    const initialState = this.originalState.event;

    if (!this.props.translate) {
      if (event.title === initialState.title) {
        return this.toaster.show({
          message: "Title is required!",
          intent: Intent.DANGER,
          iconName: "pt-icon-error",
          timeout: 3000,
        });
      }

      if (event.city_id === initialState.city_id) {
        return this.toaster.show({
          message: "City is required!",
          intent: Intent.DANGER,
          iconName: "pt-icon-error",
          timeout: 3000,
        });
      }

      if (event.from_date === initialState.from_date && event.until_date === initialState.until_date) {
        return this.toaster.show({
          message: "A Date range is required!",
          intent: Intent.DANGER,
          iconName: "pt-icon-error",
          timeout: 3000,
        });
      }

      if (event.from_date && !event.until_date) {
        event.until_date = event.from_date; // fix end date
      }
    }

    console.log("BEFORE ADDING => ", event);

    const newEvent = await this.props.addEvent(event, this.props.translate ? false : duplicate);

    console.log("NEW EVENT RESPONSE => ", newEvent);

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
            message: "Event created successfully!",
            timeout: 3000,
            intent: Intent.SUCCESS,
            iconName: "pt-icon-success",
            action: {
              text: "Ok",
              onClick: this.cancel,
            },
          },
    );

    if (newEvent.response.result.events) {
      history.push(`/website/events/edit/${newEvent.response.result.events[0]}`);
    }
  };

  cancel = () => history.push("/website/events");

  onEditorChange = editorState => {
    this.setState({
      event: {
        ...this.state.event,
        body: editorState,
      },
    });
  };

  preview = async () => {
    const { event } = this.state;
	const { data } = await this.context.client.query({
        query: getStringsTranslations,
        variables: {id : event.language_id},
    });
	const messages = data.strings.reduce((msgs, msg) => {
        msgs[msg.message_id] = msg.translation || msg.defaultMessage; // eslint-disable-line no-param-reassign
        return msgs;
      }, {});
    const lang = await this.context.client.query({
        query: getLanguage,
        variables: {id : event.language_id},
    });
    this.eventpreview.openPreview(event,lang.data.language.locale.locale,messages);
  };

  handleChange = e => {
    this.setState({
      event: {
        ...this.state.event,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleCheckboxChange = e => {
    this.setState({
      event: {
        ...this.state.event,
        [e.target.name]: e.target.checked,
      },
    });
  };

  filterCity = (query, item, index) => item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;

  clearCity = () => {
    this.setState({
      event: {
        ...this.state.event,
        city_id: undefined,
      },
    });
  };

  addCity = city => {
    this.setState({
      event: {
        ...this.state.event,
        city_id: city.sfid,
        city,
      },
    });
  };

  handleDateChange = selectedDates => {
    if (selectedDates[1] !== null && selectedDates[0] === selectedDates[1]) {
      this.setState({
        event: {
          ...this.state.event,
          from_date: selectedDates[0],
          until_date: null,
        },
      });
    } else {
      this.setState({
        event: {
          ...this.state.event,
          from_date: selectedDates[0],
          until_date: selectedDates[1],
        },
      });
    }
  };

  toggleDuplicate = () => {
    this.setState({
      duplicate: !this.state.duplicate,
    });
  };

  componentDidMount() {
    let content = null;

    if (this.props.edit) {
      try {
        console.log(this.props.event.body);
        content = this.props.event.body;
      } catch (e) {
        content = null;
      }
    }

    this.setState({
      body: content,
    });
  }

  renderMenuItem = ({ handleClick, item, isActive }) => (
    <MenuItem
      className={cx(isActive ? s.isActive : null)}
      key={item.sfid}
      text={item.name}
      label={
        <div>
          <span className={s.labelCountry}>({item.country.name})</span>
          <span className={`famfamfam-flags ${item.country.countryCode}`} />
        </div>
      }
      onClick={handleClick}
    />
  );

  selectPhoto = photo => {
    let event = this.state.event;
    event.media = { id: photo.id, src: photo.src };
    event.media_id = photo.id;
    this.setState({ event: event });
  };

  openPhotoGallery = async () => {
    this.setState({ isGalleryLoading: true });
    const data = await this.props.fetchMedia({mimetype: "image%"});
    let photos = [];
    data.medias.forEach(file => {
      const photo = { id: file.id, src: file.src, width: 4, height: 3 };
      if (this.state.event.media && photo.id === this.state.event.media.id) {
        photo.selected = true;
      } else if (this.state.event.media_id && photo.id === this.state.event.media_id) {
        photo.selected = true;
      }
      photos.push(photo);
    });
    this.setState({ isGalleryLoading: false });
    this.photogallery.openGallery(photos);
  };

  removeBannerPhoto = () => {
    let event = this.state.event;
    event.media = null;
    event.media_id = null;
    this.setState({ event: event });
  };

  render() {
    const { edit, languages, currentRoute, citiesById, isLoading, citiesArray, baseLang } = this.props;

    const breadcrumbs = this.props.translate ? (
      <Breadcrumbs route={currentRoute} appendText={this.props.event.title} />
    ) : (
      <Breadcrumbs route={currentRoute} />
    );

    const actions = [
      {
        key: "action-preview",
        icon: "pt-icon-eye-open",
        intent: "pt-intent-primary",
        action: this.preview,
        label: "Preview",
      },
      {
        key: "action-confirm",
        icon: "pt-icon-confirm",
        loading: isLoading,
        intent: "pt-intent-success",
        action: this.props.edit ? this.edit : this.create,
        label: "Save",
      },
      {
        key: "action-cancel",
        icon: "pt-icon-undo",
        intent: "pt-intent-default",
        action: this.cancel,
        label: "Close",
      },
    ];

    const editOptionsForDate = !this.props.edit ? { minDate: new Date() } : {};

    const langOpts = {};
    if (this.props.edit || this.props.translate) {
      langOpts.disabled = "disabled";
    }

    return (
      <Page actions={actions} breadcrumbs={breadcrumbs}>
        <div className={s.event}>
          <EventPreview locale={this.state.locale} messages={this.state.messages} onRef={ref => (this.eventpreview = ref)} />
          <PhotoGallery onRef={ref => (this.photogallery = ref)} selectPhoto={this.selectPhoto} />
          <Toaster position={Position.TOP} ref={this.refHandlers.toaster} />

          <Editor onChange={this.onEditorChange} value={this.state.event.body} />

          <Sidebar expandable fixed>
            <form onSubmit={e => e.preventDefault()} className="content">
              <div className="header">
                <h4>{this.props.edit ? "Edit Event" : "Add Event"}</h4>
                <div className="pt-select pt-inline">
                  <select
                    {...langOpts}
                    className={cx(
                      this.state.event.language_id !== baseLang ? s.notDefaultLang : null,
                      s.langPicker,
                      "pt-fill",
                    )}
                    value={this.state.event.language_id}
                    name="language_id"
                    onChange={this.changeLang}
                  >
                    {languages.map(lang => (
                      <option key={`role-${lang.id}`} value={lang.id}>
                        {lang.language}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="body">
                {/* Add banner */}
                <div className="pt-form-group">
                    <label className="pt-label" htmlFor="files">
                      Banner
                    </label>
                    <Loading isLoading={this.state.isGalleryLoading}>
                      <div className={s["banner-placeholder"]}>
                        {this.state.event.media ? (
                          <Action
                            key="item-action-remove"
                            className="button-remove"
                            icon="pt-icon-remove"
                            intent="pt-intent-danger"
                            action={this.removeBannerPhoto}
                            tooltip="Remove Image"
                          />
                        ) : null}
                        <div className={cx(s["banner-upload"], this.state.event.media ? s.isFilled : null)}>
                          {this.state.event.media ? (
                            <img src={this.state.event.media.src} onClick={this.openPhotoGallery} />
                          ) : (
                            <Button className={cx("pt-button pt-minimal")} onClick={this.openPhotoGallery}>
                              Add Banner Image
                            </Button>
                          )}
                        </div>
                        <span className={s["banner-label"]}>Click to choose the banner picture</span>
                      </div>
                    </Loading>
                  </div>
                  {/* Title */}
                <div className="pt-form-group">
                  <label className="pt-label">
                    <TooltipLabel label="Title" required tooltip="Event title, Maximum length of 80 Characters" />
                    <input
                      name="title"
                      onChange={this.handleChange}
                      className="pt-bold pt-input pt-large pt-fill"
                      type="text"
                      value={this.state.event.title}
                      placeholder="Title"
                      dir="auto"
                    />
                  </label>
                </div>
                
                {/* Summary */}
                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="description">
                    <TooltipLabel
                      label="Summary"
                      tooltip="A little summary about the event, this might appear as a title when hovering a link or a component targeting this event, also this will be used as meta description for the event page. Maximum length of 160 Characters"
                    />
                    <textarea
                      style={{ minHeight: "80px" }}
                      name="summary"
                      className="pt-input pt-fill"
                      id="description"
                      value={this.state.event.summary}
                      onChange={this.handleChange}
                      placeholder="Write a litle summary"
                    />
                  </label>
                </div>
                
                {/* City */}
                <div className={cx("pt-form-group")}>
                  <label className="pt-label" htmlFor="city">
                    <TooltipLabel
                      label="City"
                      required
                      tooltip="Select a city for the event, this will link all the content belonging to the city to the event page, like airports"
                    />
                  </label>
                  <Suggest
                    name="city"
                    inputProps={
                      this.props.edit || this.props.translate
                        ? {
                            readOnly: "readOnly",
                            value: this.state.event.city_id
                              ? `${citiesById[this.state.event.city_id].name} - (${
                                  citiesById[this.state.event.city_id].country.name
                                })`
                              : "",
                          }
                        : {}
                    }
                    openOnKeyDown
                    items={citiesArray}
                    itemRenderer={this.renderMenuItem}
                    onItemSelect={this.addCity}
                    resetOnSelect
                    itemPredicate={this.filterCity}
                    inputValueRenderer={({ name, country }) => `${name} - (${country.name})`}
                    noResults={<MenuItem iconName="pt-icon-issue" text="No Results" intent={Intent.WARNING} />}
                  />
                </div>
                
                {/* From Until Date */}
                <div className={cx("pt-form-group")}>
                  <label className="pt-label">
                    <TooltipLabel label="From - Until" required>
                      <span>Choose a date range for the event, single days are allowed!</span>
                    </TooltipLabel>
                  </label>

                  {!(this.props.translate) ? (
                    <DateRangePicker
                      value={[this.state.event.from_date, this.state.event.until_date]}
                      onChange={this.handleDateChange}
                      locale={`${this.props.defaultLocale}-GB`}
                      shortcuts={false}
                      allowSingleDayRange
                      {...editOptionsForDate}
                    />
                  ) : (
                    <DateRangeInput
                      value={[this.state.event.from_date, this.state.event.until_date]}
                      locale={`${this.props.defaultLocale}-GB`}
                      allowSingleDayRange
                      shortcuts={false}
                      startInputProps={{
                        className: "pt-fill",
                        style: { pointerEvents: "none" },
                      }}
                      endInputProps={{
                        className: "pt-fill",
                        style: { pointerEvents: "none" },
                      }}
                    />
                  )}
                </div>

                {/* Event URL section */}
                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="event_url">
                    <span>Event URL</span>
                    <div className="pt-input-group">
                      <span className="pt-icon pt-icon-link" />
                      <input
                        type="url"
                        name="url"
                        value={this.state.event.url}
                        className="pt-input pt-fill"
                        id="event_url"
                        onChange={this.handleChange}
                        placeholder="Event URL"
                      />
                    </div>
                  </label>
                </div>

                {/* Helicopter transfter checkbox */}
                <div className="pt-form-group">
                  <label className={s["checkbox-label"]} htmlFor="display_helicopter_transfer">
                    <input
                      name="display_helicopter_transfer"
                      onChange={this.handleCheckboxChange}
                      className=""
                      type="checkbox"
                      checked={this.state.event.display_helicopter_transfer}
                    />
                    Display Helicopter Transfer
                  </label>
                </div>

                {/* State */}
                <div className="pt-form-group">
                  <label className="pt-label" htmlFor="published">
                    <TooltipLabel
                      label="State"
                      required
                      tooltip="Status of this publication, if published(visible to public) or draft(visible internally)"
                    />
                    <div className="pt-select pt-inline">
                      <select
                        className={cx("pt-fill")}
                        value={this.state.event.published}
                        name="published"
                        onChange={this.handleChange}
                      >
                        <option key="state-draft" value={false}>
                          Draft ✖
                        </option>
                        <option key="state-published" value>
                          Publish ✔
                        </option>
                      </select>
                    </div>
                  </label>
                </div>

                {!(this.props.edit || this.props.translate) ? (
                  <div className="pt-card pt-elevation-0">
                    <Switch
                      label="Duplicate for other languages"
                      name="duplicate"
                      checked={this.state.duplicate}
                      onChange={this.toggleDuplicate}
                    />
                  </div>
                ) : null}
              </div>
            </form>
          </Sidebar>
        </div>
      </Page>
    );
  }
}

Event.contextTypes = {
  fetch: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  // gets the defautlLocale languages.id
  // locale code => language.id
  const languagesById = state.languages.byId;
  const languages = Object.values(state.languages.ids) || [];
  const defaultLocale = state.intl.locale || 'en';
  const locale = _.find(languagesById, { locale: defaultLocale });
  const messages = state.intl.messages[defaultLocale];

  return {
	messages,
    defaultLocale,
    languagesById,
    languages,
    baseLang: language.id,
    citiesArray: state.cities.ids.map(id => state.cities.byId[id]) || [],
    citiesById: state.cities.byId,
    isLoading: state.events.isLoading,
    errors: state.events.errors,
    event: state.events.byId[ownProps.id] || null,
    files: state.media.ids.map(id => state.media.byId[id]),
  };
};

export default connect(mapStateToProps, {addEvent,editEvent,editCity,editDate,fetchMedia})(withStyles(s)(Event));
