import React from "react";
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Title.css';

const Title = ({ text, editor }) => {
  return (
    <h1 className={s.title}>{text}</h1>
  )
}

Title.defaultProps = {
  text: 'Insert text here',
}

Title.propTypes = {
  text: PropTypes.string,
}

Title.propSchema = {
}

export default withStyles(s)(Title);