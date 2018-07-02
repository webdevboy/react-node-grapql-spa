import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLocale } from '../../../redux/actions/intl';
import s from './languageSwitcher.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import _ from 'lodash';

const ListLocales = ({ locale, language, onChange }) => {
  return <li>
            <a className={cx('dropdown-item')} href={`#`} onClick={(ev) => { onChange(ev, locale.locale); ev.preventDefault() }}>
              <span className={s['span']}>{locale.locale}</span>
            </a>
          </li>
}

class LanguageSwitcher extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      locale: this.getCurrentLanguage(props.currentLocale)
    }
  }

  componentDidMount() {
    
  }

  componentWillMount() {
    this.props.onChange(this.props.currentLocale);
  }

  getCurrentLanguage = (locale) => {
    const { availableLocales } = this.props;
    return _.find(availableLocales, (locales) => {return locales.locale == locale});
  }

  onChange = (ev, locale) => {
    this.setState({
      locale:  this.getCurrentLanguage(locale),
    })
    this.props.onChange(locale);
  }

  render(){
    const { currentLocale, availableLocales, setLocale, id, locales={} } = this.props;
    return (
        <div className={'dropdown'}>
          <a className={cx('dropdown-toggle')} id="locales-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span>{this.state.locale.locale}</span>
          </a>
          <ul className={cx('dropdown-menu')} aria-labelledby={"locales-dropdown"}>
            {Object.keys(locales).map((key, index) => locales[key].locale.locale === this.state.locale.locale ? null :  <ListLocales key={index} locale={locales[key].locale} onChange={this.onChange} />)}
          </ul>
        </div>
    );
  }
}


const mapState = state => ({
  availableLocales: state.intl.availableLocales || [],
  currentLocale: state.intl.locale,
  locales: state.admin.locales
});

const mapDispatch = {

};

export default connect(mapState, mapDispatch)(withStyles(s)(LanguageSwitcher));

