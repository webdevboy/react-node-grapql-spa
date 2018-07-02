import React, { Component } from 'react';
import {FormItem} from "./FormComponents";
import {PlusIcon, CloseIcon} from "./Icons";

export default class AddRemove extends Component {

  render() {
    const { title, className, onAdd, onRemove } = this.props;
    return (
      <FormItem className={className}>
      <label className="bs-ui-form-control__label">{title}</label>
      <button className="bs-ui-button bs-ui-button--small bs-ui-button--blue btn-add" onClick={onAdd}>
        <PlusIcon /> Add
      </button>
      <button className="bs-ui-button bs-ui-button--small bs-ui-button--red btn-remove" onClick={onRemove}>
        <CloseIcon /> Remove
      </button>
    </FormItem>
    )
  }
}