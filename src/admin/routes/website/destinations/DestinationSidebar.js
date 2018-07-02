import Sidebar from "admin/components/Sidebar";
import StateTag from "admin/components/StateTag";
import LegendBlock from "admin/components/LegendBlock";
import React, { Component } from "react";
import { connect } from "react-redux";
import Action from "admin/components/Action";
import cx from "classnames";
import moment from "moment";
import _ from "lodash";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { Intent, Menu, MenuItem } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/labs";
import s from "./Destinations.css";


class DestinationsSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      master: this.props.master,
    };
  }

  setMaster = destination => this.setState({ master: destination })

  componentDidUpdate(prevProps, prevState) {
    if (this.props.master) {
      if (
        (this.props.master !== prevProps.master) ||
        (prevProps.group.length !== this.props.group.length)
      ) {
        this.setState({
          master: this.props.master,
        });
      }
    }
  }

  render() {
    const {
      groupId, group, citiesArray, missingTranslations, citiesById, baseLang, languages, languagesById, viewDestination, editDestination, removeDestination, translateDestination,
    } = this.props;
    const { master } = this.state;

    const renderMenuItem = ({ handleClick, item, isActive }) => (<MenuItem
      className={cx(isActive ? s.isActive : null)}
      key={item.sfid}
      text={item.name}
      label={<div><span className={s.labelCountry}>({item.country.name})</span><span className={`famfamfam-flags ${item.country.countryCode}`} /></div>}
      onClick={handleClick}
    />);

    if (!master) {
      return null;
    }

    return (
      <Sidebar float hasOverlay>
        <div className="header">
          <Action key="item-action-view" icon="pt-icon-eye-open" action={e => viewDestination(e, master.id)} tooltip="View Destination" />

          <h4>{ master && master.title}</h4>

          <div className="actions">
            <Action key="item-action-edit" icon="pt-icon-edit" intent="pt-intent-primary" action={e => editDestination(e, master.id)} tooltip="Edit Destination" />
            <Action key="item-action-remove" icon="pt-icon-remove" intent="pt-intent-danger" action={e => removeDestination(e, master.id)} tooltip="Remove Destination" />
          </div>

        </div>

        <div className="body">
          <div className="pt-card pt-elevation-0 space">
            <div className="row">
              <b className="label-row">Language:</b>
              <span className={cx("pt-tag pt-minimal")}>{languagesById[master.language].locale}</span>
            </div>
            <div className="row block">
              <b className="label-row">Summary:</b>
              <p className="text">
                { master.summary }
              </p>
              <div className="tags">
                {
                  group.map(destination =>
                    (<StateTag
                      onClick={e => this.setMaster(destination)}
                      key={`tag-locale-${destination.language}`}
                      value={destination.published}
                      selected={(destination.language === master.language)}
                      text={languagesById[destination.language].locale}
                    />))}
              </div>
            </div>
            <div className="row">
              <b className="label-row">City:</b>
              <div className="fill">
                <span className={cx("famfamfam-flags", master.city.country.countryCode)} />
                <span>{ master.city.name }</span>
              </div>
            </div>

            <div className="row">
              <b className="label-row">State:</b>
              <StateTag value={master.published} />
            </div>
          </div>

          {
            (!missingTranslations.length)
            ?
              <div className="row expanded">
                <div className="pt-non-ideal-state">
                  <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
                    <span className="pt-icon pt-icon-endorsed" />
                  </div>
                  <h4 className="pt-non-ideal-state-title">We're good!</h4>
                  <div className="pt-non-ideal-state-description">
                  No translations missing!
                  </div>
                </div>
              </div>
            :
              <div className="row block">
                <b className="label-row">Translations Missing:</b>
                <ul className="list">
                  {
                  missingTranslations.map(({ locale, language }) =>
                    (<li key={`missing-translation-${locale.locale}`}>
                      <div className="list-item">
                        <span>
                          {locale.language} <span className="pt-tag pt-minimal pt-intent-warning">{locale.locale}</span>
                        </span>

                        <div className="actions">
                          <button className="pt-button pt-small pt-minimal pt-icon-plus" onClick={e => translateDestination(e, master.id, language.id)}>Create</button>
                          <button className="pt-button pt-small pt-minimal pt-icon-duplicate pt-intent-primary" onClick={e => translateDestination(e, master.id, language.id, true)}>Duplicate</button>
                        </div>

                      </div>
                     </li>))
                }
                </ul>
              </div>
          }

        </div>

        <div className="footer">
          <LegendBlock values={["published", "draft"]} />
        </div>
      </Sidebar>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const languagesById = state.languages.byId;
  const languages = Obejct.values(state.languages.ids) || [];
  const group = state.destinations.ids.map(id => state.destinations.byId[id]).filter(destination => (destination.destination_id === ownProps.groupId));
  const destination = _.find(group, { language: ownProps.baseLang });
  const master = destination || group[0];

  const translationsFound = group.map(({ language }) => language);
  const missingTranslations = _.difference(state.languages.ids, translationsFound).map(id => ({
    locale: languagesById[id].locale,
    language: languagesById[id],
  }));

  return {
    citiesArray: state.cities.ids.map(id => state.cities.byId[id]) || [],
    citiesById: state.cities.byId,
    defaultLocale: state.intl.defaultLocale,
    languagesById,
    languages,
    group,
    master,
    missingTranslations,
  };
};

export default connect(mapStateToProps)(withStyles(s)(DestinationsSidebar));
