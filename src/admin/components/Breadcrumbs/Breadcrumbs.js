import React, { Component } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import _ from "lodash";
import history from "core/history";
import { Menu, MenuItem, MenuDivider, Popover, Intent, PopoverInteractionKind, Position } from "@blueprintjs/core";
import DropdownTools from "../NavBar/Dropdowns/Tools";
import FullNav from "../NavBar/Dropdowns/FullNav";
import Link from '../Link';

class Breadcrumbs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false      
    };

    this.levels = [props.route];
    this.checkRouteDepth(this.props.route);
    this.levels = this.levels.reverse();    
  }

  checkRouteDepth = (route) => {
    if (route.parent !== null) {
      this.levels.push(route.parent);
      this.checkRouteDepth(route.parent);
    }
  }

  goTo = (path)=> {
    history.push(path);
  }

  togglePoppover = (e) => {
    e.preventDefault();
    this.setState({
      toggled: !this.state.toggled,
    });
  }

  getLink = (index) => {
    const cut = this.levels.slice(0, index + 1);
    const path = cut.map(level => level.path).join('');
    return path;
  } 

  render() {
    const { route, replaceText, appendText = [] } = this.props;   

    return (
      <ul className="pt-breadcrumbs pt-dark">
        {
          this.levels.map((level, index) => {
            if (!index) {
              return (
                <li key={`breadcrumb-${index}`}>
                  <Popover
                    content={<FullNav handleClick={this.goTo} />}
                    interactionKind={PopoverInteractionKind.CLICK}
                    position={Position.RIGHT_TOP}
                    inline
                  >
                    <a className="pt-breadcrumbs-collapsed" />
                  </Popover>
                </li>
              );
            }

            if (level.name) {
              if (level.path === route.path) {
                return (
                  <li key={`breadcrumb-${index}`}>
                    <span className={"pt-breadcrumb-current"}>
                      { (replaceText) ? _.capitalize(replaceText) : _.capitalize(level.name)}
                    </span>
                  </li>
                );
              }
              return (
                <li key={`breadcrumb-${index}`}>
                  <Link to={this.getLink(index)} className="pt-breadcrumb">
                    <span>{_.capitalize(level.name)}</span>
                  </Link>
                </li>
              );
            } else {
              return null
            }

          })
        }

        { appendText.map(({text, link}, index) =>
            <li key={`breadcrumb-appended-${index}`}>
              { (link)
                ? <Link to={link} className="pt-breadcrumb-current">
                    <span>
                      {_.capitalize(text)}
                    </span>
                  </Link>
                : <span className="pt-breadcrumb-current">{_.capitalize(text)}</span>
              }
            </li>
        )}

      </ul>
    );
  }
}

export default Breadcrumbs;
