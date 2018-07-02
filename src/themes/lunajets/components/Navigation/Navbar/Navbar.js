import React, { Component } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Menu from "react-feather/dist/icons/menu";
import Search from "react-feather/dist/icons/search";
import { connect } from "react-redux";
import { ChevronRight, X } from "react-feather";
import history from "core/history";
import Link from "../../Primitives/Link";
import Text from "../../Primitives/Text";
import Logo from "../../Lunajets/Logo";
import s from "./Navbar.css";
import { showSearch } from "../../../actions/navbar";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      showNav: false,
      sticky: false,
    };
  }

  observeScroll = () => {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPos > 35) {
      if (this.state.prevScroll < scrollPos) {
        // going down
        this.setState({
          sticky: true,
          prevScroll: scrollPos,
        });
      } else {
        // going up
        this.setState({
          sticky: true,
          prevScroll: scrollPos,
        });
      }
    } else {
      this.setState({
        sticky: false,
        prevScroll: scrollPos,
      });
    }
  };

  componentDidMount = () => {
    window.addEventListener("scroll", this.observeScroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.observeScroll);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.showSearch) {
      this.toggleSearch();
    }
  }

  search = (ev, bool) => {
    this.setState({
      searching: bool,
    });
  };

  toggleNav = e => {
    e.preventDefault();

    this.setState({
      searching: false,
      showNav: !this.state.showNav,
    });
  };

  toggleSearch = e => {
    e ? e.preventDefault() : null;
    this.setState(
      {
        searching: !this.state.searching,
        showNav: false,
      },
      () => {
        if (this.state.searching && this.refs.search) {
          this.refs.search.focus();
        }
      }
    );
  };

  searchBlur = e => {
    e ? e.preventDefault() : null;
    const { showSearch, setSearchStatus } = this.props;
    const { searching } = this.state;
    if (showSearch || searching) {
      setSearchStatus(false);
    }
    this.setState({
      searching: false,
    });
  };

  enter = e => {
    const { intl } = this.props;
    const code = e.which; // recommended to use e.which, it's normalized across browsers
    if (code == 13) e.preventDefault();
    if ((code == 32 || code == 13 || code == 188 || code == 186) && e.target.value !== "") {
      // pressed ENTER KEY
      const searchQuery = encodeURI(e.target.value);
      history.push(`/${intl.locale}/search?search_query=${searchQuery}`);
    }
  };

  scrollToTop = e => {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  };

  render() {
    const { isHomePage } = this.props;
    const { searching, showNav } = this.state;

    return (
      <div
        className={cx(
          s.menu,
          showNav ? s.show : null,
          this.props.step ? s.sticky : null,
          this.state.sticky ? s.sticky : null
        )}
        ref={el => (this.navigation = el)}
      >
        <div className={s.column}>
          <div className={s.section}>
            <div className={cx(s["column-section"])}>
              <nav className={s.navigation}>
                <button className={cx(s["nav-btn"], s.hamburger)} onClick={this.toggleNav}>
                  <span>{showNav ? <X color="#FFF" size="24" /> : <Menu color="#FFF" size="24" />}</span>
                </button>

                {searching ? (
                  <div className={s.searchBar}>
                    <input
                      onBlur={this.searchBlur}
                      onKeyDown={this.enter}
                      type="search"
                      ref="search"
                      placeholder="Search . . ."
                      autoFocus
                      className={s.searchInput}
                    />
                  </div>
                ) : (
                  <div className={s.menuWithLogo}>
                    <div className={cx(s["column-section"], s.logoRow)}>
                      <Logo isHomePage={isHomePage} scrollToTop={this.scrollToTop} />
                    </div>

                    <ul className={cx(s.navLinks)}>
                      <li className={searching ? s.disabled : ""}>
                        <Link
                          to="/private-jet-charter"
                          text="Private Jet Charter"
                          id="client.navBar.link.priviate.jet.charter"
                        />
                      </li>
                      <li className={searching ? s.disabled : ""}>
                        <Link to="/empty-legs" text="Empty Legs" id="client.navBar.link.empty.legs" />
                      </li>
                      <li className={searching ? s.disabled : "dropdown"}>
                        <Link
                          className="dropdown-toggle"
                          to="/services"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          text="Services"
                          id="client.navBar.link.services"
                        />
                        <div className="dropdown-menu">
                          <Link
                            to="/#"
                            text="Corporates"
                            id="client.navBar.link.services.dropdown.corporates"
                            className={cx("dropdown-item")}
                          />
                          <Link
                            to="/#"
                            text="Services"
                            id="client.navBar.link.services.dropdown.services"
                            className={cx("dropdown-item")}
                          />
                          <Link
                            to="/#"
                            text="Our Tips"
                            id="client.navBar.link.why.services.dropdown.ourtips"
                            className={cx("dropdown-item")}
                          />
                        </div>
                      </li>
                      <li className={searching ? s.disabled : ""}>
                        <Link to="/fleet" text="Fleet" id="client.navBar.link.fleet" />
                      </li>

                      {/* Why Lunajets dropdown */}
                      <li className={searching ? s.disabled : "dropdown"}>
                        {/* <Link
                          to="/#"
                          text="Why Lunajets"
                          id="client.navBar.link.why.lunajets"
                          className={cx("dropdown-toggle")}
                        /> */}

                        <Link
                          className="dropdown-toggle"
                          to="/#"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          text="Why Lunajets"
                          id="client.navBar.link.why.lunajets"
                        />
                        <div className="dropdown-menu">
                          <Link
                            to="/#"
                            text="Team"
                            id="client.navBar.link.why.lunajets.team"
                            className={cx("dropdown-item")}
                          />
                          <Link
                            to="/#"
                            text="Prices"
                            id="client.navBar.link.why.lunajets.prices"
                            className={cx("dropdown-item")}
                          />
                          <Link
                            to="/#"
                            text="Testimonials"
                            id="client.navBar.link.why.lunajets.testimonials"
                            className={cx("dropdown-item")}
                          />
                          <Link
                            to="/#"
                            text="Accreditations"
                            id="client.navBar.link.why.lunajets.accreditations"
                            className={cx("dropdown-item")}
                          />
                          <Link
                            to="/#"
                            text="Social Responsibility"
                            id="client.navBar.link.why.lunajets.csr"
                            className={cx("dropdown-item")}
                          />
                          <Link
                            to="/#"
                            text="Partners"
                            id="client.navBar.link.why.lunajets.partners"
                            className={cx("dropdown-item")}
                          />
                          <Link
                            to="/#"
                            text="Our History"
                            id="client.navBar.link.why.lunajets.history"
                            className={cx("dropdown-item")}
                          />
                        </div>
                      </li>
                      <li className={cx(searching ? s.disabled : "", s["fly-now"])}>
                        <a to="#" className={cx(s.flynow)}>
                          <strong>
                            <Text defaultMessage="FLY NOW" id="client.navBar.flyNow" />
                          </strong>
                          <ChevronRight size={18} />
                        </a>
                      </li>
                    </ul>
                  </div>
                )}

                <button className={cx(s["nav-btn"], s.search)} onClick={this.toggleSearch}>
                  <span>
                    <Search size="24" onClick={this.toggleSearch} />
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (!ownProps.editor) {
    return {
      step: state.requestFlight.step || 0,
      showSearch: state.navbar.showSearch,
      intl: {
        locale: state.intl.locale,
        urls: state.intl.urls,
      },
    };
  }
};

NavBar.propSchema = {};
NavBar.propTypes = {
  step: PropTypes.number,
};
NavBar.defaultProps = {
  step: 0,
};

export default connect(mapStateToProps, { setSearchStatus: showSearch })(withStyles(s)(NavBar));
