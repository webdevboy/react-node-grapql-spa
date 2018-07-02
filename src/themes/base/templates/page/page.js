import React, { Component } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './page.css';

class PageTemplate extends Component {
  render() {	
    const { children } = this.props;
    return (
      <div className={s.blank}>
        { children }
      </div>
    );
  }
}

const Template = withStyles(s)(PageTemplate);

export default Template;
