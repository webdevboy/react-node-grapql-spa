import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Switch.css';
import cx from 'classnames';


const V1 = ({toggleSwitchStatus, status}) => {
  return <div id={s['switch']} onClick={toggleSwitchStatus} className={(status) ? cx(s['on'], s['v1']) : cx(s['off'], s['v1'])}>
        <div className={cx(s['indicator'], s['v1'])}></div>
      </div>
}

const V2 =({toggleSwitchStatus, status}) =>{
  return <div id={s['switch']} onClick={toggleSwitchStatus} className={(status) ? cx(s['on'], s['v2']) : cx(s['off'], s['v2'])}>
        <div className={cx(s['indicator'], s['v2'])}></div>
      </div>
}

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
    const { version=1 } = this.props;
    const { status } = this.state;

    switch(version){
      case 1:
        return <V1 toggleSwitchStatus={this.toggleSwitchStatus} status={status}/>
      case 2:
        return <V2 toggleSwitchStatus={this.toggleSwitchStatus} status={status}/>
    }
  }
}


export default withStyles(s)(Switch);

