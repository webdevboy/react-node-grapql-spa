import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";
import s from './ErrorPage.scss';

import Text from "../../../themes/lunajets/components/Primitives/Text";
import TextHtml from "../../../themes/lunajets/components/Primitives/TextHtml";
import Link from "../../../themes/lunajets/components/Primitives/Link";
import Image from "../../../themes/lunajets/components/Primitives/Image";
import logo from "./gfx/logo.svg";

class ErrorPage extends React.Component {
  static propTypes = {
    error: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    error: null,
  };

  render() {
    // if (__DEV__ && this.props.error) {
    //   return (
    //     <div>
    //       <h1>{this.props.error.name}</h1>
    //       <pre>{this.props.error.stack}</pre>
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
              We can't seem to find the page you're looking for.
            </p>
            <span className={cx(s.errorcode, "conduit")}>
              Error code : 500
            </span>
          </div>

          <div className={s.mainaction}>
            <a href="/" className="btn lt-red mx-auto">
              Continue to home
            </a>
          </div>

          <div className={cx("row", s.links)}>
            <a href="#" className={"conduit col-12 col-md-4"}>
              Book a flight
            </a>
            <a href="#" className={"conduit col-12 col-md-4"}>
              Search for empty legs
            </a>
            <a href="#" className={"conduit col-12 col-md-4"}>
              Contact Us
            </a>
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
