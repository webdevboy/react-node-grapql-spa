import React, { Component } from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import FaSearch from "react-icons/lib/fa/search";
import MdArrow from "react-icons/lib/md/keyboard-backspace";
import Input from "../../Primitives/Input";
import s from "./Search.scss";

class Search extends Component {
  constructor(props) {
    super(props);
    const { initKeyword } = this.props;
    this.state = {
      keyword: initKeyword ? initKeyword : "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.preventEnter = this.preventEnter.bind(this);
  }
  onChange(event) {
    this.setState({ keyword: event.target.value });
  }
  onSearch() {
    this.props.onSearch(this.state.keyword);
  }
  preventEnter = ev => {
    if (ev.keyCode == 13) {
      ev.preventDefault();
      ev.stopPropagation();
      this.props.onSearch(this.state.keyword);
      return false;
    }
  };
  render() {
    const { placeholder, id } = this.props;
    return (
      <div className={cx(s["root"])}>
        <FaSearch className={cx(s["icon-search"])} size={38} color="gray" />
        <Input
          id={id}
          value={this.state.keyword}
          placeholderId={placeholder}
          onKeyDown={this.preventEnter}
          onChange={this.onChange}
          pencilStyle={{ right: "50px", padding: "5px", color: "#7d7d7d" }}
        />
        <MdArrow
          className={cx(s["icon-arrow"])}
          style={{ transform: "rotate(180deg)" }}
          size={38}
          color="red"
          onClick={this.onSearch}
        />
      </div>
    );
  }
}

export default withStyles(s)(Search);

export const component = {
  defaultProps: Search.defaultProps,
  propTypes: Search.propTypes,
  propSchema: Search.propSchema,
  category: "widget",
  tags: ["search"],
};
