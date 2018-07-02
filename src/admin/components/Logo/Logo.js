import React from "react";
import PropTypes from 'prop-types'
import BuilderTypes from '../../../admin/components/PageBuilder/types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import logo from './LJ_logo_new_white.svg';
import s from './Logo.css';
import cx from 'classnames';
import Link from "../Link";
import Image from "../Image";

const Logo = (props) => {

  const { tagline, className, editor = false, children, link } = props;
  const logoWithTagline = (tagline == "true") ? true : false;
  const isOnEditor = (editor === "true") ? true : false;

  return (
    <div {...props} className={cx(s.logo, (logoWithTagline) ? s.tagline : null, className)}>
      { (isOnEditor) ? children : <Link to={link} className={s.logo}><Image source={logo} width="100px" height="20px" /></Link> }
    </div>
  )
}

Logo.defaultProps = {
  tagline: 'false', // the select input on builder converts e.target.value to string,
  editor: 'false',
  link: '/'
};

Logo.propTypes = {
  tagline: PropTypes.string,
  editor: PropTypes.string,
  children: PropTypes.node,
}

export default withStyles(s)(Logo);