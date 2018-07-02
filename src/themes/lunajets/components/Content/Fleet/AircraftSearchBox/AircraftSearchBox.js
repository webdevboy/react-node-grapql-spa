import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Search from "../../../Widgets/Search";
import DropdownMenu from "../../../Widgets/DropdownMenu";
import s from "./AircraftSearchBox.scss";

import GET_AIRCRAFT_TAXONOMY from "../../../../queries/getAircraftTaxonomy.gql";

class AircraftSearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: "",
      manufacturers: "",
      title: "",
    };

    this.onSearch = this.onSearch.bind(this);
    this.onCategory = this.onCategory.bind(this);
    this.onManufacture = this.onManufacture.bind(this);
  }

  onSearch(title) {
    this.setState({
      title,
    });
    this.props.onSearch(this.state.categories, this.state.manufacturers, title);
  }

  onCategory(categories) {
    this.setState({
      categories,
    });
    this.props.onSearch(categories, this.state.manufacturers, this.state.title);
  }

  onManufacture(manufacturers) {
    this.setState({
      manufacturers,
    });
    this.props.onSearch(this.state.categories, manufacturers, this.state.title);
  }

  render() {
    const { categories, manufacturers } = this.props;
    const dropdownPencilStyle = {
      padding: "0 8px",
      marginTop: "-5px",
    };

    return (
      <div className={cx("container my-5")}>
        <div className="row">
          <div className="col-sm-6 col-12">
            <Search id="fleet_search" onSearch={this.onSearch} placeholder="Search aircraft" />
          </div>
          <div className="col-sm-3 col-6 pt-2 pt-md-0">
            <DropdownMenu
              options={categories}
              onChange={this.onCategory}
              pencilStyle={dropdownPencilStyle}
              defaultMessage="CATEGORY"
              id="search_category"
              placeholderId="client.lunajets.fleet.search_category"
            />
          </div>
          <div className="col-sm-3 col-6 pt-2 pt-md-0">
            <DropdownMenu
              options={manufacturers}
              onChange={this.onManufacture}
              pencilStyle={dropdownPencilStyle}
              defaultMessage="MANUFACTURER"
              id="search_manufacturer"
              placeholderId="client.lunajets.fleet.search_manufacturer"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AircraftSearchBox);
