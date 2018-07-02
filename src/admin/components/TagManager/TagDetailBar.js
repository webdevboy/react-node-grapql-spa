import Sidebar from "admin/components/Sidebar";
import StateTag from "admin/components/StateTag";
import React, { Component } from "react";
import { connect } from "react-redux";
import Action from "admin/components/Action";
import cx from "classnames";
import moment from "moment";
import * as _ from "lodash";
import { DateRangePicker, DateRangeInput } from "@blueprintjs/datetime";
import LegendBlock from "admin/components/LegendBlock";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { Intent, Menu, MenuItem } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/labs";
import { Tree } from "@blueprintjs/core";
import history from "core/history";
import { updateTermName } from "admin/actions/termTaxonomy";

class TagDetailBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editName: false,
      name: this.props.tag && this.props.tag.term.name || "",
    };
  }

  toggleEditName = () => this.setState({ editName: !this.state.editName });

  saveName = async e => {
    const { name } = this.state;
    this.toggleEditName();
    const data = await this.props.updateTermName({
      oldName: this.props.tag.term.name,
      name: name
    });
    this.props.refreshAndClose();
  };

  handleChangeName = e => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };

  render() {
    const { tag, languages } = this.props;
    if (!tag) {
      return null;
    }

    return (
      <Sidebar float hasOverlay>

        <div className="body">
          <div className="pt-card pt-elevation-0 space">

              <div className="row">
                <div className="col-12">
                  <b className="label-row">Name:</b>
                  {this.state.editName ? (
                    <input
                      maxLength={20}
                      type="text"
                      name="name"
                      className="pt-input pt-minimal"
                      id="name"
                      value={this.state.name}
                      onChange={this.handleChangeName}
                      placeholder="Name"
                    />
                  ) : (
                    tag.term.name
                  )}

                  <button
                    className={cx(
                      "pt-small pt-button pt-minimal",
                      this.state.editName ? "pt-icon-small-tick pt-intent-success" : "pt-icon-edit"
                    )}
                    onClick={this.state.editName ? this.saveName : this.toggleEditName}
                    style={{ float: "right" }}
                  />

                  {this.state.editName ? (
                    <button
                      className={cx("pt-small pt-button pt-minimal pt-icon-cross pt-intent-danger")}
                      onClick={this.toggleEditName}
                      style={{ float: "right" }}
                    />
                  ) : null}
                </div>
              </div>
          
          </div>
        </div>
      </Sidebar>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const languages = Object.values(state.runtime.availableLocales);
  return {
    languages,
  };
};

export default connect(mapStateToProps, { updateTermName })(TagDetailBar);
