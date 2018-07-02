import LoadingSpinner from "admin/components/LoadingSpinner";
import TooltipLabel from "admin/components/TooltipLabel";
import QUERY_CITIES from "admin/queries/fetchCitiesEditor.graphql";
import * as _ from "lodash";
import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import CitySelect from "admin/components/select/CitySelect";

class EmptyLegsDestinationSidebar extends Component {
  updateCity = (citySlot, city) => {
    const { post, handlePostChange } = this.props;
    const newPost = {
      ...post,
      [citySlot]: city,
      meta: {
        ...post.meta,
        [`${citySlot}_sfid`]: city.sfid,
      },
    };
    handlePostChange(newPost);
  };
  render() {
    const {
      post: { first_city, second_city },
    } = this.props;
    return (
      <Fragment>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="city">
            <TooltipLabel label="Between" required tooltip="Please select a city" />
            <CitySelect currentItem={first_city} onItemSelect={city => this.updateCity("first_city", city)} />
          </label>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="city">
            <TooltipLabel label="And" required tooltip="Please select a city" />
            <CitySelect currentItem={second_city} onItemSelect={city => this.updateCity("second_city", city)} />
          </label>
        </div>
      </Fragment>
    );
  }
}

export default EmptyLegsDestinationSidebar;
