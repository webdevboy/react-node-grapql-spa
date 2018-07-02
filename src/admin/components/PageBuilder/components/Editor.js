import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames';
import s from '../style.css';
import Header from './Header';
import Path from './Path';
import Viewport from './Viewport';

export class Editor extends Component {
  render() {
    return (
      <div className={s.editor}>
        <Header />
        <Viewport />
        <Path />
      </div>
    )
  }
}


const mapStateToProps = ({ pageBuilder }) => ({})

export default connect(mapStateToProps)(Editor)
