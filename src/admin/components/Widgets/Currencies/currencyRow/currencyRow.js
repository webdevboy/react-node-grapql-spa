import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './currencyRow.css';
import cx from 'classnames';
import { connect } from 'react-redux';
import { updateRate } from '../../../../actions/rates'; 

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


class CurrencyRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: this.props.rate.rate,
      active: false,
      show_input: false,
      error_rate: false,
    };
  }

  handleDoubleClick = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
  }

  activate = (ev) => {
    this.setState({
      active: !this.state.active,
    });
    this.props.emptyLegRemoval(this.props.emptyLeg.id);
  }

  showInput = (ev) => {
    this.setState({
      show_input: true,
    });
  }

  handleOnChange = (ev) => {
    this.setState({ error_rate: false });
    let pattern = /^$|^\d+(\.)?(\d{1,2})?$/;
    if(pattern.test(ev.target.value)){
      this.setState({
        rate: ev.target.value
      });
    }
  }

  handleKeyUp = (ev) => {
    if(ev.nativeEvent.keyCode === 13){
      this.save(ev.target.value);
    }
  }
  handleOnBlur = (ev) => {
    this.save(ev.target.value);
  }

  save = (value) => {
    if( value !== ''){
      this.setState({
          show_input: false,
          rate : value,
        });
      this.props.updateRate(this.props.rate.id, value);
    }
    else{
      this.setState({
          error_rate: true
      });
    }
  }

  render() {
    return (
      <tr className={this.state.active ? s['active'] : ''}>
        <td>{this.props.rate.from.currency}/{this.props.rate.to.currency}</td>
        <td onDoubleClick={this.showInput}>
          {this.state.show_input
            ? 
              <div>
                <input
                onChange={this.handleOnChange}
                onKeyUp={this.handleKeyUp}
                onBlur={this.handleOnBlur}
                type='text'
                value={this.state.rate}
                placeholder='Enter rate'
                className={cx(s['fieldInput'], this.state.error_rate ? s['error'] : '')}
                />
              </div>
            : 
            <div>
              {this.state.rate}
            </div>
          }
        </td>
         {/*this.state.error_rate ? <div><label className={s['label-error']}>Rate not valid</label></div> : ''*/}
      </tr>
    );
  }
}

export default connect(null, { updateRate })(withStyles(s)(CurrencyRow));