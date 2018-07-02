import React, { Component } from "react";
import PropTypes from "prop-types";
import Promise from "bluebird";
import cx from "classnames";
import gql from "graphql-tag";
import Navbar from "../../components/Navigation/Navbar";
import NavbarTop from "../../components/Navigation/NavbarTop";
import RequestFlight from "../../components/Forms/RequestFlight";
class Header extends Component {
  static propTypes = {
    before_header: PropTypes.any,
    children: PropTypes.any,
    after_header: PropTypes.any,
    navbar_top: PropTypes.any,
    navbar: PropTypes.any,
    request_flight: PropTypes.any,
  };

  static defaultProps = {
    before_header: null,
    after_header: null,
    navbar_top: true,
    navbar: true,
    request_flight: true,
    children: [
      <NavbarTop />,
      <Navbar />,
    ],
  };

  render() {
    const { before_header, after_header, navbar_top, navbar, request_flight } = this.props;

    const children = [
      navbar_top !== false ? <NavbarTop {...{ navbar_top }} /> : null,
      navbar !== false ? <Navbar {...navbar} /> : null,
      request_flight !== false ? <RequestFlight key="global" header {...request_flight} /> : null,
    ];

    return (
      <div className="header">
        {before_header}
        {children}
        {after_header}
      </div>
    );
  }
}

export default Header;
