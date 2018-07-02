import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Languages.css";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Filter from "../../../components/Filter";
import Action from "../../../components/Action";
import Page from "../../../components/Page";
import cx from "classnames";
import { connect } from "react-redux";
import { Menu, Switch, Button, Classes, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";
import { enableLanguage, disableLanguage } from "admin/actions/translations";
import { fetchLanguages } from "admin/actions/translations";
import { setRuntimeVariable } from "admin/actions/runtime";
import history from "core/history";

const Collapsed = ({ addLanguage }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-add"
      text="Enable Language"
      onClick={addLanguage(e)}
      intent={Intent.PRIMARY}
      className={s.menuItem}
    />
  </Menu>
);

const LanguageRow = ({
  language, locale, isActive, viewLanguage, disableLanguage, enableLanguage, viewMissingStrings,
}) => (
  <tr>
    <td>{language.language} <span className="pt-tag pt-minimal pt-intent-success">{locale}</span></td>
    <td>{language.native}</td>
    <td><a href={`/translations/${locale}?onlyMissing=true`} onClick={e => viewMissingStrings(e, locale)}><b>{language.missing_translations}</b></a></td>
    <td><b>{language.total_strings}</b></td>
    <td className={s.switch}><Switch className="pt-inline" checked={language.enabled} onChange={() => (language.enabled) ? disableLanguage(locale) : enableLanguage(locale)} /></td>
    <td className={s.actionCol}>
      <Action key="item-action-view" icon="pt-icon-eye-open" action={e => viewLanguage(e, locale)} tooltip="View Language" />
    </td>
  </tr>
);

class Languages extends Component {

  constructor(props) {
    super(props);
    const {languagesArray} = this.props;
    this.state={
      enabled: true,
    };
  }

  removeLanguage = (id) => {
    this.props.removeLanguage(id);
  }

  enableLanguage = async (locale) => {
	const { languagesArray } = this.props;
    await this.props.enableLanguage(locale);
    let listLanguages = languagesArray.filter(lang => (lang.enabled && (lang.locale !== locale)));
    let langEnabled = languagesArray.find(lang => (lang.locale === locale));
    langEnabled.enabled = true;
    listLanguages.push(langEnabled);
    this.props.setRuntimeVariable({
      availableLocales: _.keyBy(listLanguages, 'locale'),
    });
  }

  disableLanguage = async (locale) => {
	const { languagesArray } = this.props;
    await this.props.disableLanguage(locale);
    let listLanguages = languagesArray.filter(lang => (lang.enabled && (lang.locale !== locale)));
    this.props.setRuntimeVariable({
      availableLocales: _.keyBy(listLanguages, 'locale'),
    });
  }

  viewLanguage = (e, locale) => {
    e.preventDefault();
    if (locale) {
      return history.push(`/tools/translations/${locale}`);
    }
  }

  viewMissingStrings = (e, locale) => {
    e.preventDefault();
    if (locale) {
      return history.push(`/tools/translations/${locale}?onlyMissing=true`);
    }
  }

  hideInspect = () => {
    this.setState({ sidebar: false });
  }

  toggleEnabledState = () => {
    this.setState({ enabled: !this.state.enabled });
  }

  componentDidUpdate(prevProps) {
    console.log('PREV PROPS =>', prevProps);
    console.log('NEW PROPS =>', this.props); 
  }

  // filterLocale = (query, item, index) => (item.language.toLowerCase()).indexOf(query.toLowerCase()) >= 0

  render() {
    const { currentRoute, languagesArray } = this.props;

    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={currentRoute} />;
    
    const langsSorteByEnabled = _.sortBy(languagesArray, (lang) => (!lang.enabled));
    const filters = [
    // <Filter key={`filter-search`} type="search" label={'Search'} search={this.changeSearch} />,
    ];

    const actions = [
      <Action key="item-toggle-enabled" icon="pt-icon-eye-open" action={this.toggleEnabledState} label={(this.state.enabled) ? 'View All' : 'Hide All'} tooltip="Hide or Show disabled Languages"  />
    ];

    const languages = (this.state.enabled)
      ? langsSorteByEnabled.filter(({enabled}) => (enabled === this.state.enabled))
      : langsSorteByEnabled;

    const actionPopover = null;

    return (
      <Page actions={actions} actionPopover={actionPopover} filters={filters} breadcrumbs={breadcrumbs}>
        <div className={s.languages}>
          <table className="pt-table pt-striped">
            <thead>
              <tr>
                <th>Language</th>
                <th>Native</th>
                <th>Missing Translation</th>
                <th>Total Strings</th>
                <th className={s.switch}>Enabled</th>
                <th className={s.actionCol} />
              </tr>
            </thead>
            <tbody onScroll={this.onScrollToBottom}>

              { languages.map(language =>
                (<LanguageRow
                  key={`language-${language.id}`}
                  language={language}
                  locale={language.locale}
                  enableLanguage={this.enableLanguage}
                  disableLanguage={this.disableLanguage}
                  viewLanguage={this.viewLanguage}
                  viewMissingStrings={this.viewMissingStrings}
                />))}
            </tbody>
          </table>

        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  languagesArray: state.languages.ids.map(id => state.languages.byId[id]) || [],
  languagesById: state.languages.byId,
});

export default connect(mapStateToProps, { enableLanguage, disableLanguage, fetchLanguages, setRuntimeVariable })(withStyles(s)(Languages));
