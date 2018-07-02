import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideBarView.css';
import cx from 'classnames'; 
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { getLocales, addLanguage } from '../../../../redux/actions/admin';
import { hideSidebar } from '../../../../redux/actions/sidebar';
import Select from 'react-select';
import _ from 'lodash';



const messages = defineMessages({
  currentTalks: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
});


class SideBarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: '',
      language: '',
      country: '',
      locale_id: null,
      selectValue: '',
      locales: props.locales.map(locale => {return {label: locale.locale, value: locale.locale}})
    };
  }


  handleClickSave = () => {
    this.props.addLanguage(this.state.locale_id);
    this.setState({
        selectValue: '',
        language: '',
        country: '',
        locale_id: '',
    }); 
    this.props.hideSidebar();
  }

  handleClickClose = () =>{
    this.props.hideSidebar();
  }

  change = (ev) =>{
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  componentDidMount() {
 
  }

  componentDidUpdate(prevProps, prevState) {
   
  }

  logChange = async (val) => {
    let locale = await this.props.getLocales(val.value);
    this.setState({
      selectValue: val,
      language: locale[0].language,
      country: locale[0].country,
      locale_id: locale[0].id,
    });
  }

  row(val){
    return <li>{val}</li>;
  }

  render() {
    const { locales } = this.state;
    const { availableLocales } = this.props;
    return (
      <div>
        <div className={s['container-header']}>
            <h3>Add new locale</h3>
        </div>
        <div className={cx(s['container-content'], 'input-group')}>
            <div className={s['entry']}>
              <label>Locale</label>
              <Select
                name="form-field-locale"
                placeholder="Select..."
                value={this.state.selectValue}
                options={_.filter(locales, ( locale ) => {const el = _.find(availableLocales, (loc) => {return loc.locale.locale == locale.value}); return !(!!el)} )}
                onChange={this.logChange}
              />
            </div>
            <div className={s['entry']}>
              <label>Language</label>
              <input disabled name='language' value={this.state.language} className={'form-control'} type='text' placeholder='' onChange={this.change}/>
            </div>
            <div className={s['entry']}>
              <label>Country</label>
              <input disabled name='country' value={this.state.country} className={'form-control'} type='text' placeholder='' onChange={this.change}/>
            </div>
        </div>
        <div className={cx(s['container-action'])}>
          <button className={cx('btn', 'btn-secondary')} onClick={this.handleClickSave}>Add locale</button>
          <button className={cx('btn', 'btn-primary')} onClick={this.handleClickClose}>Cancel</button>
        </div> 
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  availableLocales: state.admin.locales
});


export default connect(mapStateToProps, { getLocales, addLanguage, hideSidebar })(withStyles(s)(SideBarView));