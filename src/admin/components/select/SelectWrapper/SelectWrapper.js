import React, { Component } from "react";
import { Query } from "react-apollo";
import { MenuItem, Button, Intent } from "@blueprintjs/core";
import { Select } from "@blueprintjs/labs";
import * as _ from "lodash";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./SelectWrapper.css";

class SelectWrapper extends Component {
  menuItemRenderer = ({ item, handleClick }) => {
    const { itemTextRenderer, itemLabelRenderer, itemKey } = this.props;
    return item ? (
      <MenuItem
        key={itemKey(item)}
        text={itemTextRenderer(item)}
        label={itemLabelRenderer(item)}
        onClick={handleClick}
      />
    ) : (
      <MenuItem key="loadingSpinner" text="Loading..." />
    );
  };
  onQueryChange = (refetch, search) => {
    refetch({
      search,
      limit: 10,
    });
  };
  render() {
    const { currentItem, onItemSelect, query, dataName } = this.props;
    return (
      <Query query={query} variables={{ limit: 10 }}>
        {({ loading, data, refetch }) => (
          <Select
            className={s["select-target"]}
            filterable
            items={loading ? [null] : data[dataName]}
            itemRenderer={this.menuItemRenderer}
            onItemSelect={onItemSelect}
            noResults={<MenuItem iconName="pt-icon-issue" text="No Results" intent={Intent.WARNING} />}
            onQueryChange={_.debounce(this.onQueryChange.bind(this, refetch), 300)}
          >
            <Button
              text={currentItem ? this.menuItemRenderer({ item: currentItem }) : ""}
              rightIconName="double-caret-vertical"
              className="pt-fill d-flex align-items-center"
            />
          </Select>
        )}
      </Query>
    );
  }
}

export default withStyles(s)(SelectWrapper);
