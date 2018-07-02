import React from 'react';
import PropTypes from 'prop-types';
import history from 'core/history';
import cx from 'classnames'; 
import s from 'admin/components/NavBar/NavBar.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import LinkItem from 'admin/components/linkItem';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {

    const { path: { pathname }, to, children } = this.props;

    return <li className={cx('nav-item',s['nav-item'], (to === pathname ? s['active'] : ''))}>
              <LinkItem to={to}>{children}</LinkItem>
            </li>;
  }
}

const mapStateToProps = (state) => ({
  path: state.runtime.path,
});

export default connect(mapStateToProps)(withStyles(s)(Link));