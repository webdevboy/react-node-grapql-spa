import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { setCurrency } from "shared/actions/intl";
import s from './CurrencySwitcher.css';

const ListCurrency = ({ currency, setCurrency }) => {
  return (
    <li key={currency}>
      <a className={cx('dropdown-item')} href="#" onClick={(ev) => { setCurrency({ currency }); ev.preventDefault();}}>
        <span>{currency}</span>
      </a>
    </li>
  );
}

class CurrencySwitcher extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
    const { currentCurrency, availableCurrencies, setCurrency } = this.props;
    return (
        <li className={cx('nav-item dropdown', s['select-wrapper'])}>
          <a className={cx('dropdown-toggle')} id="locales-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span>{currentCurrency}</span>
          </a>
          <ul className={cx('dropdown-menu')} aria-labelledby={"locales-dropdown"}>

            {
              Object.keys(availableCurrencies).map(currency => currency === currentCurrency
                ? null
                : <ListCurrency key={`currency-list-${currency}`} currency={currency} setCurrency={setCurrency} />
              )
            }
            
          </ul>
        </li>
    );
  }
}


const mapState = state => ({
  availableCurrencies: state.runtime.availableCurrencies,
  currentCurrency: state.intl.currency || state.intl.baseCurrency,
});

const mapDispatch = {
  setCurrency,
};
export default connect(mapState, mapDispatch)(withStyles(s)(CurrencySwitcher));

