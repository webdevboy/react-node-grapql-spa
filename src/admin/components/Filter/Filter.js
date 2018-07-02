import React, { Component } from "react";
import { Popover, PopoverInteractionKind, Position, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import cx from "classnames";
import s from "./Filter.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { Tooltip2 as Tooltip } from "@blueprintjs/labs";
import t from "../TooltipLabel/TooltipLabel.css";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null,
    };
  }

  reset = (field) => {
    this.setState({
      optionSelected: null,
    }, () => {
      this.props.reset(field);
    });
  }

  select = ({ value, label }) => {
    this.setState({
      optionSelected: label,
    }, () => {
      this.props.select(this.props.field, value);
    });
  }

  render() {
    const {
      type, field, label, options, tooltip, select, search,
    } = this.props;

    if (type === "search") {
      return (
        <div className={cx("pt-input-group lj-search", tooltip ? "pt-tooltip-inside" : "")}>
          <span className="pt-icon pt-icon-search" />
          <input type="text" className="pt-input" placeholder={label} onChange={search} />
          { tooltip ?
            <Tooltip tooltipClassName={t.tooltip} content={tooltip} >
              <span className="pt-icon pt-icon-help" />
            </Tooltip>
            : null
          }
        </div>
      );
    }

    if (type === "select") {
      const Options = (
        <Menu>
          <MenuDivider title={label} />
          <MenuItem text="All" key={`${label}-opt-all`} onClick={() => this.reset(field)} />
          { options.map((option, index) => <MenuItem text={option.label} key={`${label}-opt-${index}`} onClick={() => this.select(option)} />)}
        </Menu>
      );

      return (
        <Popover
          content={Options}
          interactionKind={PopoverInteractionKind.CLICK}
          position={Position.BOTTOM_RIGHT}
          inline
        >
          <button className={cx("pt-button pt-minimal", s.btn, (this.state.optionSelected !== null) ? s.isActive : null)}>
            {this.state.optionSelected || label}
            <span style={{ margin: "0 0 0 5px" }} className="pt-icon pt-icon-double-caret-vertical" />
          </button>
        </Popover>
      );
    }

    return null;
  }
}

export default withStyles(s, t)(Filter);
