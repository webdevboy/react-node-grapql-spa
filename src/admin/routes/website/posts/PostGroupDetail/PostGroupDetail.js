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
import getUrlFromPost from "utils/getUrlFromPost";
import { sortPostByLanguage } from "utils/sortPostByLanguage";

function filterCategories(categories, lang) {
  return categories.filter(category => category.language === lang);
}

class PostGroupDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      master: this.props.master,
      editSource: false,
      source: this.props.master.source,
    };
  }

  toggleEditSource = () => this.setState({ editSource: !this.state.editSource });

  saveSource = () => {
    this.toggleEditSource();
  };

  setMaster = event => this.setState({ master: event });

  componentDidUpdate(prevProps, prevState) {
    if (this.props.master) {
      if (this.props.master !== prevProps.master || prevProps.group.length !== this.props.group.length) {
        this.setState({
          master: this.props.master,
        });
      }
    }
  }

  editPost = (e, post) => {
    e.stopPropagation();
    return history.push(`/website/${post.type}s/edit/${post.id}`);
  };

  translatePost = (e, post, langId, flag) => {
    e.stopPropagation();
    if (flag) {
      return history.push(`/website/${post.type}s/edit/${post.id}/duplicate/${langId}`);
    } else {
      return history.push(`/website/${post.type}s/edit/${post.id}/translate/${langId}`);
    }
  };

  viewPost = link => {
    window.open(link, "_blank");
  };

  render() {
    const { group, missingTranslations, languages, removePost } = this.props;
    const { master } = this.state;

    if (!master) {
      return null;
    }

    const port = __DEV__ ? `:${window.App.port}` : "";
    const subDomain = __DEV__ ? "" : "www.";
    const basePath = `https://${subDomain}${window.App.hostname}${port}`;
    const link = basePath + getUrlFromPost(master.language.locale, master);

    return (
      <Sidebar float hasOverlay>
        <div className="header">
          <Action
            key="item-action-view"
            icon="pt-icon-eye-open"
            action={e => this.viewPost(link)}
            tooltip="View Post"
          />

          <h4>{master && master.title}</h4>

          <div className="actions">
            <Action
              key="item-action-edit"
              icon="pt-icon-edit"
              intent="pt-intent-primary"
              action={e => this.editPost(e, master)}
              tooltip="Edit Post"
            />
            <Action
              key="item-action-remove"
              icon="pt-icon-remove"
              intent="pt-intent-danger"
              action={e => removePost(e, master.id)}
              tooltip="Remove Post"
            />
          </div>
        </div>

        <div className="body">
          <div className="pt-card pt-elevation-0 space">
            <div className="row">
              <div className="col-12">
                <b className="label-row">Link:</b>
                <a target="_blank" href={link}>
                  {" "}
                  {link}{" "}
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <b className="label-row">Language:</b>
                <span className={cx("pt-tag pt-minimal")}>{master.language.language}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <b className="label-row">Summary:</b>
                <span className="text">{master.summary}</span>
                <div className="tags">
                  {sortPostByLanguage(group, master.language).map(post => (
                    <StateTag
                      onClick={e => this.setMaster(post)}
                      key={`tag-locale-${post.language.id}`}
                      value={post.state}
                      selected={post.language.id === master.language.id}
                      text={post.language.locale}
                    />
                  ))}
                </div>
              </div>
            </div>

            {master.source !== null ? (
              <div className="row">
                <div className="col-12">
                  <b className="label-row">Source:</b>
                  <span className="pt-icon-link" style={{ marginRight: "5px" }} />
                  <a target="_blank" rel="noreferrer" href={`https://${master.source}` || "#"} className="fill">
                    {master.source}
                  </a>
                  <button
                    className={cx(
                      "pt-small pt-button pt-minimal",
                      this.state.editSource ? "pt-icon-small-tick pt-intent-success" : "pt-icon-edit",
                    )}
                    onClick={this.state.editSource ? this.saveSource : this.toggleEditSource}
                    style={{ float: "right" }}
                  />

                  {this.state.editSource ? (
                    <button
                      className={cx("pt-small pt-button pt-minimal pt-icon-cross pt-intent-danger")}
                      onClick={this.cancelEditSource}
                      style={{ float: "right" }}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="row">
              <div className="col-12">
                <b className="label-row">State:</b>
                <StateTag value={master.state} />
                {master.state === "pending" ? (
                  <span style={{ fontSize: "12px", marginLeft: "5px" }}>
                    <u>{master.publish_at && moment(master.publish_at).format("lll")}</u>
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {!missingTranslations.length ? (
            <div className="row expanded">
              <div className="col-12">
                <div className="pt-non-ideal-state">
                  <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
                    <span className="pt-icon pt-icon-endorsed" />
                  </div>
                  <h4 className="pt-non-ideal-state-title">We're good!</h4>
                  <div className="pt-non-ideal-state-description">No translations missing!</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-12">
                <b className="label-row">Translations Missing:</b>
                <ul className="list">
                  {missingTranslations.map(({ locale, language, id }) => (
                    <li key={`missing-translation-${locale}`}>
                      <div className="list-item">
                        <span>
                          {language} <span className="pt-tag pt-minimal pt-intent-warning">{locale}</span>
                        </span>

                        <div className="actions">
                          <button
                            className="pt-button pt-small pt-minimal pt-icon-plus"
                            onClick={e => this.translatePost(e, master, id)}
                          >
                            Create
                          </button>
                          <button
                            className="pt-button pt-small pt-minimal pt-icon-duplicate pt-intent-primary"
                            onClick={e => this.translatePost(e, master, id, true)}
                          >
                            Duplicate
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="footer">
          <LegendBlock values={["published", "draft", "pending"]} />
        </div>
      </Sidebar>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const languages = Object.values(state.runtime.availableLocales);

  const group = ownProps.postGroup;
  const post = _.find(group, { language: ownProps.baseLang });
  const master = post || group[0];

  const translationsFound = group.map(post => post.language.id);
  const missingTranslations = languages.filter(language => translationsFound.indexOf(language.id) == -1);

  return {
    languages,
    group,
    master,
    missingTranslations,
  };
};

export default connect(mapStateToProps)(PostGroupDetail);
