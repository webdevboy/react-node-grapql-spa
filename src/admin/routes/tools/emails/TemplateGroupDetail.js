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

class TemplateGroupDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      master: this.props.master,
    };
  }

  setMaster = template => this.setState({ master: template });

  componentDidUpdate(prevProps, prevState) {
    if (this.props.master) {
      if (this.props.master !== prevProps.master || prevProps.group.length !== this.props.group.length) {
        this.setState({
          master: this.props.master,
        });
      }
    }
  }

  editTemplate = (e, template) => {
    e.stopPropagation();
    return history.push(`/tools/email-manager/edit/${template.id}`);
  };


  translateTemplate = (e, template, langId) => {
    e.stopPropagation();
    return history.push(`/tools/email-manager/edit/${template.id}/translate/${langId}`);
  };

  render() {
    const { group, missingTranslations, languages, removeTemplate } = this.props;
    const { master } = this.state;

    if (!master) {
      return null;
    }
    return (
      <Sidebar float hasOverlay>
        <div className="header">

          <h4>{master && master.name}</h4>

          <div className="actions">
            <Action
              key="item-action-edit"
              icon="pt-icon-edit"
              intent="pt-intent-primary"
              action={e => this.editTemplate(e, master)}
              tooltip="Edit Email Template"
            />
            <Action
              key="item-action-remove"
              icon="pt-icon-remove"
              intent="pt-intent-danger"
              action={e => removeTemplate(e, master.id)}
              tooltip="Remove Email Template"
            />
          </div>
        </div>

        <div className="body">
          <div className="pt-card pt-elevation-0 space">
            <div className="row">
              <div className="col-12">
                <b className="label-row">Language:</b>
                <span className={cx("pt-tag pt-minimal")}>{master.language.language}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <b className="label-row">Description:</b>
                <span className="text">{master.description}</span>
                <div className="tags">
                  {group.map(template => (
                    <StateTag
                      onClick={e => this.setMaster(template)}
                      key={`tag-locale-${template.language.id}`}
                      value={'published'}
                      selected={template.language.id === master.language.id}
                      text={template.language.locale}
                    />
                  ))}
                </div>
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
                            onClick={e => this.translateTemplate(e, master, id)}
                          >
                            Create
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
      </Sidebar>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const languages = Object.values(state.runtime.availableLocales);

  const group = ownProps.templateGroup;
  const template = _.find(group, { language: ownProps.baseLang });
  const master = template || group[0];

  const translationsFound = group.map(template => template.language.id);
  const missingTranslations = languages.filter(language => translationsFound.indexOf(language.id) == -1);

  return {
    languages,
    group,
    master,
    missingTranslations,
  };
};

export default connect(mapStateToProps)(TemplateGroupDetail);
