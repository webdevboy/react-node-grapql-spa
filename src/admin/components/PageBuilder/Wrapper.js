import React, { Component } from 'react'
import Builder from './components/Builder';
import PropTypes from 'prop-types'

const ContextType = {
  components: PropTypes.object.isRequired,
  templates: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

export class Wrapper extends Component {

  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    return this.props.context;
  }

  render() {
    return (
      <Builder />
    )
  }
}
export default Wrapper
