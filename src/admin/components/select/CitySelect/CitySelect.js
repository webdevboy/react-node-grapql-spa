import React, { Component } from "react";
import SelectWrapper from "admin/components/select/SelectWrapper";
import fetchCityQuery from "admin/queries/fetchSearchCity.graphql";

class CitySelect extends Component {
  itemTextRenderer = city => `${city.name}, ${city.country.name}`;
  itemLabelRenderer = city => (
    <div>
      <span className={`famfamfam-flags ${city.country.countryCode}`} />
    </div>
  );
  render() {
    return (
      <SelectWrapper
        query={fetchCityQuery}
        dataName="cities"
        itemKey={city => city.sfid}
        itemTextRenderer={this.itemTextRenderer}
        itemLabelRenderer={this.itemLabelRenderer}
        {...this.props}
      />
    );
  }
}

export default CitySelect;
