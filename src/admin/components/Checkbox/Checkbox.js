import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Checkbox.css';
import cx from 'classnames'; 
import PropTypes from 'prop-types';


class CheckBox extends React.Component {
 static propTypes = {
   for: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
 };
 constructor(props) {
   super(props);
 }


 handleChange = (ev) => {
  ev.stopPropagation();
  this.props.onChange(ev);
}

render() {
  return (
    <div className={s['checkbox']}>
      <input type='checkbox' value='' id={this.props.for} name='check' onChange={this.handleChange} checked={this.props.checked} />
      <label htmlFor={this.props.for}></label>
    </div>
    );
  }
}

export default withStyles(s)(CheckBox);
