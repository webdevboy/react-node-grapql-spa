import React, { Component } from 'react'
import _ from 'lodash';
import cx from 'classnames';
import { Switch } from "@blueprintjs/core";

export class OptionField extends Component {

  state = {
    value: this.props.value,
    hidden: this.props.option.hidden || false,
  }

  toggleHidden = () => this.setState({ hidden: !this.state.hidden })

  dispatchUpdate = () => {
    const { value } = this.state;
    if (this.props.value !== value && value !== null) {
      this.props.onUpdate({
        option: this.props.option.key,
        hidden: this.props.option.hidden || false,
        value: value,
      });
    }
  }

  updateState = (value, forceDispatch) => {
    this.setState({ value });
    if (forceDispatch) {
      this.dispatchUpdate();
    }
  }

  render() {
    const { option, value } = this.props;
    const { key, label, type, values, hidden, disabled = false } = option;

    switch(type) {
      case 'switch':
        return (
          <div className="pt-form-group pt-inline" style={{display: 'flex', justifyContent: 'space-between'}}>
            <label className="pt-label">{label}</label>
            <Switch checked={value} onChange={val => this.updateState(val, true)} />
          </div>
        )

      case 'select':
        return (
          <div className="pt-form-group">
            <label className="pt-label" htmlFor={`select-${key}`}>{label}</label>
            <div className="pt-select pt-fill">
              <select id={`select-${key}`} name={key} value={this.state.value} disabled={disabled} onChange={e => this.updateState(e.target.value, true)}>
                { values && values.map(opt => {
                  if (_.isString(opt)) {
                    return <option key={`select-opt-${opt}`} value={opt}>{opt}</option>
                  }
                  return <option key={`select-opt-${opt.label}`} value={opt.value}>{opt.label}</option>
                })}
              </select>
            </div>
          </div>
        );
      default:
        if (hidden) {
          return (
            <div className="pt-form-group">
              <label className="pt-label">{label}</label>
              <div className="pt-input-group">
                <input
                  name={key}
                  disabled={this.state.hidden || disabled }
                  onChange={e => this.updateState(e.target.value)}
                  onBlur={this.dispatchUpdate}
                  type="text"
                  className="pt-input"
                  placeholder="hidden"
                  value={(this.state.hidden) ? '' : this.state.value }
                />
                <button className={cx("pt-button pt-minimal pt-intent-warning", (this.state.hidden) ? 'pt-icon-eye-open' : 'pt-icon-eye-off')} onClick={this.toggleHidden}></button>
              </div>
            </div>
          )
        }
        return (
          <div className="pt-form-group">
            <label className="pt-label">{label}</label>
            <input
              onChange={e => this.updateState(e.target.value)}
              onBlur={this.dispatchUpdate}
              disabled={disabled}
              className={cx('form-control pt-input pt-fill')}
              type="text"
              name={key}
              value={this.state.value}
              // onChange={this.handleChange}
            />
          </div>
          
        );
    }
  }
}

export default OptionField
