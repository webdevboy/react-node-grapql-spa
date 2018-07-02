import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Maintenance.css';

class Maintenance extends React.Component {

  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Site Under Maintenance</h1>
          <p>asdasdasd</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Maintenance);
