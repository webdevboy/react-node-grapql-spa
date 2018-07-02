import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import s from './style.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { FormattedNumber } from 'react-intl';
import _ from 'lodash';

class FormattedCurrency extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { value, currentRate, currentCurrency, className } = this.props;
    // TODO: need to check why currentRate is null
    const current = Math.ceil(parseInt(value) * currentRate);

    return (
      <span className={cx('mono', s['price-tag'], className)}>
        <FormattedNumber
          value={current}
          style="currency"
          currency={currentCurrency}
          minimumFractionDigits={0}
          children={(formattedNumber) => {
            return <span>{formattedNumber}</span>;
          }}
        />
      </span>
    );
  }
}


const mapState = (state, ownProps) => {
  const currentCurrency = state.intl.currency || state.intl.baseCurrency;
  let currentRate = 1;
  if (ownProps.currency && currentCurrency !== ownProps.currency) {
    currentRate = (_.find(state.rates, { from: { currency: ownProps.currency }, to: { currency: currentCurrency } }) || {}).rate || 1;
  }

  return {
    currentRate,
    currentCurrency,
  };
};


export default connect(mapState, {})(withStyles(s)(FormattedCurrency));
