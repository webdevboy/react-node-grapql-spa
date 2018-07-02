import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import logo from "./LJ_logo_new_white.svg";
import s from "./Logo.css";
import Link from "../../Primitives/Link";
import Image from "../../Primitives/Image";

const Logo = props => {
  const { tagline, className, editor = false, children, isHomePage, scrollToTop } = props;
  const logoWithTagline = tagline == "true" ? true : false;
  const isOnEditor = editor === "true" ? true : false;

  return (
    <div {...props} className={cx(s.logo, logoWithTagline ? s.tagline : null, className)}>
      {isOnEditor ? (
        children
      ) : isHomePage ? (
        <h1 onClick={scrollToTop}>
          <Image source={logo} width="100px" height="20px" alt="Lunajet, best private jet charter company" />
        </h1>
      ) : (
        <Link className={s.logo} to="/">
          <Image source={logo} width="100px" height="20px" alt="Lunajet, best private jet charter company" />
        </Link>
      )}
    </div>
  );
};

Logo.defaultProps = {
  tagline: "false", // the select input on builder converts e.target.value to string,
  editor: "false",
};

Logo.propTypes = {
  tagline: PropTypes.string,
  editor: PropTypes.string,
  children: PropTypes.node,
};

export default withStyles(s)(Logo);
