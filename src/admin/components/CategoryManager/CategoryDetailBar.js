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
import { addTermTaxonomy, updateTermDisplayName, updateTermName } from "admin/actions/termTaxonomy";

class CategoryDetailBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: undefined,
      master: this.props.master,
      editDisplayName: false,
      editName: false,
      name: this.props.master.term.name,
      displayName: this.props.master.term.meta ? this.props.master.term.meta.displayName : "",
      displayNameTrans: "",
      missingTranslations: this.props.missingTranslations
    };
  }

  toggleEditName = () => this.setState({ editName: !this.state.editName });

  saveName = async e => {
    const { master, name } = this.state;
    this.toggleEditName();
    const data = await this.props.updateTermName({
      oldName: master.term.name,
      name: name
    });
    this.props.refreshAndClose();
  };

  toggleEditDisplayName = () => this.setState({ editDisplayName: !this.state.editDisplayName });

  saveDisplayName = async () => {
    const { master } = this.state;
    this.toggleEditDisplayName();
    const data = await this.props.updateTermDisplayName({
      id: master.term.id,
      meta: {
        ...master.term.meta,
        displayName: this.state.displayName
      }
    });
    this.props.refresh();
  };

  setMaster = category => this.setState({ master: category });

  componentDidUpdate(prevProps, prevState) {
    if (this.props.master) {
      if (this.props.master !== prevProps.master || prevProps.group.length !== this.props.group.length) {
        this.setState({
          master: this.props.master
        });
      }
    }
  }

  saveTranslation = async e => {
    e.preventDefault();
    const { master, parent } = this.props;
    const { selected } = this.state;
    //Find parent
    let parent_id = "";
    if (master.parent) {
      const catParent = parent.find(cat => {
        return cat.term.name === master.parent.name && cat.term.language.id === selected;
      });
      parent_id = catParent.term.id;
    }
    const cat = {
      taxonomy: master.taxonomy,
      name: master.term.name,
      meta: { displayName: this.state.displayNameTrans },
      language_id: this.state.selected,
      parent_id: parent_id
    };
    const data = await this.props.addTermTaxonomy(cat);
    this.setState({
      selected: undefined
      //missingTranslations: this.state.missingTranslations.filter(lang => lang.id !== selected),
    });
    this.props.refresh();
  };

  cancelTranslation = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ selected: undefined });
  };

  toggleTranslation = (e, id) => {
    e.preventDefault();
    this.setState({ selected: id });
  };

  handleChangeName = e => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };

  handleChangeDisplayName = e => {
    e.preventDefault();
    this.setState({ displayName: e.target.value });
  };

  render() {
    const { group, languages, removeCategory, parent, refresh } = this.props;
    const { master, selected, displayName, missingTranslations } = this.state;

    if (!master) {
      return null;
    }

    return (
      <Sidebar float hasOverlay>
        <div className="header">
          {this.state.editName ? (
            <input
              maxLength={20}
              type="text"
              name="name"
              className="pt-input pt-minimal"
              id="displayName"
              value={this.state.name}
              onChange={this.handleChangeName}
              placeholder="Type"
            />
          ) : (
            <h4>{master && master.term.name}</h4>
          )}

          {master.parent ? (
            <button
              className={cx(
                "pt-small pt-button pt-minimal",
                this.state.editName ? "pt-icon-small-tick pt-intent-success" : "pt-icon-edit"
              )}
              onClick={this.state.editName ? this.saveName : this.toggleEditName}
              style={{ float: "right" }}
            />
          ) : null}

          {this.state.editName ? (
            <button
              className={cx("pt-small pt-button pt-minimal pt-icon-cross pt-intent-danger")}
              onClick={this.toggleEditName}
              style={{ float: "right" }}
            />
          ) : null}
          <div className="actions">
            {master.parent && (
              <Action
                key="item-action-remove"
                icon="pt-icon-remove"
                intent="pt-intent-danger"
                action={e => removeCategory(e, master.term.id)}
                tooltip="Remove Category"
              />
            )}
          </div>
        </div>

        <div className="body">
          <div className="pt-card pt-elevation-0 space">
            <div className="row">
              <div className="col-12">
                <b className="label-row">Language:</b>
                <span className={cx("pt-tag pt-minimal")}>{master.term.language.language}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="tags">
                  {group.map(category => (
                    <StateTag
                      onClick={e => this.setMaster(category)}
                      key={`tag-locale-${category.term.language.id}`}
                      value={"published"}
                      selected={category.term.language.id === master.term.language.id}
                      text={category.term.language.locale}
                    />
                  ))}
                </div>
              </div>
            </div>

            {master.source !== null ? (
              <div className="row">
                <div className="col-12">
                  <b className="label-row">Translation:</b>
                  {this.state.editDisplayName ? (
                    <input
                      maxLength={50}
                      type="text"
                      name="name"
                      className="pt-input pt-fill"
                      id="displayName"
                      value={this.state.displayName}
                      onChange={this.handleChangeDisplayName}
                      placeholder="Translation"
                    />
                  ) : (
                    master.term.meta && master.term.meta.displayName
                  )}

                  <button
                    className={cx(
                      "pt-small pt-button pt-minimal",
                      this.state.editDisplayName ? "pt-icon-small-tick pt-intent-success" : "pt-icon-edit"
                    )}
                    onClick={this.state.editDisplayName ? this.saveDisplayName : this.toggleEditDisplayName}
                    style={{ float: "right" }}
                  />

                  {this.state.editDisplayName ? (
                    <button
                      className={cx("pt-small pt-button pt-minimal pt-icon-cross pt-intent-danger")}
                      onClick={this.toggleEditDisplayName}
                      style={{ float: "right" }}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
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
                          {selected === id ? (
                            [
                              <button
                                className="pt-button pt-small pt-minimal pt-intent-danger pt-icon-undo"
                                onClick={e => this.cancelTranslation(e)}
                              />,
                              <button
                                className="pt-button pt-small pt-minimal pt-intent-success pt-icon-tick-circle"
                                onClick={e => this.saveTranslation(e)}
                              />
                            ]
                          ) : (
                            <button
                              className="pt-button pt-small pt-minimal pt-icon-plus"
                              onClick={e => this.toggleTranslation(e, id)}
                            />
                          )}
                        </div>
                      </div>
                      <div className="info-block">
                        <div className="block list" style={{ margin: "0" }}>
                          {selected === id ? (
                            <textarea
                              style={{ flex: "1", height: "120px" }}
                              className="pt-input pt-minimal"
                              onChange={e => this.setState({ displayNameTrans: e.target.value })}
                              value={this.state.displayNameTrans}
                              maxlength={20}
                              placeholder={"Name"}
                            />
                          ) : null}
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

  const group = ownProps.group;
  const category = _.find(group, { language: ownProps.defaultLanguage });
  const master = category || group[0];
  const translationsFound = group.map(category => category.term.language.id);
  let missingTranslations = languages.filter(language => translationsFound.indexOf(language.id) == -1);
  if (master.parent) {
    let parentLangs = [];
    ownProps.parent.forEach(cat => {
      if (cat.term.name === master.parent.name) {
        parentLangs.push(cat.term.language);
      }
    });
    const translationParent = parentLangs.map(lang => lang.id);
    missingTranslations = missingTranslations.filter(lang => translationParent.indexOf(lang.id) != -1);
  }

  return {
    languages,
    group,
    master,
    missingTranslations
  };
};

export default connect(mapStateToProps, { addTermTaxonomy, updateTermDisplayName, updateTermName })(CategoryDetailBar);
