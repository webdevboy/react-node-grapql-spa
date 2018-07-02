import React, { Component } from "react";
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
import StringRow from "./StringRow";
import { editTranslation } from "admin/actions/translations";
import _ from "lodash";

class Language extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      onlyMissing: this.props.onlyMissing || false,
    };
  }

  editString = ({ message_id, defaultMessage, translation }) => {
    this.props.editTranslation(message_id, defaultMessage, this.props.locale, translation);
  }

  changeSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  filterSearch = strings => strings.filter((string) => {
    const filteredRes = Object.keys(string).map(key => _.includes(typeof string[key] === "string" ? string[key].toLowerCase() : "", this.state.search.toLowerCase()));
    return filteredRes.includes(true);
  })

  showMissingStrings = strings => strings.filter(string => !(string.translation && string.translation.length))

  toggleMissing = (e) => {
    e.preventDefault();
    this.setState({
      onlyMissing: !this.state.onlyMissing,
    });
  }

  render() {
    const { stringsArray, currentLanguage, currentRoute } = this.props;

    const filteredStrings = this.filterSearch(stringsArray); // set filter search
    const strings = (this.state.onlyMissing) ? this.showMissingStrings(filteredStrings) : filteredStrings;

    const breadcrumbs = <Breadcrumbs key="breadcrumb" appendText={[{text: currentLanguage.language}]} route={currentRoute} />;

    const filters = [
      <Filter key="filter-search" type="search" label="Search" search={this.changeSearch} />, 
    ];

    const actions = [
      <Button key="filter-toggle-missing-strings" className={cx("pt-button pt-minimal pt-intent-warning", (this.state.onlyMissing) ? "pt-active pt-icon-eye-on" : "pt-icon-eye-off")} onClick={this.toggleMissing}>Missing Strings</Button>,
    ];

    return (
      <Page filters={filters} actions={actions} breadcrumbs={breadcrumbs}>
        <div className={s.languages}>
          <table className="pt-table pt-striped">
            <thead>
              <tr>
                <th className={s["message-id"]}>String ID</th>
                {/* <th className={s.description}>Description</th> */}
                <th className={s.default}>Default Text</th>
                <th className={s.translation}>Translation</th>
                <th className={s.actionCol} />
              </tr>
            </thead>
            <tbody onScroll={this.onScrollToBottom}>

              { strings.map(string =>
                (<StringRow
                  key={`string-${string.id}`}
                  string={string}
                  editString={this.editString}
                />))}

            </tbody>

          </table>

        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const stringsList = state.languages.byId[ownProps.locale].strings.ids;
  const stringsById = state.languages.byId[ownProps.locale].strings.byId;

  return {
    currentLanguage: state.languages.byId[ownProps.locale],
    stringsArray: stringsList.map(id => stringsById[id]),
  };
};

export default connect(mapStateToProps, { editTranslation })(withStyles(s)(Language));
