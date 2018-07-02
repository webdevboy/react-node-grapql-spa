import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './actions.css';
import cx from 'classnames';
import Filters from '../filters';


class Actions extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className={s['container']}>
          <button className={s['actionsBtns']} onClick={this.props.handleClick}>{this.props.first_action}</button>
          <button className={cx(s['actionsBtns'], this.props.array.length ? '' : s['deactive'])} onClick={this.props.handleSecondClick}>{ this.props.array.length === 1 ? this.props.second_action : this.props.second_action}</button>
      </div>
    );
  }
}

export default withStyles(s)(Actions);

