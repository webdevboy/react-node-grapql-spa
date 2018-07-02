import React, { Component } from "react";
import Sidebar from "admin/components/Sidebar";
import StateTag from "admin/components/StateTag";
import LegendBlock from "admin/components/LegendBlock";
import { connect } from "react-redux";
import Action from "admin/components/Action";
import cx from "classnames";
import moment from "moment";
import _ from "lodash";
import history from "core/history";
import { DateRangeInput } from "@blueprintjs/datetime";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { Intent, Menu, MenuItem, Position } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/labs";
import s from "./Events.css";
import getUrlFromPost from "utils/getUrlFromPost";
import { sortPostByLanguage } from "utils/sortPostByLanguage";

class EventSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      master: this.props.master,
      editDate: false,
      editCity: false,
      city_id: undefined,
      dates: [new Date(this.props.master.from_date), new Date(this.props.master.until_date)],
    };
  }

  toggleEditDate = () => this.setState({ editDate: !this.state.editDate });

  saveDate = () => {
    this.props.editDate(this.props.groupId, this.state.dates[0], this.state.dates[1]);
    this.toggleEditDate();
  };

  toggleEditCity = () => this.setState({ editCity: !this.state.editCity });

  saveCity = () => {
    this.props.editCity(this.props.groupId, this.state.city_id);
    this.toggleEditCity();
  };

  filterCity = (query, item, index) => item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;

  clearCity = () => {
    this.setState({
      city_id: undefined,
    });
  };

  addCity = ({ sfid }) => {
    this.setState({
      city_id: sfid,
    });
  };

  setMaster = event => this.setState({ master: event });

  changeDate = date => this.setState({ dates: date });

  cancelEditDate = () => {
    this.setState({ dates: [this.state.master.meta.from_date, this.state.master.meta.to_date], editDate: false });
  };

  cancelEditCity = () => {
    this.clearCity();
    this.setState({
      editCity: false,
    });
  };

  translatePost = (e, post, langId, flag) => {
    e.stopPropagation();
    if (flag) {
      return history.push(`/website/events/edit/${post.id}/duplicate/${langId}`);
    } else {
      return history.push(`/website/events/edit/${post.id}/translate/${langId}`);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.master) {
      if (this.props.master !== prevProps.master || prevProps.group.length !== this.props.group.length) {
        this.setState({
          master: this.props.master,
          dates: [new Date(this.props.master.from_date), new Date(this.props.master.until_date)],
        });
      }
    }
  }

  render() {
    const {
      group,
      citiesArray,
      missingTranslations,
      citiesById,
      languages,
      viewEvent,
      city,
      editEvent,
      removeEvent,
      translateEvent,
    } = this.props;
    const { master } = this.state;

    const renderMenuItem = ({ handleClick, item, isActive }) => (
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

    if (!master) {
      return null;
    }

    var eventCity = false;

    if (master.meta.city_sfid) {
      citiesArray.map(city => {
        if (city.sfid === master.meta.city_sfid) {
          eventCity = city;
        }
      });
    }
    const port = __DEV__ ? `:${window.App.port}` : "";
    const subDomain = __DEV__ ? "" : "www.";
    const basePath = `https://${subDomain}${window.App.hostname}${port}`;
    const masterUrl = basePath + getUrlFromPost(master.language.locale, master);

    const link = `${masterUrl}`;

    return (
      <Sidebar float hasOverlay>
        <div className="header">
          <Action key="item-action-view" icon="pt-icon-eye-open" action={e => viewEvent(link)} tooltip="View Event" />

          <h4 className="align-left">{master && master.title}</h4>

          <div className="actions">
            <Action
              key="item-action-edit"
              icon="pt-icon-edit"
              intent="pt-intent-primary"
              action={e => editEvent(e, master.id)}
              tooltip="Edit Event"
            />
            <Action
              key="item-action-remove"
              icon="pt-icon-remove"
              intent="pt-intent-danger"
              action={e => removeEvent(e, master.id)}
              tooltip="Remove Event"
            />
          </div>
        </div>

        <div className="body">
          <div className="pt-card pt-elevation-0 space">
            <div className="row">
              <div className="col-12">
                <b className="label-row">Link:</b>
                <a target="_blank" href={link}>
                  {link}
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <b className="label-row">Language:</b>
                <span className={cx("pt-tag pt-minimal")}>{master.language.language}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <b className="label-row">Summary:</b>
                <span className="text">{master.summary}</span>
                <div className="tags">
                  {sortPostByLanguage(group, master.language).map(post => (
                    <StateTag
                      onClick={e => this.setMaster(post)}
                      key={`tag-locale-${post.language.id}`}
                      value={post.state}
                      selected={post.language.id === master.language.id}
                      text={post.language.locale}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <b className="label-row">City:</b>
                {this.state.editCity ? (
                  <div className="fill d-inline">
                    <Suggest
                      name="city"
                      openOnKeyDown
                      items={citiesArray}
                      itemRenderer={renderMenuItem}
                      onItemSelect={this.addCity}
                      resetOnSelect
                      itemPredicate={this.filterCity}
                      inputValueRenderer={({ name, country }) => `${name} - (${country.name})`}
                      noResults={<MenuItem iconName="pt-icon-issue" text="No Results" intent={Intent.WARNING} />}
                    />
                  </div>
                ) : (
                  <div className="fill d-inline">
                    <span className={cx("famfamfam-flags", eventCity ? eventCity.country.countryCode : "fr")} />
                    <span className="text">{eventCity ? eventCity.name : "Undefined"}</span>
                  </div>
                )}

                {/* <button
                className={cx(
                  "pt-small pt-button pt-minimal",
                  this.state.editCity ? "pt-icon-small-tick pt-intent-success" : "pt-icon-edit"
                )}
                onClick={this.state.editCity ? this.saveCity : this.toggleEditCity}
              />

              {this.state.editCity ? (
                <button
                  className={cx("pt-small pt-button pt-minimal pt-icon-cross pt-intent-danger")}
                  onClick={this.cancelEditCity}
                />
              ) : null} */}
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <b className="label-row">Date:</b>
                {console.log(this.props.defaultLocale)}
                {this.state.editDate ? (
                  <div className="fill">
                    <DateRangeInput
                      value={this.state.dates}
                      locale={`${this.props.defaultLocale}-GB`}
                      allowSingleDayRange
                      shortcuts={false}
                      startInputProps={{ className: "pt-fill" }}
                      endInputProps={{ className: "pt-fill" }}
                      popoverProps={{ className: "fill", position: Position.BOTTOM_LEFT }}
                      onChange={this.changeDate}
                    />
                  </div>
                ) : (
                  <span className="fill text">
                    {moment(master.meta.from_date).format("ll")} - {moment(master.meta.to_date).format("ll")}
                  </span>
                )}

                {/* <button
                className={cx(
                  "pt-small pt-button pt-minimal",
                  this.state.editDate ? "pt-icon-small-tick pt-intent-success" : "pt-icon-edit"
                )}
                onClick={this.state.editDate ? this.saveDate : this.toggleEditDate}
              />
              {this.state.editDate ? (
                <button
                  className={cx("pt-small pt-button pt-minimal pt-icon-cross pt-intent-danger")}
                  onClick={this.cancelEditDate}
                />
              ) : null} */}
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <b className="label-row">State:</b>
                <StateTag value={master.state} />
                {master.state === "pending" ? (
                  <span style={{ fontSize: "12px", marginLeft: "5px" }}>
                    <u>{master.publish_at && moment(master.publish_at).format("lll")}</u>
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {!missingTranslations.length ? (
            <div className="row expanded">
              <div className="col-12">
                <div className="pt-non-ideal-state">
                  <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
                    <span className="pt-icon pt-icon-endorsed" />
                  </div>
                  <h4 className="pt-non-ideal-state-title">We're good!</h4>
                  <div className="pt-non-ideal-state-description">No translations missing!</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-12">
                <b className="label-row">Translations Missing:</b>
                <ul className="list">
                  {missingTranslations.map(({ locale, language, id }) => (
                    <li key={`missing-translation-${locale}`}>
                      <div className="list-item">
                        <span>
                          {language} <span className="pt-tag pt-minimal pt-intent-warning">{locale}</span>
                        </span>

                        <div className="actions">
                          <button
                            className="pt-button pt-small pt-minimal pt-icon-plus"
                            onClick={e => this.translatePost(e, master, id)}
                          >
                            Create
                          </button>
                          <button
                            className="pt-button pt-small pt-minimal pt-icon-duplicate pt-intent-primary"
                            onClick={e => this.translatePost(e, master, id, true)}
                          >
                            Duplicate
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="footer">
          <LegendBlock values={["published", "draft"]} />
        </div>
      </Sidebar>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const languages = Object.values(state.runtime.availableLocales);

  const group = ownProps.postGroup;
  const post = _.find(group, { language: ownProps.baseLang });
  const master = post || group[0];

  const translationsFound = group.map(post => post.language.id);
  const missingTranslations = languages.filter(language => translationsFound.indexOf(language.id) == -1);
  // citiesArray: state.cities.ids.map(id => state.cities.byId[id]) || [],
  return {
    citiesArray: ownProps.citiesArray || [],
    citiesById: state.cities.byId,
    defaultLocale: state.intl.defaultLocale,
    languages,
    group,
    master,
    missingTranslations,
  };
};

export default connect(mapStateToProps)(withStyles(s)(EventSidebar));
