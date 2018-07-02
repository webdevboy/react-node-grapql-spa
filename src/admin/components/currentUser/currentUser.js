import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './currentUser.css';
import cx from 'classnames'; 
import avatar from './gfx/avatar.png'
import { connect } from 'react-redux';
import NavItem from '../NavBar/NavItem';
import navbar from '../NavBar/NavBar.css';

const messages = defineMessages({
  welcome: {
    id: 'currentUser.welcome',
    defaultMessage: 'Welcome, ',
    description: 'welcome current user',
  },
  logout: {
    id: 'currentUser.logout',
    defaultMessage: 'Log Out',
    description: 'welcome current user',
  },
  myAccount: {
    id: 'currentUser.myAccount',
    defaultMessage: 'My Account',
    description: 'welcome current user',
  },
  notifications: {
    id: 'currentUser.notifications',
    defaultMessage: 'Notifications',
    description: 'welcome current user',
  },
  changePassword: {
    id: 'currentUser.changePassword',
    defaultMessage: 'Change Password',
    description: 'welcome current user',
  },
});


const dropdown = [
  {
    to: '/me/settings',
    label: messages.myAccount
  },
  {
    to: '/me/change-password',
    label: messages.changePassword
  },
  {
    to: '/me/notifications',
    label: messages.notifications
  },
  {
    isLogout: true,
    label: messages.logout
  },
];

class CurrentUser extends React.Component {
  
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  componentDidMount() {
    
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div className={cx(s.root)}>

        <div className={s.welcome}>
          <span>
            <FormattedMessage {...messages.welcome} />
            <b>{user.last_name}</b>
          </span>
        </div>

        <ul className={cx(s.userNav, 'nav')}>
          <li className={cx(s.user, 'dropdown')}>
            <style type="text/css" dangerouslySetInnerHTML={{ __html: `
              .${s.avatar} {
                background-image: url('${user.avatar_path ? user.avatar_path : avatar}');
              }
            ` }} />
            <a 
              className={cx(s.avatar, 'nav-link', 'user-avatar', 'dropdown-toggle')}
              id='user-dropdown'
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"></a>
            <ul className={cx(navbar.dropdownMenu, 'dropdown-menu', 'dropdown-menu-right')} aria-labelledby='user-dropdown'>
              { dropdown.map((item, index) => {
                return <NavItem key={index} {...item} />
              })}
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(withStyles(navbar, s)(CurrentUser));