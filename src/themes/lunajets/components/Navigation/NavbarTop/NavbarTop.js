import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Phone from "react-feather/dist/icons/phone";
import LanguageSwitcher from "../../i18n/LanguageSwitcher";
import CurrencySwitcher from "../../i18n/CurrencySwitcher";
import ContactsDropdown from "../../Navigation/ContactsDropdown";
import Text from "../../Primitives/Text";
import FlyNow from "../../Lunajets/FlyNow";
import s from "./NavbarTop.css";
import Link from "../../Primitives/Link";
import { toggleEditMode, logout } from "../../../actions/auth";
import { openAuthModal } from "../../../actions/ui";

class NavbarTop extends Component {

  static propTypes = {
    step: PropTypes.number,
  };

  static defaultProps = {
    step: 0,
  };

  logout = (e) => {
    e.preventDefault();
    this.props.logout()
  }

  openLogin = (e) => {
    e.preventDefault();
    this.props.openAuthModal({ action: 'login' });
  }

  toggleEditMode = (e) => {
    e.preventDefault();
    this.props.toggleEditMode();
  };

  render() {
    const { auth, step } = this.props;
    if (step) return null;

    return (
      <div className="navbar-top">
        <div className={cx("d-none d-sm-block")}>
          <div className={s.row}>
            <div className={s.column}>
              <div className={s.section}>
                <div className={cx(s["column-section"])}>
                  <nav className={s.navWrapper}>
                    <ul className={cx(s.topnav)}>

                      { 
                        (auth.is_admin && auth.user.role.toLowerCase() === 'admin')
                        ? 
                          <li className="nav-item dropdown">
                            <a href="#" className={cx("nav-link")} onClick={this.toggleEditMode}>
                              Admin Edit Mode: { auth.edit_mode ? 'ON' : 'OFF' }
                            </a>
                          </li>
                        : null
                      }

                      {
                        (auth.user && auth.user.role === 'customer')
                        ?
                          <li className="nav-item dropdown">
                            <Link to="/customer-area" className={cx("nav-link")}>
                              <Text defaultMessage="My account" id="client.navBarTop.account" />
                            </Link>
                          </li>
                        : null
                      }
                      
                      <li className="nav-item dropdown">
                        {
                          (auth.token && auth.user && auth.user.role)
                          ? 
                            <a href="#logout" className={cx("nav-link")} onClick={this.logout}>
                              <Text defaultMessage="Logout" id="client.navBarTop.logout" />
                            </a>
                         : 
                            <a href="#login" className={cx("nav-link")} onClick={this.openLogin}>
                              <Text defaultMessage="Login" id="client.navBarTop.login" />
                            </a>
                        }
                      </li>

                      <ContactsDropdown />
                      <FlyNow />
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  step: state.requestFlight.step,
  auth: state.auth,
});

export default connect(mapStateToProps, { toggleEditMode, logout, openAuthModal })(withStyles(s)(NavbarTop));
