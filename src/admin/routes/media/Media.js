import React, { Component } from "react";
import Uppy from "uppy/lib/core";
import Tus from "uppy/lib/core";

const { Dashboard, DashboardModal, DragDrop } = require("uppy/lib/react");

import Filter from "../../components/Filter";
import Action from "../../components/Action";
import Page from "../../components/Page";
import Sidebar from "../../components/Sidebar";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Breadcrumbs from "../../components/Breadcrumbs";
import history from "core/history";
import cx from "classnames";
import { connect } from "react-redux";
import { Menu, Switch, ContextMenu, Tooltip, Overlay, MenuItem, MenuDivider, Popover, Intent, Toaster, PopoverInteractionKind, Position } from "@blueprintjs/core";
import moment from "moment/moment";
import _ from "lodash";


export class Media extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInlineDashboard: false,
      open: false,
    };

    this.handleModalClick = this.handleModalClick.bind(this);
  }

  componentWillMount() {
    this.uppy = new Uppy({ id: "uppy1", autoProceed: false })
      .use(Tus, { endpoint: "https://master.tus.io/files/" })
      .use(GoogleDrive, { host: "https://server.uppy.io" })
      .run();
  }

  componentWillUnmount() {
    this.uppy.close();
    this.uppy2.close();
  }

  handleModalClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const { showInlineDashboard } = this.state;
    return (
      <div>
        <h1>React Examples</h1>

        <h2>Inline Dashboard</h2>
        <label>
          <input
            type="checkbox"
            checked={showInlineDashboard}
            onChange={(event) => {
              this.setState({
                showInlineDashboard: event.target.checked,
              });
            }}
          />
          Show Dashboard
        </label>
        {showInlineDashboard && (
          <Dashboard
            uppy={this.uppy}
            plugins={["GoogleDrive"]}
          />
        )}

        <h2>Drag Drop Area</h2>
        <DragDrop
          uppy={this.uppy}
          locale={{
            strings: {
              chooseFile: "Boop a file",
              orDragDrop: "or yoink it here",
            },
          }}
        />

      </div>
    );
  }
}

export default Media;
