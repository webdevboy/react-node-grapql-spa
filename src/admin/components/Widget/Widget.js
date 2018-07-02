import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Switch } from "@blueprintjs/core";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./Widget.css";

export class Widget extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    toggle: PropTypes.any,
  }

  static defaultProps = {
    toggle: false,
  }

  render() {
    const { interactive, title, toggle, children } = this.props;
    return (
      <Card className={s.widget} elevation={3} interactive={interactive || false}>
        <h5 className={s.header}>
          <span>{title}</span>
          { (toggle) ? <Switch checked={toggle.state} onChange={toggle.action} /> : null }
        </h5>
        <div className={s.content}>
          { children }
        </div>
      </Card>
    );
  }
}

export default withStyles(s)(Widget);
