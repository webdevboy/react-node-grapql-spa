import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './select.css';
import cx from 'classnames'; 
import _ from 'lodash';


class Select extends React.Component {
  constructor(props) {
  	super(props);
    this.filter = this.filter.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.setValue = this.setValue.bind(this); 
  	this.state = {
  		filter: '',
      options: this.props.options,
      focus: false,
      value: '',
  	};
  	this.toggleSwitchState = this.toggleSwitchState.bind(this);
  }

 toggleSwitchState(){
 	this.setState({status: !this.state.status});
 }

 filter(ev){
  this.setState({
    filter: ev.target.value,
    value: ev.target.value,
  })
 }

 focus(){
  this.setState({
    focus: true,
  })
 }

 blur(){
  this.setState({
    focus: false,
  });
  let c = _.find(this.props.options,option => {return option.label == this.state.value});
  if(c){
    this.props.onChange(c);
  }
 }

 setValue(ev){
  this.setState({
    value: ev.target.getAttribute('data'),
  })
 }
 bold(label){
  if(this.state.value !== ''){
    return label;
  }
  else{
    return label; 
  }
 }

 setInput(ev){
  this.setValue(ev);

 }

  render() {
    return (
      <div>
        <input 
        name={this.props.name} 
        value={this.state.value} 
        className={s['fieldInput']} 
        type='text' placeholder={this.props.placeholder} 
        onChange={this.filter} 
        onFocus={this.focus} 
        onBlur={this.blur}
        placeholder={'Select locale'}/>
        
        <div className={cx(s['container'], this.state.focus ? s['active'] : '')}>
          <ul className={s['options-list']}>
            {this.props.options.filter((option,index) => {
              return option.label.toLowerCase().startsWith(this.state.filter.toLowerCase())
            }).map((option,index) => 
              <li key={index} onMouseOver={this.setValue} onClick={this.setInput} className={s['option']} data={option.label}>
                {option.label}
              </li>
              )}
          </ul>
        </div> 
      </div>
    );
  }
}

export default withStyles(s)(Select);
