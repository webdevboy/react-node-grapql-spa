import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../GeneralSettings/generalSettings.css';
import cx from 'classnames'; 
import { connect } from 'react-redux';
import { updateOption } from '../../actions/settings';
import _ from 'lodash';

const messages = defineMessages({
  general: {
    id: 'settings.generalSettings.header',
    defaultMessage: 'General',
    description: 'settings.generalSettings.header',
  },
  siteTitle: {
    id: 'settings.generalSettings.field.siteTitle',
    defaultMessage: 'Site title',
    description: 'settings.generalSettings.field.siteTitle',
  },
  siteDescription: {
    id: 'settings.generalSettings.field.siteDescription',
    defaultMessage: 'Description',
    description: 'settings.generalSettings.field.siteDescription',
  },
  siteDefaultEmail: {
    id: 'settings.generalSettings.field.siteDefaultEmail',
    defaultMessage: 'Default email',
    description: 'settings.generalSettings.field.siteDefaultEmail',
  },
  save: {
    id: 'actions.save',
    defaultMessage: 'Save',
    description: 'actions.save',
  },
});

class GeneralSettings extends React.Component {
  constructor(props) {
    super(props);
    const { settings }  = props;
    const { site_title } = settings;
    const { site_description } = settings;
    const { site_default_email } = settings;
    this.state = {
      site_title,
      site_description,
      site_default_email
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitChanges = () => {
    this.props.updateOption(this.state);
  }
  render() {
    const { site_title, site_description, site_default_email } = this.state;

    return (
      <div className={s['container']}>
         <div className={s['header']}><FormattedMessage {...messages.general} /></div>
         <div className={s['sep']}></div>
         <div className={s['content']}>
           <div className={cx('input-group', s['field'])}>
             <label className={s['fieldLabel']}><FormattedMessage {...messages.siteTitle} /></label>
             <input type='text' name="site_title" value={site_title} onChange={this.handleChange} className={cx('form-control', s['input'])}/>
           </div>
           <div className={cx('input-group', s['field'])}>
             <label className={s['fieldLabel']}><FormattedMessage {...messages.siteDescription} /></label>
             <input type='text' name="site_description" value={site_description} onChange={this.handleChange} className={cx('form-control', s['input'])}/>
           </div>
           <div className={cx('input-group', s['field'])}>
             <label className={s['fieldLabel']}><FormattedMessage {...messages.siteDefaultEmail} /></label>
             <input type='text' name="site_default_email" value={site_default_email} onChange={this.handleChange} className={cx('form-control', s['input'])}/>
           </div>
         </div>
         <div className={s['actions']}>
           <button className={cx('btn', 'btn-secondary', s['actionsBtns'])} onClick={this.submitChanges}><FormattedMessage {...messages.save} /></button>
         </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings
});

export default connect(mapStateToProps, { updateOption })(withStyles(s)(GeneralSettings));