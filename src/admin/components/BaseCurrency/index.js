import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './baseCurrency.css';
import cx from 'classnames'; 
import { connect } from 'react-redux';
import { updateOption } from '../../actions/settings';
import _ from 'lodash';
import Switch from '../switch/switch';


const ListCurrency = ({ currency, updateOption }) => {
  return (<li key={currency}>
            <a className={cx('dropdown-item')} href={`?currency=${currency}`} onClick={(ev) => { updateOption({ currency }); ev.preventDefault();}}>
            <span>{currency}</span>
            </a>
          </li>)

}

class BaseCurrency extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { currencies, baseCurrency, updateOption } = this.props;
    return (
      <div className={s['container']}>
         <div className={s['header']}>Base currency</div>
         <div className={s['sep']}></div>
         <div className={s['content']}>
           <div className={s['field']}>
             <label className={s['fieldLabel']}>Select base currency</label>
              <div className={'dropdown'}>
                <a className={cx('dropdown-toggle')} id="locales-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span>{baseCurrency}</span>
                </a>
                
              </div>
           </div>
         </div>
         <div className={s['actions']}>
           <button className={cx('btn', 'btn-secondary', s['actionsBtns'])} onClick={this.submitChanges}>Save</button>
         </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  options: state.options,
  currencies: state.runtime.availableCurrencies,
  baseCurrency: state.settings.baseCurrency || state.runtime.baseCurrency
});

export default connect(mapStateToProps, { updateOption })(withStyles(s)(BaseCurrency));



