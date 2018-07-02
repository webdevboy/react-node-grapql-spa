import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './maintenance.css';
import cx from 'classnames'; 
import { connect } from 'react-redux';
import { updateOption } from '../../actions/settings';
import _ from 'lodash';
import Switch from '../switch';

class Maintenance extends React.Component {
  constructor(props) {
    super(props);
    const {maintenance} = props.settings;
    const {maintenance_message} = props.settings;
    this.state = {
      maintenance: maintenance == 'true' ? true : false,
      maintenance_message
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitChanges = (ev) =>{
    this.props.updateOption(this.state);
  }

  onChange = (ev, toggle) => {
    this.setState({ maintenance: toggle });
  }

  render() {
    return (
      <div className={s['container']}>
         <div className={s['header']}><span>Maintenance</span><Switch onChange={this.onChange} enabled={this.state.maintenance}/></div>
         <div className={s['sep']}></div>
         <div className={s['content']}>
           <div className={cx('input-group', s['field'])}>
             <label className={s['fieldLabel']}><span>Message</span></label>
             <textarea type='text' className={cx('form-control', s['fieldTextArea'])} value={this.state.maintenance_message} name='maintenance_message' onChange={this.handleChange} placeholder='Enter maintenance message'></textarea>
             <span className={s['actionsReq']}>This is a required field*</span>
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
  settings: state.settings
});

export default connect(mapStateToProps, { updateOption })(withStyles(s)(Maintenance));