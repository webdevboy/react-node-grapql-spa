import React, { Component } from 'react';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from 'classnames';
import s from './Header.css';

class Header extends Component {
  render() {
    const { background, children } = this.props;
    return (
      <div className={cx("layout-header" ,s.root)} style={{backgroundImage: `url('${background}')`}}>
        <div className={s.wrapper}>
          {children}
        </div>
      </div>
    )
  }
}

export default withStyles(s)(Header)
