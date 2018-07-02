import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeNodeProps } from "../../actions";

export class ImageType extends Component {

  getValue = () => {
    const { componentKey, typeKey: key, options, currentProps, selected } = this.props;
    const { childKey, index } = options;
    let props = currentProps[key];

    console.log(this.props);


    if (typeof index !== undefined && typeof childKey !== undefined) {
      return props[index][childKey]
    }

    if (typeof index === undefined && typeof childKey !== undefined) {
      return props[childKey]
    }

    return props

  }

  setValue = (value) => {

    console.log('we\'re here', value);
    
    const { componentKey, typeKey: key, options, currentProps, selected } = this.props;
    const { childKey, index } = options;
    let props = currentProps[key];


    if (typeof index === undefined && typeof childKey !== undefined) {
      props[childKey] = value;
    }
    
    if (typeof index !== undefined && typeof childKey !== undefined) {
      props[index][childKey] = value;
    } else {
      props = value
    }

    this.props.changeNodeProps(selected, {[key]: props});
  }

  removeIndex = () => {
    const { componentKey, typeKey: key, options, currentProps, selected } = this.props;
    const { childKey, index } = options;
    let props = currentProps[key];
    props = [
      ...props.splice(0, index),
      ...props.splice(index, props.length - 1)
    ]
    this.props.changeNodeProps(selected, props);
  }

  render() {
    const { selected, options: { index } } = this.props;

    if (!selected) return null;

    const value = this.getValue();

    return (
      <li>
        <input type="text" value={value} onChange={e => this.setValue(e.target.value)} />
        { 
          // if belongs to array
          (typeof index !== undefined) ? <button onClick={() => this.removeIndex()}>REMOVE</button> : null
        }
      </li>
    )
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
  changeNodeProps,
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageType)