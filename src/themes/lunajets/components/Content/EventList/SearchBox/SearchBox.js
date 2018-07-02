import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { Query } from 'react-apollo';
import gql from "graphql-tag";

import Search from "../../../Widgets/Search";
import DropdownMenu from "../../../Widgets/DropdownMenu";
import s from "./SearchBox.scss";
import GET_AIRCRAFT_TAXONOMY from '../../../../queries/getAircraftTaxonomy.gql';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month: '',
      year: '',
    }

    this.onMonth = this.onMonth.bind(this);
    this.onYear = this.onYear.bind(this);
  }

  onMonth(month) {
    this.setState({
      month: month - 1
    });
    this.props.onSearch(month - 1, this.state.year);
  }

  onYear(year) {
    this.setState({
      year
    });
    this.props.onSearch(this.state.month, year);
  }

  render() {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const years = [];
    for (var i = new Date().getFullYear() ; i > 1900 ; i --) {
      years.push(i);
    }
    return (
      <div className={cx("container")}>
        <div className="row">
          <div className={cx("col-sm-4 col-12 mb-2", s.searchBtn)}>
            <DropdownMenu options={months} onChange={this.onMonth} defaultMessage="MONTH" placeholderId="newslist.search.month" pencilStyle={{right: "-30px"}} />
          </div>
          <div className={cx("col-sm-4 col-12 mb-2", s.searchBtn)}>
            <DropdownMenu options={years} onChange={this.onYear} defaultMessage="YEAR" placeholderId="newslist.search.year" pencilStyle={{right: "-30px"}} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SearchBox);
