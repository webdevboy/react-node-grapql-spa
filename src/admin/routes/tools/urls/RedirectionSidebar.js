import React, { Component } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { Button, Switch } from "@blueprintjs/core";
import TooltipLabel from "../../../components/TooltipLabel";
import Sidebar from "../../../components/Sidebar";
import Action from "../../../components/Action";
import s from "./UrlManager.css";
import { createRedirection, updateRedirection, removeRedirection } from "../../../actions/redirections";

export class RedirectionSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFrom: "",
      edit: false,
      redirection: {
        from: [],
        to: "",
        description: "",
        isPermanent: this.props.redirection ? this.props.redirection.http_code === 301 : false,
      }
    };

    this.original = this.state.redirection;
  }

  reset = () => {
    this.setState({
      redirection: this.original
    });
  };

  toggleEdit = e => {
    e.preventDefault();
    this.setState({
      edit: true,
      redirection: {
        from: this.props.redirection.link,
        to: this.props.redirection.redirect,
        description: this.props.redirection.description,
        isPermanent: this.props.redirection.http_code === 301,
      }
    });
  };

  cancelEdit = e => {
    e.preventDefault();
    this.setState({ edit: false }, () => {
      this.reset();
    });
  };

  updateValue = e => {
    this.setState({
      ...this.state,
      redirection: {
        ...this.state.redirection,
        [e.target.name]: e.target.value
      }
    });
  };

  updateCurrentFrom = e => {
    this.setState({
      currentFrom: e.target.value
    });
  };

  appendPathFrom = () => {
    if (this.state.currentFrom.length) {
      this.setState(
        {
          ...this.state,
          currentFrom: "",
          redirection: {
            ...this.state.redirection,
            from: this.state.redirection.from.concat(this.state.currentFrom)
          }
        },
        () => {
          this.currentFrom.focus();
        }
      );
    }
  };

  removePathFrom = index => {
    const newFrom = this.state.redirection.from.filter((from, i) => i !== index);

    this.setState({
      ...this.state,
      redirection: {
        ...this.state.redirection,
        from: newFrom
      }
    });
  };

  togglePermanentRedirection = () => {
    this.setState({
      ...this.state,
      redirection: {
        ...this.state.redirection,
        isPermanent: !this.state.redirection.isPermanent
      }
    });
  }

  addRedirection = () => {
    const { add } = this.props;
    const { redirection, currentFrom } = this.state;
    return (
      <div>
        <div className="pt-form-group">
          <label className="pt-label" htmlFor="path-from">
            <TooltipLabel required label="From" tooltip="The path which will be replaced - From" />
            <div className="pt-input-group pt-fill">
              <input
                ref={el => (this.currentFrom = el)}
                id="path-from"
                type="text"
                name="from"
                className="pt-input"
                value={currentFrom}
                placeholder="/route/from"
                onChange={e => this.updateCurrentFrom(e)}
              />
              <div className="pt-input-action">
                <Button
                  className="pt-button pt-minimal pt-intent-success pt-icon-add"
                  onClick={() => this.appendPathFrom()}
                />
              </div>
            </div>
          </label>
          {redirection.from.map((from, index) => (
            <div key={`redirection-index-${index}`} className="pt-input-group pt-fill">
              <input readOnly type="text" className="pt-disabled pt-input" value={from} />
              <div className="pt-input-action">
                <Button
                  className="pt-button pt-minimal pt-intent-danger pt-icon-remove"
                  onClick={() => this.removePathFrom(index)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-form-group">
          <label className="pt-label" htmlFor="path-to">
            <TooltipLabel required label="To" tooltip="The new path for this redirection - To" />
            <div className="pt-input-group pt-fill">
              <input
                id="path-to"
                name="to"
                type="text"
                className="pt-input"
                value={redirection.to}
                placeholder="/route/from"
                onChange={e => this.updateValue(e)}
              />
            </div>
          </label>
        </div>

        <div className="pt-form-group">
          <label className="pt-label" htmlFor="path-to">
            <TooltipLabel
              label="Description"
              tooltip="This is a description that may be usefull if you need to describe the purpose of the redirection"
            />
            <div className="pt-input-group pt-fill">
              <textarea
                id="description"
                type="text"
                name="description"
                value={redirection.description}
                className="pt-input"
                placeholder="Redirection description"
                onChange={e => this.updateValue(e)}
              />
            </div>
          </label>
        </div>
        <div className="pt-form-group">
          <Switch
            label="Permanent Redirection"
            name="permanent_redirection"
            checked={redirection.isPermanent}
            onChange={this.togglePermanentRedirection}
          />
        </div>
      </div>
    );
  };

  infoRedirection = () => {
    const { redirection } = this.props;
    const { edit } = this.state;

    if (edit) {
      return this.addRedirection();
    }
    const port = __DEV__ ? `:${window.App.port}` : "";
    const subDomain = __DEV__ ? "" : "www.";
    const basePath = `https://${subDomain}${window.App.hostname}${port}`;

    return (
      <div className="pt-card pt-elevation-0 space">
        <div className="row block">
          <span>
            <b className="label-row">From:</b>
          </span>
          <ul>
            {redirection.link.map(path => (
              <li>
                <span className="pt-tag pt-minimal">
                  <a target="_blank" href={`${window.App.hostname}${path}`}>
                    {" "}
                    {`${window.App.hostname}${path}`}{" "}
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="row">
          <span>
            <b className="label-row">To:</b>
          </span>
          <span className="pt-tag pt-minimal">
            <a target="_blank" href={`${window.App.hostname}${redirection.redirect}`}>
              {" "}
              {`${window.App.hostname}${redirection.redirect}`}{" "}
            </a>
          </span>
        </div>
        <div className="row block">
          <span>
            <b className="label-row">Description:</b>
          </span>
          <span>{redirection.description}</span>
        </div>
        <div className="row block">
          <Switch
            disabled = {true}
            label="Permanent Redirection"
            name="permanent_redirection"
            checked={redirection.http_code === 301}
            onChange={this.togglePermanentRedirection}
          />
        </div>
      </div>
    );
  };

  save = async e => {
    e.preventDefault();
    await this.props.createRedirection({
      link: this.state.redirection.from,
      redirect: this.state.redirection.to,
      description: this.state.redirection.description,
      http_code: this.state.redirection.isPermanent ? 301 : 302,
    });
    this.props.closeSidebar();
  };

  saveEdit = async e => {
    e.preventDefault();
    await this.props.updateRedirection({
      id: this.props.redirection.id,
      link: this.state.redirection.from,
      redirect: this.state.redirection.to,
      description: this.state.redirection.description,
      http_code: this.state.redirection.isPermanent ? 301 : 302,
    });
    this.setState({ edit: false }, () => {
      this.reset();
    });
  };

  remove = e => {
    e.preventDefault();
    this.props.removeRedirection({ id: this.props.redirection.id });
    this.props.closeSidebar();
  };

  cancel = e => {
    e.preventDefault();
    this.props.closeSidebar();
  };

  render() {
    const { add, isLoading } = this.props;
    const { edit } = this.state;
    return (
      <Sidebar float hasOverlay>
        <div className="header">
          {add ? <h4>New Redirection</h4> : <h4>Redirection</h4>}
          <div className="actions">
            {add
              ? [
                  <Action
                    key="item-action-save"
                    icon="pt-icon-tick-circle"
                    intent="pt-intent-success"
                    action={e => this.save(e)}
                    tooltip="Save Redirection"
                    loading={isLoading}
                  />,
                  <Action
                    key="item-action-cancel"
                    icon="pt-icon-cross"
                    intent="pt-intent-danger"
                    action={e => this.cancel(e)}
                    tooltip="Cancel"
                  />
                ]
              : [
                  edit ? (
                    <Action
                      key="item-action-save-edit"
                      icon="pt-icon-tick-circle"
                      intent="pt-intent-success"
                      action={e => this.saveEdit(e)}
                      tooltip="Save Redirection"
                    />
                  ) : (
                    <Action
                      key="item-action-edit"
                      icon="pt-icon-edit"
                      intent="pt-intent-primary"
                      action={e => this.toggleEdit(e)}
                      tooltip="Edit Redirection"
                    />
                  ),
                  edit ? (
                    <Action
                      key="item-action-cancel"
                      icon="pt-icon-cross"
                      intent="pt-intent-danger"
                      action={e => this.cancelEdit(e)}
                      tooltip="Cancel Edit"
                    />
                  ) : (
                    <Action
                      key="item-action-remove"
                      icon="pt-icon-remove"
                      intent="pt-intent-danger"
                      action={e => this.remove(e)}
                      tooltip="Delete Redirection"
                    />
                  )
                ]}
          </div>
        </div>

        <div className="body">{add ? this.addRedirection() : this.infoRedirection()}</div>
      </Sidebar>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.redirections.isLoading
  };
};

const mapDispatchToProps = {
  createRedirection,
  updateRedirection,
  removeRedirection
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(RedirectionSidebar));
