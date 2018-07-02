import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './customer-area.scss';
import iconDashboard from './gfx/dashboard.svg';
import iconEmptyLegs from './gfx/empty-legs.svg';
import iconMessage from './gfx/message.svg';
import iconPreferences from './gfx/preferences.svg';
import iconMyFlights from './gfx/my-flights.svg';
import iconDashboardMobile from './gfx/dashboard-m.svg';
import iconEmptyLegsMobile from './gfx/empty-legs-m.svg';
import iconMessageMobile from './gfx/message-m.svg';
import iconPreferencesMobile from './gfx/preferences-m.svg';
import iconMyFlightsMobile from './gfx/my-flights-m.svg';
import { disableFragmentWarnings } from 'graphql-tag';

class Sidebar extends Component {

  render() {
    const { current, user } = this.props;

    return (
      <div className={s.sidebar}>
        <div className={cx(s.welcome, "d-sm-block d-none")}>
          <span className={s.label}>Welcome</span>
          <br/>
          <span className={s.title}>
            { user.salutation } { user.last_name || user.first_name }
          </span>
        </div>
        <ul className={cx("nav flex-column nav-pills d-none d-sm-flex", s.sidenav)}>
          <a className={cx("nav-link", (current === 'dashboard') ? 'active' : null)} href="#dashboard" onClick={e => this.props.onChange(e, 'dashboard')}>
            <div>
              <img className={s.icon} src={iconDashboard} />
              <span>Dashboard</span>
            </div>
          </a>
          <a className={cx("nav-link", (current === 'my-flights') ? 'active' : null)} href="#my-flights" onClick={e => this.props.onChange(e, 'my-flights')}>
            <div>
              <img className={s.icon} src={iconMyFlights} />
              <span>My Flights</span>
            </div>
          </a>
          <a className={cx("nav-link", (current === 'messages') ? 'active' : null)} href="#messages" onClick={e => this.props.onChange(e, 'messages')}>
            <div>
              <img className={s.icon} src={iconMessage} />
              <span>Messages</span>
            </div>
          </a>
          <a className={cx("nav-link", (current === 'empty-legs') ? 'active' : null)} href="#empty-legs" onClick={e => this.props.onChange(e, 'empty-legs')}>
            <div>
              <img className={s.icon} src={iconEmptyLegs} />
              <span>Empty Legs</span>
            </div>
          </a>
          <a className={cx("nav-link", (current === 'preferences') ? 'active' : null)} href="#preferences" onClick={e => this.props.onChange(e, 'preferences')}>
            <div>
              <img className={s.icon} src={iconPreferences} />
              <span>My Profile</span>
            </div>
          </a>
        </ul>
        <ul className={cx("nav nav-pills d-flex d-sm-none", s.mobile)}>
          <a className={cx("nav-link py-2 px-1", (current === 'dashboard') ? 'active' : null)} href="#dashboard" onClick={e => this.props.onChange(e, 'dashboard')}>
            <div className="d-flex flex-column">
              <img className={s.icon} src={iconDashboardMobile} />
              <span className={s.text}>Dashboard</span>
            </div>
          </a>
          <a className={cx("nav-link py-2 px-1", (current === 'my-flights') ? 'active' : null)} href="#my-flights" onClick={e => this.props.onChange(e, 'my-flights')}>
            <div className="d-flex flex-column">
              <img className={s.icon} src={iconMyFlightsMobile} />
              <span className={s.text}>My Flights</span>
            </div>
          </a>
          <a className={cx("nav-link py-2 px-1", (current === 'messages') ? 'active' : null)} href="#messages" onClick={e => this.props.onChange(e, 'messages')}>
            <div className="d-flex flex-column">
              <img className={s.icon} src={iconMessageMobile} />
              <span className={s.text}>Messages</span>
            </div>
          </a>
          <a className={cx("nav-link py-2 px-1", (current === 'empty-legs') ? 'active' : null)} href="#empty-legs" onClick={e => this.props.onChange(e, 'empty-legs')}>
            <div className="d-flex flex-column">
              <img className={s.icon} src={iconEmptyLegsMobile} />
              <span className={s.text}>Empty Legs</span>
            </div>
          </a>
          <a className={cx("nav-link py-2 px-1", (current === 'preferences') ? 'active' : null)} href="#preferences" onClick={e => this.props.onChange(e, 'preferences')}>
            <div className="d-flex flex-column">
              <img className={s.icon} src={iconPreferencesMobile} />
              <span className={s.text}>My Profile</span>
            </div>
          </a>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

const mapDispatchToProps = {
  
}

export default withStyles(s)(connect(mapStateToProps, mapDispatchToProps)(Sidebar))
