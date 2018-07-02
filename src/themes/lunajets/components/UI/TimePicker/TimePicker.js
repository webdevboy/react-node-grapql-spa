import React, { Component } from 'react'
import moment from 'moment';
import _ from 'lodash';

const DEFAULT_STEP = 30;

class TimePicker extends Component {
  constructor(props) {
    super(props);

    this.options = [];
    this.step = this.props.step || DEFAULT_STEP; 

    _.times(24, (index) => {
      
      const steps = 60 / this.step;
      _.times(steps, (step) => {
        this.options.push({ hour: index, minutes: step * this.step })
      })

    });

    const hour = this.props.currentDate.get('hour');
    const minute = this.props.currentDate.get('minute');
    // const obj = { , minutes: this.props.currentDate.get('minute') }
    // console.log(obj);

    const selIndex = _.findIndex(this.options, { hour: hour, minutes: minute });
    // console.log(selIndex);

    this.state = {
      selected: selIndex
    }

  }

  handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();

    

    // this.props.onChange(curDate)

    this.setState({
      selected: e.target.value
    }, () => {

      // console.log(this.props.currentDate);
      const { hour, minutes } = this.options[this.state.selected];
      
      const curDate = moment(this.props.currentDate).hours(hour).minutes(minutes);
      //console.log(curDate);
      this.props.onChange(curDate);

      
    })
    
  }

  onFocus = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.focus();
  }

  render() {
    return (
      <select className={this.props.className} onChange={this.handleChange} onFocus={this.onClick} value={this.state.selected}>
        {
          this.options.map((option, index) => <option key={`time-opt-${index}`} value={index}>
            {String(option.hour).padStart(2, "0")}:{String(option.minutes).padStart(2, "0")}
          </option>)
        }
      </select>
    )
  }
}

export default TimePicker
