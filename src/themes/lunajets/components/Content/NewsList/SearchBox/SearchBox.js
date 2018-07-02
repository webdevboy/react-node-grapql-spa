import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { Query } from 'react-apollo';
import gql from "graphql-tag";

import Search from "../../../Widgets/Search";
import DropdownMenu from "../../../Widgets/DropdownMenu";
import s from "./SearchBox.scss";
import GET_ARTICLE_CATEGORIES from '../../../../queries/getArticleCategories.gql';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month: '',
      year: '',
      categoryName: '',
    }

    this.onMonth = this.onMonth.bind(this);
    this.onYear = this.onYear.bind(this);
    this.onCategory = this.onCategory.bind(this);
  }

  onMonth(month) {
    this.setState({
      month: month - 1
    });
    this.props.onSearch(month - 1, this.state.year, [this.state.categoryName]);
  }

  onYear(year) {
    this.setState({
      year
    });
    this.props.onSearch(this.state.month, year, [this.state.categoryName]);
  }

  onCategory(categoryName, index) {
    this.setState({
      categoryName
    });
    this.props.onSearch(this.state.month, this.state.year, [categoryName], index);
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
          <div className={cx("col-sm-4 col-12 mb-2", s.searchBtn)}>
            <Query query={GET_ARTICLE_CATEGORIES} variables={{
              taxonomies : "article_category",
              language_id: this.props.language_id
            }}>
              {({ loading, error, data }) => {
                if (loading) return null;
                if (error) return `Error!: ${error}`;

                let categories = [];
                if (data.categories) {
                  categories = data.categories
                                .filter(category => category.parent && category.parent.name === 'News')
                                .map(category => category.term.name);
                }
                
                return <DropdownMenu
                          options={categories}
                          onChange={this.onCategory}
                          defaultMessage="CATEGORY"
                          placeholderId="newslist.search.category"
                          pencilStyle={{right: "-30px"}}
                       />;
              }}
            </Query>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SearchBox);
