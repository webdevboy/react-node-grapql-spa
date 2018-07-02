import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Types from '../../types';
import { incrementArrayInProps, decrementArrayInProps } from "../../actions";
import VisualType from './index';
import _ from 'lodash';

export class ArrayType extends Component {

  static contextTypes = {
    components: PropTypes.object.isRequired
  }

  static propTypes = {
    currentProps: PropTypes.object,
    typeKey: PropTypes.string,
    options: PropTypes.object
  }

  onIncrement = (e) => {
    e.preventDefault();
    const { componentKey, typeKey: key, options, currentProps, selected } = this.props;
    this.props.incrementArrayInProps(selected, key)
  }

  onDecrement = (e) => {
    e.preventDefault();
    const { componentKey, typeKey: key, options, currentProps, selected } = this.props;
    this.props.decrementArrayInProps(selected, key)
  }

  render() {
    console.log(this);
    const { components } = this.context;
    const { componentKey, typeKey: key, options, currentProps, selected } = this.props;
    const { propSchema } = components[componentKey].component;

    console.log(currentProps, key);
    console.log(currentProps[key]);

    if (!_.has(currentProps, key)) {
      return null
    }

    if (!selected) return null;

    return [
      currentProps[key].map((item, index) => 
        <li>
          <ul>
            { options.inputTypes && Object.keys(options.inputTypes).map(childKey =>
              <VisualType {...{ type: options.inputTypes[childKey], typeKey: key , options: {...options, childKey: childKey, index }}} />
            )}
          </ul>
        </li>
      ),
      <li className="actions">
        <button type="button" onClick={this.onIncrement}>Add</button>
        <button type="button" onClick={this.onDecrement}>Remove</button>
      </li>
    ]
  }
}

const mapStateToProps = ({pageBuilder}) => {
  const selected = pageBuilder.selected;

  return {
    currentProps: pageBuilder.builder.present[selected].component.props,
    componentKey: pageBuilder.builder.present[selected].component.key,
    selected: selected || false,
  }  
}

const mapDispatchToProps = {
  incrementArrayInProps,
  decrementArrayInProps,
}

export default connect(mapStateToProps, mapDispatchToProps)(ArrayType)