import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import * as Icon from "react-feather";
import cx from "classnames";

import Text from "../../Primitives/Text";
import MenuItem from "./MenuItem";
import s from "./style.scss";

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }
  onChange = (slug, value, index) => {
    this.setState({
      value,
    });
    this.props.onChange(slug, index);
  };

  isCleared = () => {
    return this.state.value === "" || this.props.options.indexOf(this.state.value) === 0;
  };

  compare(a, b) {
    if (a.order && b.order) {
      return a.order - b.order;
    } else {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }
    
  }

  render() {
    return (
      <div className="dropdown px-0" id={this.props.id}>
        <button
          className={cx(s["dropdown-toggle"], "btn btn-secondary dropdown-toggle")}
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {this.isCleared() ? (
            <Text
              defaultMessage={this.props.defaultMessage}
              id={this.props.placeholderId}
              pencilStyle={this.props.pencilStyle}
            />
          ) : (
            <span>{this.state.value}</span>
          )}
          <Icon.ChevronDown size="2rem" className={cx(s["arrow-down"])}/>
        </button>

        <ul className={cx("dropdown-menu w-100", s["menu"])}>
          <MenuItem
            key={`dropdown-menu-0`}
            value={this.props.defaultMessage}
            objectID=""
            onChange={() => this.onChange('', '', 0)}
          />
          {this.props.options
            .sort(this.compare)
            .map((option, i) => (
              <MenuItem
                key={`dropdown-${option.name ? option.name : option}-${i}`}
                value={option.name ? option.name : option}
                objectID={option.slug ? option.slug : option}
                onChange={(slug, value) => this.onChange(slug, value, i)}
              />
            ))}
        </ul>
      </div>
    );
  }
}

DropdownMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  placeholderId: PropTypes.string.isRequired,
};

DropdownMenu.defaultProps = {
  options: [],
};

export default withStyles(s)(DropdownMenu);
