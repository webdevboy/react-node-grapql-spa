import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideBarView.css';
import cx from 'classnames'; 
import { createOffice, updateOffice } from '../../../../redux/actions/offices';
import { connect } from 'react-redux';
import { hideSidebar } from '../../../../redux/actions/sidebar';
import CheckBox from '../../Checkbox';

const messages = defineMessages({
  updateContact: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
  updateContact: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
  updateContact: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
  updateContact: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
  updateContact: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
  updateContact: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
  updateContact: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
  updateContact: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
  updateContact: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
  updateContact: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
  updateContact: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
  updateContact: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
  updateContact: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
  updateContact: {
    id: 'currentTalks.container.header',
    defaultMessage: 'Current Talks',
    description: 'currentTalks.container.header',
  },
});

class SideBarView extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: '',
      address: '',
      postal_code: '',
      location: '',
      country: '',
      phone: '',
      alt_phone: '',
      fax: '',
      email: '',
      coordinates: '',
      primary: false
    };

    this.state = props.edit ? {} : this.initialState;
  }

  handleClickSave = () => {
    const { createOffice, updateOffice, hideSidebar, edit } = this.props;
    if(edit){
      updateOffice(this.state)
    }
    else{
      createOffice(this.state);
    }
    hideSidebar();
    this.setState(this.initialState);
  }

  handleClickClose = () => {
    this.props.hideSidebar();
  }

  change = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  changePrimary = (ev) => {
    this.setState({
      primary: !this.state.primary
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if(nextProps.office && nextProps.edit){
      this.setState(nextProps.office);
    }else{
      this.setState(this.initialState);
    }
  }

  render() {
    const { edit } = this.props;
    return (
      <div>
        <div className={s['container-header']}>
            <h3>{edit ? 'Update contact' : 'Add new contact'}</h3>
        </div>
        <div className={cx(s['container-content'], 'input-group')}>
          <div className={s['container']}>
            <label>Name</label><input name='name' value={this.state.name} className={cx('form-control', s['inpt'])}  type='text' placeholder='' onChange={this.change}/>
          </div> 
          <div className={s['container']}>
            <label>Address</label><input name='address' value={this.state.address} className={cx('form-control', s['inpt'])}  type='text' placeholder='' onChange={this.change}/>
          </div>
          <div className={s['container']}>
            <label>Postal code</label><input name='postal_code' value={this.state.postal_code} className={cx('form-control', s['inpt'])}  type='text' placeholder='' onChange={this.change}/>
          </div>
          <div className={s['container']}>
            <label>Location</label><input name='location' value={this.state.location} className={cx('form-control', s['inpt'])}  type='text' placeholder='' onChange={this.change}/>
          </div>
          <div className={s['container']}>
            <label>Country</label><input name='country' value={this.state.country} className={cx('form-control', s['inpt'])}  type='text' placeholder='' onChange={this.change}/>
          </div>
          <div className={s['container']}>
            <label>Phone</label><input name='phone' value={this.state.phone} className={cx('form-control', s['inpt'])}  type='text' placeholder='' onChange={this.change}/>
          </div>
          <div className={s['container']}>
            <label>Alt Phone</label><input name='alt_phone' value={this.state.alt_phone} className={cx('form-control', s['inpt'])}  type='text' placeholder='' onChange={this.change}/>
          </div>
          <div className={s['container']}>
            <label>Fax</label><input name='fax' value={this.state.fax} className={cx('form-control', s['inpt'])}  type='text' placeholder='' onChange={this.change}/>
          </div>
          <div className={s['container']}>
            <label>Email</label><input name='email' value={this.state.email} className={cx('form-control', s['inpt'])}  type='text' placeholder='' onChange={this.change}/>
          </div>
          <div className={s['container']}>
            <label>Coordinates</label><input name='coordinates' value={this.state.coordinates} className={cx('form-control', s['inpt'])}  type='text' placeholder='' onChange={this.change}/>
          </div> 
        </div>
        <div className={s['container-action']}>
          <button className={cx('btn', 'btn-secondary')} onClick={this.handleClickSave}>{edit ? 'Update contact' : 'Add contact'}</button>
          <button className={cx('btn', 'btn-primary')} onClick={this.handleClickClose}>Cancel</button>
        </div> 
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatch = {
  createOffice,
  updateOffice, 
  hideSidebar
}

export default connect(mapStateToProps, mapDispatch)(withStyles(s)(SideBarView));