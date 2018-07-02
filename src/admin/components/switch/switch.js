import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './switch.css';
import cx from 'classnames'; 


class Switch extends React.Component {
  constructor(props) {
  	super(props);
    this.toggleSwitchStatus = this.toggleSwitchStatus.bind(this);
  	this.state = {
  		status: this.props.enabled || false
  	};
  }

  toggleSwitchStatus(ev) {
 	  this.setState({
      status: !this.state.status
    }, () => this.props.onChange(ev, this.state.status));
  }

  render() {
    return (
      <div id={s['switch']} onClick={this.toggleSwitchStatus} className={(this.state.status) ? s['on'] : s['off']}>
        <div className={s['indicator']}></div>
      </div>
    );
  }
}

export default withStyles(s)(Switch);
