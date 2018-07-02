import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideBarView.css';
import cx from 'classnames'; 
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { createTeam, createTeamMember } from '../../../../redux/actions/team';
import { hideSidebar } from '../../../../redux/actions/sidebar';
import Select from 'react-select';
import _ from 'lodash';
import CheckBox from '../../Checkbox';


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
      name: '',
      description: '',
      first_name: '',
      last_name: '',
      email: '',
      title: '',
      bio: '',
      visible: true,
      override: false,
    };
  }


  handleClickSave = () => {
    this.props.createTeam(this.state);
    this.setState({
        name: '',
        description: '',
    }); 
    this.props.hideSidebar();
  }

   handleClickSaveTeam = (ev) => {
    const { teams, department } = this.props;
    const team = _.find(teams, (team) =>{if(team.name == department){ return team}})
    const id = team.id || null;
    this.props.createTeamMember({id, ...this.state});
    this.setState({
      first_name: '',
      last_name: '',
      email: '',
      title: '',
      bio: '',
      visible: true,
      override: false,
    }); 
    this.props.hideSidebar();
  }

  handleClickClose = (ev) => {
    this.props.hideSidebar();
  }

  change = (ev) =>{
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  changeCheckbox = (ev,name) => {
    this.setState({
      [name]: ev.target.checked,
    });
  }

  componentDidMount() {
 
  }

  componentDidUpdate(prevProps, prevState) {
   
  }


  renderDepartment = () => {
    return( 
      <div>
        <div className={s['container-header']}>
          <h3>Add new department</h3>
        </div>
        <div className={cx(s['container-content'], 'input-group')}>
          <div className={s['container']}>
            <label>Department</label>
            <input name='name' value={this.state.name} className={cx('form-control', s['inpt'])} type='text' placeholder='' onChange={this.change}/>
          </div>
          <div className={s['container']}>
            <label>Description</label>
            <input name='description' value={this.state.description} className={cx('form-control', s['inpt'])} type='text' placeholder='' onChange={this.change}/>
          </div>
        </div>
        <div className={cx(s['container-action'])}>
          <button className={cx('btn', 'btn-secondary')} onClick={this.handleClickSave}>Add department</button>
          <button className={cx('btn', 'btn-primary')} onClick={this.handleClickClose}>Cancel</button>
        </div> 
      </div>)
  }

  renderTeam = () => {
    return( 
      <div>
        <div className={s['container-header']}>
          <h3>Add new member to {this.props.department}</h3>
        </div>
        <div className={cx(s['container-content'], 'input-group')}>
          <div className={s['container']}>
            <label>First name</label>
            <input name='first_name' value={this.state.first_name} className={cx('form-control', s['inpt'])} type='text' placeholder='' onChange={this.change}/>
          </div>
          <div className={s['container']}>
            <label>Last name</label>
            <input name='last_name' value={this.state.last_name} className={cx('form-control', s['inpt'])} type='text' placeholder='' onChange={this.change}/>
          </div>
          <div className={s['container']}>
            <label>Email</label>
            <input name='email' value={this.state.email} className={cx('form-control', s['inpt'])} type='text' placeholder='' onChange={this.change}/>
          </div>
          <div className={s['container']}>
            <label>Title</label>
            <input name='title' value={this.state.title} className={cx('form-control', s['inpt'])} type='text' placeholder='' onChange={this.change}/>
          </div>
          <div className={s['container']}>
            <label>Biography</label>
            <textarea name='bio' value={this.state.bio} className={cx('form-control', s['inpt'])} type='text' placeholder='' onChange={this.change}/>
          </div>
          <div className={s['container']}>
            <label>Visible</label>
            <CheckBox checked={this.state.visible} for={'visible'} onChange={(ev) => this.changeCheckbox(ev, 'visible')}/>
          </div>
          <div className={s['container']}>
            <label>Override</label>
            <CheckBox checked={this.state.override} for={'override'} onChange={(ev) => this.changeCheckbox(ev, 'override')}/>
          </div>
        </div>
        <div className={cx(s['container-action'])}>
          <button className={cx('btn', 'btn-secondary')} onClick={this.handleClickSaveTeam}>Add member</button>
          <button className={cx('btn', 'btn-primary')} onClick={this.handleClickClose}>Cancel</button>
        </div>
      </div>)
  }


  render() {
    const { locales } = this.state;
    const { department } = this.props;
    return (
        department ? this.renderTeam() : this.renderDepartment()
    );
  }
}

const mapStateToProps = (state) => ({
  teams: state.teams.teams,
});


const mapDispatch = {
  createTeamMember,
  createTeam,
  hideSidebar
};

export default connect(mapStateToProps, mapDispatch)(withStyles(s)(SideBarView));