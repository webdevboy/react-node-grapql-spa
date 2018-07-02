import React, { Component } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import moment from "moment";
import { Intent, Menu, MenuItem } from "@blueprintjs/core";
import _ from "lodash";
import { DateRangePicker, DateRangeInput } from "@blueprintjs/datetime";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { Suggest } from "@blueprintjs/labs";
import LegendBlock from "../../../components/LegendBlock";
import s from "./Pages.css";
import { Tree } from "@blueprintjs/core";
import Sidebar from "../../../components/Sidebar";
import StateTag from "../../../components/StateTag";
import Action from "../../../components/Action";

function filterCategories(categories, lang) {
  return categories.filter(category => category.language === lang);
}

class PageSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      master: this.props.master,
      editSource: false,
      editCategory: false,
      source: this.props.master.source,
    };
  }

  toggleEditSource = () => this.setState({ editSource: !this.state.editSource })

  saveSource = () => {
    // this.props.editDate(this.props.groupId, this.state.dates[0], this.state.dates[1]);
    this.toggleEditSource();
  }

  toggleEditCategory = () => this.setState({ editCategory: !this.state.editCategory })

  saveCategory = () => {
    this.props.editCategory(this.props.groupId, this.state.category_id);
    this.toggleEditCategory();
  }

  cancelEditCategory = () => {
    this.setState({
      editCategory: false,
      category_id: this.state.master.category,
    });
  }

  setMaster = event => this.setState({ master: event, category_id: event.category })

  componentDidUpdate(prevProps, prevState) {
    if (this.props.master) {
      if (
        (this.props.master !== prevProps.master) ||
        (prevProps.group.length !== this.props.group.length)
      ) {
        this.setState({
          master: this.props.master,
          category_id: this.props.master.category,
        });
      }
    }
  }

  categoriesRoot = () => [
    {
      hasCaret: true,
      label: "Category",
      id: 0,
      path: [0],
      isExpanded: true,
      isSelected: false,
      childNodes: filterCategories(this.props.categories, this.state.master.language).map((cat, index) => ({
        label: <span className={s.categoryName}>{cat.name}</span>,
        iconName: (this.state.category_id === cat.id) ? "pt-icon-tick-circle" : "pt-icon-circle",
        secondaryLabel: <span className={s.secondaryLabel}>{(this.state.master.language !== this.props.baseLang) ? `(${this.props.baseCategories[index].name})` : null }</span>,
        id: cat.id,
        isExpanded: false,
        isSelected: (this.state.category_id === cat.id),
        path: [0, index],
      })),
    },
  ];

  onNodeClick = (node) => {
    if (node.id !== 0) {
      this.setState({
        category_id: node.id,
      });
    }
  }

  render() {
    const {
      page, missingTranslations, baseLang, languages, languagesById, viewArticle, editArticle, removeArticle, translateArticle,
    } = this.props;
    const { master } = this.state;

    const { cat_id } = categoriesById[master.category];
    const category = _.find(baseCategories, { cat_id });

    if (!master) {
      return null;
    }

    return (
      <Sidebar float hasOverlay>
        <div className="header">
          <Action key="item-action-view" icon="pt-icon-eye-open" action={e => viewArticle(e, master.id)} tooltip="View Article" />

          <h4>{ master && master.title}</h4>

          <div className="actions">
            <Action key="item-action-edit" icon="pt-icon-edit" intent="pt-intent-primary" action={e => editArticle(e, master.id)} tooltip="Edit Article" />
            <Action key="item-action-remove" icon="pt-icon-remove" intent="pt-intent-danger" action={e => removeArticle(e, master.id)} tooltip="Remove Article" />
          </div>

        </div>

        <div className="body">
          <div className="pt-card pt-elevation-0 space">
            <div className="row block">
              <b className="label-row">Title:</b>
              <p className="text">
                { page.title }
              </p>
              <div className="tags">
                <ul className={s.paths}>
                  { page.path.map((pagePath, index) =>
                    <li key={`path-${index}`}><span className="pt-tag pt-default pt-minimal">{pagePath}</span></li>
                  )}
                </ul>
              </div>
            </div>
            <div className={cx("row", (this.state.editCategory) ? "block" : "")}>

              <div className="row" style={{ width: "100%", marginBottom: "5px" }}>
                <b className="label-row" style={(this.state.editCategory) ? { flex: "1" } : {}}>Category:</b>
                { (!this.state.editCategory) ?
                  <span className="fill">
                    { category.name }
                  </span>
                  : null
                }
                <button
                  className={cx("pt-small pt-button pt-minimal", (this.state.editCategory) ? "pt-icon-small-tick pt-intent-success" : "pt-icon-edit")}
                  onClick={(this.state.editCategory) ? this.saveCategory : this.toggleEditCategory}
                />
                { (this.state.editCategory) ?
                  <button
                    className={cx("pt-small pt-button pt-minimal pt-icon-cross pt-intent-danger")}
                    onClick={this.cancelEditCategory}
                  /> : null
                }
              </div>

              { (this.state.editCategory) ?
                <Tree
                  className={cx(s.categories, "pt-elevation-0")}
                  contents={this.categoriesRoot()}
                  onNodeClick={this.onNodeClick}
                /> : null
              }

            </div>

            {
            (master.source !== null) ?
              <div className="row">
                <b className="label-row">Source:</b>
                <span className="pt-icon-link" style={{ marginRight: "5px" }} />
                <a target="_blank" rel="noreferrer" href={`https://${master.source}` || "#"} className="fill">
                  { master.source }
                </a>
                <button
                  className={cx("pt-small pt-button pt-minimal", (this.state.editSource) ? "pt-icon-small-tick pt-intent-success" : "pt-icon-edit")}
                  onClick={(this.state.editSource) ? this.saveSource : this.toggleEditSource}
                />

                {
                (this.state.editSource) ?
                  <button
                    className={cx("pt-small pt-button pt-minimal pt-icon-cross pt-intent-danger")}
                    onClick={this.cancelEditSource}
                  />
                  : null
                }
              </div>
              : null
          }

            <div className="row">
              <b className="label-row">State:</b>
              <StateTag value={master.state} />
              {
                (master.state === "pending") ?
                  <span style={{ fontSize: "12px", marginLeft: "5px" }}>
                    <u>{ master.publish_at && moment(master.publish_at).format("lll") }</u>
                  </span>
                : null
              }
            </div>


          </div>

          {
            (!missingTranslations.length)
            ?
              <div className="row expanded">
                <div className="pt-non-ideal-state">
                  <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
                    <span className="pt-icon pt-icon-endorsed" />
                  </div>
                  <h4 className="pt-non-ideal-state-title">We're good!</h4>
                  <div className="pt-non-ideal-state-description">
                  No translations missing!
                  </div>
                </div>
              </div>
            :
              <div className="row block">
                <b className="label-row">Translations Missing:</b>
                <ul className="list">
                  {
                  missingTranslations.map(({ locale, language }) =>
                    (<li key={`missing-translation-${locale.locale}`}>
                      <div className="list-item">
                        <span>
                          {locale.language} <span className="pt-tag pt-minimal pt-intent-warning">{locale.locale}</span>
                        </span>

                        <div className="actions">
                          <button className="pt-button pt-small pt-minimal pt-icon-plus" onClick={e => translateArticle(e, master.id, language.id)}>Create</button>
                          <button className="pt-button pt-small pt-minimal pt-icon-duplicate pt-intent-primary" onClick={e => translateArticle(e, master.id, language.id, true)}>Duplicate</button>
                        </div>

                      </div>
                     </li>))
                }
                </ul>
              </div>
          }

        </div>

        <div className="footer">

          <LegendBlock values={["published", "draft"]} />

        </div>
      </Sidebar>
    );
  }
}


const mapStateToProps = (state, ownProps) => {

  const defaultLocale = state.intl.locale || 'en';
  const languagesById = state.languages.byId;
  const languages = Object.values(state.languages.ids) || [];

  const locale = _.find(localesById, { locale: defaultLocale });
  const language = _.find(languagesById, { locale: locale.id });

  return {
    citiesArray: state.cities.ids.map(id => state.cities.byId[id]) || [],
    defaultLocale: state.intl.defaultLocale,
    languagesById,
    languages,
    baseLang: language.id,
    page: state.pages.byId[ownProps.pageId],
  };
};

export default connect(mapStateToProps)(withStyles(s)(PageSidebar));
