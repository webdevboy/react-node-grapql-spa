import React from "react";
// import CurrentUser from "../currentUser/currentUser";
import Switch from "../switch";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./NavBar.css";
import cx from "classnames";
import history from "core/history";
import { connect } from "react-redux";
import _ from "lodash";
import MenuIcon from "react-feather/dist/icons/menu";
import PlusCircle from "react-feather/dist/icons/plus-circle";
import X from "react-feather/dist/icons/x";
// import NavList from "./NavList";
// import { toggleNav } from "../../../redux/actions/navigation";
import { logout } from 'admin/actions/auth';

import NavItem from "./NavItem";
import PropTypes from "prop-types";
import Logo from "../Logo";

import { Menu, MenuItem, MenuDivider, Popover, Intent, PopoverInteractionKind, Position } from "@blueprintjs/core";
import FullNav from './Dropdowns/FullNav';

import NAVIGATION from './Navigation';
import Notifications from './Dropdowns/Notifications';

class NavBar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  goTo = (e, path) => {
    e.preventDefault();
    history.push(path);
  }

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { showNav, currentRoute, logout } = this.props;
    
    return (
      <nav className={cx(s.root, "pt-navbar pt-dark", "navbar-toggleable-md")}>

        <div className={cx("pt-navbar-group pt-align-left", s.nav)}>
          <div className={cx("pt-navbar-heading", s.logo)}>
            <Logo link={`http://www.lunatlantic.com`} />
          </div>

          <span className="pt-navbar-divider" />

          <div className={s.mainNav}>

            { NAVIGATION.map((nav, index) => <NavItem key={`nav-${index}`} goTo={this.goTo} {...nav} />) }

          </div>

        </div>

        <div className="pt-navbar-group pt-align-right">

          <Popover
            content={<FullNav goTo={this.goTo} />}
            interactionKind={PopoverInteractionKind.CLICK}
            position={Position.BOTTOM}
            className={s.dropdown}
          >
            <button className={cx("pt-button pt-minimal pt-icon-menu", s.collapseMenu)} />
          </Popover>

          <span className="pt-navbar-divider" />

          <button className="pt-button pt-minimal pt-icon-user" />

          <Popover
            content={<Notifications />}
            className={s.dropdown}
            interactionKind={PopoverInteractionKind.CLICK /*PopoverInteractionKind.HOVER_TARGET_ONLY*/}
            position={Position.BOTTOM_RIGHT}
            >
            <button className="pt-button pt-minimal pt-icon-notifications" />
          </Popover>
          
          <a href="/logout" onClick={this.logout} className="pt-button pt-minimal pt-icon-log-out" />
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(withStyles(s)(NavBar));


/**

            <Link to="/"><FormattedMessage {...messages.dashboard} /></Link>

            <li className={cx('nav-link', 'dropdown', s['nav-link'], s['dropdown'])}>

              <div className={cx('nav-link', 'dropdown-toggle', s['nav-link'], s['dropdown-toggle'], (lunajets.indexOf(pathname) !== -1 ? s.active : ''))} ref="dropdownToggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Lunajets</div>
              
              <div className={cx('dropdown-menu', s['dropdown-menu'])}>
                {this.checkPermission('emptylegs') ? <LinkItem to="/emptylegs"><FormattedMessage {...messages.emptylegs} /></LinkItem> : ''}
                {this.checkPermission('destinations') ?<LinkItem to="/destinations"><FormattedMessage {...messages.destinations} /></LinkItem>: ''}
                {this.checkPermission('aircrafts') ?<LinkItem to="/aircrafts"><FormattedMessage {...messages.aircrafts} /></LinkItem>: ''}
                {this.checkPermission('contacts') ?<LinkItem to="/contacts"><FormattedMessage {...messages.contacts} /></LinkItem>: ''}
                {this.checkPermission('team') ?<LinkItem to="/team"><FormattedMessage {...messages.team} /></LinkItem>: ''}
              </div>

            </li>

            <li className={cx('nav-link', 'dropdown', s['nav-link'], s.dropdown)}>
              <div className={cx('nav-link', 'dropdown-toggle',s['nav-link'], s['dropdown-toggle'], (website.indexOf(pathname) !== -1 ? s.active : ''))} ref="dropdownToggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Website</div>
              <div className={cx('dropdown-menu',s['dropdown-menu'])}>
                {this.checkPermission('pages') ? <LinkItem to="/pages"><FormattedMessage {...messages.pages} /></LinkItem>: ''}
                {this.checkPermission('components') ? <LinkItem to="/components"><FormattedMessage {...messages.components} /></LinkItem>: ''}
                {this.checkPermission('templates') ? <LinkItem to="/templates"><FormattedMessage {...messages.templates} /></LinkItem>: ''}
                {this.checkPermission('articles') ? <LinkItem to="/articles"><FormattedMessage {...messages.articles} /></LinkItem>: ''}
                {this.checkPermission('events') ? <LinkItem to="/events"><FormattedMessage {...messages.events} /></LinkItem>: ''}
                {this.checkPermission('menus') ? <LinkItem to="/menus"><FormattedMessage {...messages.menus} /></LinkItem>: ''}
              </div>
            </li>

            {this.checkPermission('chat') ? <Link to="/chat"><FormattedMessage {...messages.chat} /></Link>: ''}
            {this.checkPermission('media_center') ? <Link to="/mediacenter"><FormattedMessage {...messages.mediacenter} /></Link>: ''}
            {this.checkPermission('users') ? <Link to="/users"><FormattedMessage {...messages.users} /></Link>: ''}
            {this.checkPermission('translations') ? <Link to="/translation"><FormattedMessage {...messages.translation} /></Link>: ''}

            
            <li className={cx('nav-link', 'dropdown', s['nav-link'], s.dropdown, (tools.indexOf(pathname) !== -1 ? s.active : ''))}>
              <div className={cx('nav-link', 'dropdown-toggle',s['nav-link'], s['dropdown-toggle'])} data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Tools</div>
              <div className={cx('dropdown-menu',s['dropdown-menu'])}>
                {this.checkPermission('urls') ? <LinkItem  to="/url-manager"><FormattedMessage {...messages.urlmanager} /></LinkItem>: ''}
                {this.checkPermission('email_manager') ? <LinkItem  to="/email-manager"><FormattedMessage {...messages.emailManager} /></LinkItem>: ''}
                {this.checkPermission('push_notifications') ? <LinkItem  to="/push-notifications"><FormattedMessage {...messages.pushNotifications} /></LinkItem> : ''}
                {this.checkPermission('logs') ? <LinkItem  to="/logs"><FormattedMessage {...messages.logs} /></LinkItem>: ''} 
                {this.checkPermission('render') ? <LinkItem  to="/render"><FormattedMessage {...messages.render} /></LinkItem>: ''}
                {this.checkPermission('admin_translation') ? <LinkItem  to="/admin-translation"><FormattedMessage {...messages.adminTranslation} /></LinkItem>: ''}                
              </div>
            </li>

            <Link to="/settings">Settings</Link>


        <CurrentUser/>
        <Switch/>

 */
