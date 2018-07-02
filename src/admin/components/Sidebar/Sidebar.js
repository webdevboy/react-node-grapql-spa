import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

const Expander = ({ hidden, toggle, collapsed }) => {
  if (hidden) {
    return null
  } else {
    return (
      <div className={'expander'} onClick={toggle}>
        { !collapsed ? <span className="pt-icon pt-icon-double-chevron-right"></span> : <span className="pt-icon pt-icon-double-chevron-left"></span> }
      </div>
    );
  }
}

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    }
  }

  toggleSidebar = () => this.setState({ collapsed: !this.state.collapsed });

  closeSidebar = () => this.setState({ collapsed: false });

  render() {
    const { expandable, float, children, className, hasOverlay, fullWidth } = this.props;
    const { collapsed } = this.state;

    return (
      <div className={cx('sidebar', (!hasOverlay) ? 'slide-enter slide-exit' : '', (!hasOverlay) ? (collapsed) ? 'slide-exit-active' : 'slide-enter-active' : '', (!float) ? 'fixed' : 'float', className, fullWidth? 'full-width': '') }>
        <Expander hidden={!expandable} toggle={this.toggleSidebar} collapsed={collapsed} />
        {children}
      </div>
    );
  }

}

export default Sidebar; 