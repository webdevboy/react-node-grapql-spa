import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DragSource } from "react-dnd";
import _ from "lodash";
import s from "../../style.css";
import cx from "classnames";
import Types from "../../types";
import { Switch } from "@blueprintjs/core";
import { changeNodeProps } from "../../actions";
import { ROOT } from "../../reducer";
import VisualType from '../props';

class PropertiesWidget extends Component {
  
  static contextTypes = {
    components: PropTypes.object.isRequired,
  }

  renderProperty = (prop, typeKey) => {

    if (_.isObject(prop)) {

      // has nested properties
      if (_.has(prop, 'options')) {
        // if type has options
        return (
          <div className="s.visualType">
            <span className={s.visualTypeTitle}>{_.upperFirst(key)}</span>
            <ul>
              <VisualType onChange={this.onChange} prop={prop} typeKey={typeKey} />
            </ul>
          </div>
        )
      } // end if has options prop in object
      
      // if is a nested type
      return (
        <div className="s.visualType">
          <span className={s.visualTypeTitle}>{_.upperFirst(key)}</span>
          <ul>
            { Object.keys(prop).length && Object.keys(prop).map(childKey =>
              this._getPropertieOfType(prop, childKey)
            )}
          </ul>
        </div>
      )

    } // end if is object

    return (
      <VisualType onChange={this.onChange} prop={prop} typeKey={typeKey} />
    )
  }

  onChange = (prop, typeKey, value) => {
    
    const newState = {
      ...prop,
      [typeKey]: value
    }

    this.setState({
      ...this.state,
      ...prop
    }, () => {
      // do something
    })

  }

  constructor(props) {
    super(props);

    const { key, props: currentProps } = this.props.component;
    this.state = currentProps;
  }

  render() {
    const { components } = this.context;

    if (!this.props.component) {
      return <span>No active component!</span>;
    }

    const { key, props } = this.props.component;
    const { propSchema } = components[key].component;

    return (
      <div className={s.properties} key="props-list">
        <PropertyType schema={propSchema} />
      </div>
    );
  }
}


const mapStateToProps = ({ pageBuilder }) => {
  const selected = pageBuilder.selected;

  if (pageBuilder.selected && selected !== ROOT) {
    return {
      component: pageBuilder.builder.present[pageBuilder.selected].component
    }
  }

}

const mapDispatchToProps = {
  changeNodeProps,
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesWidget);