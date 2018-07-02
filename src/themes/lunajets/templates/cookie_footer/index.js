import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames';
import s from './cookie.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Text from "../../components/Primitives/Text";
import Link from "../../components/Primitives/Link";
import XCircle from "react-feather/dist/icons/x-circle";

const defaultCookie = `This website uses cookies. To deliver website functionality, for analysis and for advertising as described in our Data Privacy. To see the cookies we serve and to set your own preferences, please see our cookie consent menu. Otherwise, if you agree to our use of cookies, please continue to use our site.`;

class CookieFooter extends Component {

  render() {
    const { toggleIsCookieFooter } = this.props;
    return (
      <div className={cx(s['cookie-footer'])}>
        <div className={cx(s['close'])} onClick={() => toggleIsCookieFooter()}>
          <XCircle color="#d4d3d3" size="20"/>
        </div>
        <h1>
          <Text id="client.cookie.footer.title" defaultMessage="This site uses cookies" />
        </h1>
        <p>
          <Text id="client.cookie.footer.content" defaultMessage={defaultCookie} />
        </p>
      </div>
    )
  }
}

export default withStyles(s)(CookieFooter);
