import React from 'react';
// import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './currency.css';
import cx from 'classnames'; 
import Switch from '../../../components/switch/switch';
import Table from '../../../components/table';
import { connect } from 'react-redux';
import CurrencyRow from './currencyRow/currencyRow';
import Widget from '../../Widget';

class Currency extends React.Component {
  render() {
    const { rates } = this.props;

    return (
      <Widget title={"Currency Rates"}>
        <table className={cx('pt-table pt-interactive')} style={{width: '100%'}}>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            { rates.map((rate) => <CurrencyRow key={rate.id} rate={rate}/> )}
          </tbody>
        </table>
      </Widget>
    );
  }
}

const mapStateToProps = (state) => ({
  rates: state.rates
});

export default connect(mapStateToProps)(withStyles(s)(Currency));
