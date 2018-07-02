/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";
import s from './ErrorPage.css';
import Image from "../themes/lunajets/components/Primitives/Image";
import logo from "./gfx/logo.svg";

class ErrorPage extends React.Component {
  // static propTypes = {
  //   error: PropTypes.shape({
  //     name: PropTypes.string.isRequired,
  //     message: PropTypes.string.isRequired,
  //     stack: PropTypes.string.isRequired,
  //   }).isRequired,
  // };

  render() {
    // if (__DEV__) {
    //   const { error } = this.props;
    //   return (
    //     <div>
    //       <h1>{error.name}</h1>
    //       <p>{error.message}</p>
    //       <pre>{error.stack}</pre>
    //     </div>
    //   );
    // }

    return (
      <div className={s.root}>
        <div className={cx(s.container, "container")}>
          <h1 className={cx(s.title, "conduit")}>
            OOPS!
          </h1>
          <div className={s.msgwrapper}>
            <p className={s.msg}>
              {/* <Text id="client.error.we-cant-find" defaultMessage="We can't seem to find the page you're looking for." /> */}
            </p>
            <span className={cx(s.errorcode, "conduit")}>
              {/* <Text id="client.error.error-code" defaultMessage="Error code : 500" /> */}
            </span>
          </div>

          <div className={s.mainaction}>
            <a href="/" className="btn lt-red mx-auto">
              {/* <Text id="client.error.continue-to-home" defaultMessage="Continue to home" /> */}
            </a>
          </div>

          <div className={cx("row", s.links)}>
            {/* <Link to="#" className={"conduit col-12 col-md-4"} text="Book a flight" id="client.error.book-a-flight" />
            <Link
              to="#"
              className={"conduit col-12 col-md-4"}
              text="Search for empty legs"
              id="client.error.search-empty-legs"
            />
            <Link to="#" className={"conduit col-12 col-md-4"} text="Contact Us" id="client.error.contact-us" /> */}
          </div>

          <div className={s.logo}>
            <Image source={logo} width="100px" height="20px" />
          </div>
        </div>
      </div>
    );  
  }
}

export { ErrorPage as ErrorPageWithoutStyle };
export default withStyles(s)(ErrorPage);