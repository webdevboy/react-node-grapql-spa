import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import _ from "lodash";
import Filter from "../../../components/Filter";
import Action from "../../../components/Action";
import Page from "../../../components/Page";
import NoResultsRow from "../../../components/NoResultsRow";
import Breadcrumbs from "../../../components/Breadcrumbs";
import s from "./Sitemap.css";
import history from "../../../../core/history";
import { Alert, Menu, Switch, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";

export class Sitemap extends Component {

  breadcrumbs = <Breadcrumbs key="breadcrumb" route={this.props.currentRoute} />;

  filters = [
    <Filter tooltip="Search here" key="filter-search" type="search" label="Search ..." search={this.changeSearch} />,
  ];

  actions = [
    <Action key="action-add" icon="pt-icon-add" intent="pt-intent-primary" action={this.addRedirection} label="New Redirection" />,
  ];

  render() {
    return (
      <Page actions={this.actions} filters={this.filters} breadcrumbs={this.breadcrumbs}>
        <h1>Sitemap</h1>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Sitemap))
