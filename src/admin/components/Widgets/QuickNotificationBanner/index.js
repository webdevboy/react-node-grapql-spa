import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { connect } from "react-redux";
import { updateOption } from 'admin/actions/settings';
import _ from "lodash";
import Widget from '../../Widget';

class QuickBanner extends React.Component {

  state = {
    active: false,
  }

  submitChanges() {
    // this.props.updateSettings({})
    // this.props.updateGeneralSettings(this.state);
    // const state = [];
    // Object.keys(this.state).map(item => state.push({ option: item, value: this.state[item] }));
    // this.props.updateOption(state);
  }

  onChange(toggle) {
    this.setState({ maintenance: toggle });
  }

  handleChange = () => {
    // make something to switch
    this.setState({ active: !this.state.active });
  }

  render() {

    const toggle = {
      action: this.handleChange,
      state: this.state.active,
    };

    return (
      <Widget title="Quick Notification Banner" toggle={toggle}>
        <textarea
          className={"pt-input pt-fill"}
          value={this.state.maintenance_message}
          name="maintenance_message"
          // onChange={this.handleChange}
          placeholder="Global website notification message ..."
        />
      </Widget>
    );
  }
}

const mapStateToProps = state => ({
  options: state.options,
});

export default connect(mapStateToProps, { updateOption })(QuickBanner);
