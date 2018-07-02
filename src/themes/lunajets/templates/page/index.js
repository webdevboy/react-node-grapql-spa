import React, { Component } from "react";
import cx from "classnames";
import gql from "graphql-tag";
import { connect } from 'react-redux';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import s from "./page.css";
import Header from "../header";
import Subscriptor from "../../components/Footer/Subscriptor";
import JoinTeam from "../../components/Footer/JoinTeam";
import CallUs from "../../components/Footer/CallUs";
import Footer from "../footer";
import CookieFooter from "../cookie_footer";
import Auth from "../../components/Content/Auth/Auth";

class Page extends Component {

  static contextTypes = {
    query: PropTypes.object,
  }

  /*
    REVIEW THIS
    we shouldnt use state & cookies here, the component should be dummy to those globals
  */
  state = {
    isCookieFooter: false,
  }
  componentWillMount() {
    if (process.env.BROWSER) {
      this.setState({
        isCookieFooter: (!Cookies.get('is_cookie_footer') && Cookies.get('is_cookie_footer') !== 'set'),
      });
    }
  }
  toggleIsCookieFooter = () => {
    Cookies.set('is_cookie_footer', 'set');
    this.setState({
      isCookieFooter: false,
    });
  }
  // END REVIEW BLOCK HERE

  render() {
    const { children, header, footer, subscriptor, joinTeam, callUs, post, ui } = this.props;
    const { query } = this.context;
    const { isCookieFooter } = this.state
    console.log(query && query.action);
   
    return (
      <div className={cx(s.default, s["page-container"])}>

        { 
          ((query && query.action) || (ui.authModal.action && ui.authModal.open))
            ? <Auth action={query && query.action || ui.authModal.action || null} />
            : null
        }

        { (header) !== false ? <Header {...header} /> : null }

        <div className={cx("post-content", s.content)}>
          { children }
        </div>

        { (subscriptor !== false && !joinTeam && !callUs) ? <Subscriptor {...subscriptor} /> : null }

        { (joinTeam) ? <JoinTeam /> : null }

        { (callUs) ? <CallUs /> : null }

        { (footer) !== false ? <Footer {...subscriptor} post={post} /> : null }

        { (isCookieFooter) ? <CookieFooter toggleIsCookieFooter={this.toggleIsCookieFooter} /> : null }

      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => ({
  ui,
});

export default connect(mapStateToProps)(withStyles(s)(Page));
