import React, { Component } from "react";
import { connect } from "react-redux";
import gql from "graphql-tag";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Query, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import MyFlights from './MyFlights';
import Messages from './Messages';
import Dashboard from './Dashboard';
import MyProfile from './MyProfile';
import EmptyLegs from './EmptyLegs';
import AccountFooter from "../account_footer";
import s from './customer-area.scss';
import Page from '../page';

const page = {
  subscriptor: false,
  footer: false,
  header: {
    request_flight: false,
  }
};

class CustomerArea extends Component {

  static contextTypes = {
    isMobile: PropTypes.bool,
  }

  state = {
    section: this.props.section || 'dashboard'
  }

  changeSection = (e, section) => {
    e.preventDefault();
    this.setState({ section });
  }

  componentWillUnmount() {
    console.log('WILL UNMOUNT', this);
  }

  getContent = (section) => {
    switch (section) {
      case 'dashboard':
        return (<Dashboard />);
      case 'my-flights':
        return (<MyFlights />);
      case 'messages':
        return (<Messages />);
      case 'preferences':
        return <MyProfile />;
      case 'empty-legs':
        return (<EmptyLegs />);
      default:
        return (<Dashboard />);
    };
  }

  render() {    
    const { isMobile } = this.context;
    return (
      <div>
        <Page {...page}>
          <div className="fix-nav-height" style={{height:'60px'}} />
          <div className={cx("container", s.container)}>
            <div className="row mt-sm-4 mt-0 mb-3 mb-sm-5">
              <div className={cx((!isMobile) ? "col-lg-3 d-none d-sm-block" : "col-lg-3 dk-blue-bg d-block d-sm-none")}>
                <Sidebar current={this.state.section} onChange={this.changeSection} />
              </div>
              <div className={cx((!isMobile) ? ["col-lg-9 d-sm-block p-0", s.content] : "col-lg-9 p-2 d-block")} style={{background: (isMobile) ? 'white' : '#f9f9f9'}}>
                { this.getContent(this.state.section) }
              </div>
            </div>
          </div>
          <AccountFooter />
        </Page>
      </div>
    );
  }

}

const mapStateToProps = () => ({});

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(CustomerArea));