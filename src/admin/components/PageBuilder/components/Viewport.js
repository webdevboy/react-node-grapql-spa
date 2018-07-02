import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import cx from "classnames";
import s from "../style.css";
import { ROOT } from "../reducer";
import DroppableArea from "./DroppableArea";
import ReactDOM from "react-dom";

class Viewport extends Component {
  static propTypes = {
    rootTemplate: PropTypes.string.isRequired,
    currentDevice: PropTypes.string.isRequired,
  }

  static contextTypes = {
    templates: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    dragDropManager: PropTypes.object,
  }

  static defaultProps = {
    rootTemplate: "Blank",
    currentDevice: "desktop",
  }

  constructor(props, context) {
    super(props, context);
    this.manager = this.context.dragDropManager;
    this.page = null;
  }

  refHandlers = {
    frame: ref => this.frame = ref,
  }

  render() {
    const {
      devicesById, currentDevice, rootTemplate, rootTemplateProps,
    } = this.props;
    const device = devicesById[currentDevice];

    const { templates } = this.context;
    // get the template
    const Template = templates[rootTemplate].default;
    // get the default props
    const defaultProps = templates[rootTemplate].defaultProps;
    // override props if any provided
    const customProps = rootTemplateProps;
    const templateProps = Object.assign({}, defaultProps, customProps, { editor: true });

    return (<div id="viewport" className={s.viewport} style={{ maxWidth: device.maxWidth }}>
      <Template {...templateProps}>
        <DroppableArea id={ROOT} manager={this.manager} />
      </Template>
            </div>);
  }
}

const mapStateToProps = ({ pageBuilder }) => ({
  devicesById: pageBuilder.devices.byId,
  devicesIds: pageBuilder.devices.ids,
  devices: pageBuilder.devices.ids.map(id => pageBuilder.devices.byId[id]),
  currentDevice: pageBuilder.devices.current,
  rootTemplate: pageBuilder.builder.present[ROOT].template,
  rootTemplateProps: pageBuilder.builder.present[ROOT].props || {},
});

export default connect(mapStateToProps)(Viewport);
