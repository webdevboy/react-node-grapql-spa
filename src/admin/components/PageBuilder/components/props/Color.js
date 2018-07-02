import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ChromePicker } from "react-color";
import { changeNodeProps } from "../../actions";

export class ColorType extends Component {
  
  static contextTypes = {
    components: PropTypes.object.isRequired
  }

  static propTypes = {
    currentProps: PropTypes.object
  }

  getValue = () => {
    const { typeKey, prop } = this.props;
    let props = currentProps[key];

    if (_.isObject(prop)) {

      if (_.has(prop, 'options')) {

        // has options
        const hasIndex = _.has(prop.options, 'index');
        const hasChildKey = _.has(prop.options, 'childKey');
      
        if (hasIndex && hasChildKey) {
          return props[key][index][childKey]
        }
    
        if (!hasIndex && hasChildKey) {
          return props[key][childKey]
        }
      }
    }
    return prop[key]
  }

  setValue = ({ rgb: { r, g, b, a } }) => {
    const { typeKey, currentProps } = this.props;
    let props = currentProps[typeKey];

    if (!options) {
      props[key] = `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    if (options.index && options.childKey) {
      props[key][index][childKey] = `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    if (!options.index && options.childKey) {
      props[key][childKey] = `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    this.props.changeNodeProps(selected, props);
  }

  removeIndex = () => {
    const { componentKey, typeKey: key, options = null, currentProps, selected } = this.props;
    let props = currentProps[key];
    props = [
      ...props.splice(0, index),
      ...props.splice(index, props.length - 1)
    ]
    this.props.changeNodeProps(selected, props);
  }

  render() {
    
    console.log('COLOR TYPE => ',this.props);
    return <h2>Color</h2>
    // return (
    //   <div key={`select-for-${typeKey}`}>
    //     <span>{_.upperFirst(typeKey)}</span>
    //     <div>
    //       <ChromePicker
    //         key={`color-picker-${typeKey}`}
    //         color={value}
    //         onChange={this.setValue}
    //       />
    //     </div>
    //   </div>
    // )
  }
}

const mapStateToProps = ({pageBuilder}) => ({
  currentProps: pageBuilder.builder.present[pageBuilder.selected].component.props
})

const mapDispatchToProps = {
  changeNodeProps,
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorType)
