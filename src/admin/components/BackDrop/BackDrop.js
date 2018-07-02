import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../NavBar';
import { hideBackdrop } from '../../../redux/actions/backdrop';
import { connect } from 'react-redux';

const BackDrop = function(props) {
  return (
    <div className={'backdrop'} onClick={props.hideBackdrop}></div>
  );

}

export default connect(null, { hideBackdrop })(BackDrop);
