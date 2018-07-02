import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './settings.css';
import GeneralSettings from '../GeneralSettings';
import Maintenance from '../Maintenance';
import BaseCurrency from '../BaseCurrency';

import { connect } from 'react-redux';

class Settings extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={s['container']}>
        <GeneralSettings />
        <Maintenance />
        <BaseCurrency/>
      </div>
    );
  }

}

export default withStyles(s)(Settings);
