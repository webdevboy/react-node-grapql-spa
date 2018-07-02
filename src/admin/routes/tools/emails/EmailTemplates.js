import React, { Component } from "react";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import StateTag from "admin/components/StateTag";
import NoResultsRow from "admin/components/NoResultsRow";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./EmailTemplate.css";
import Breadcrumbs from "admin/components/Breadcrumbs";
import history from "core/history";
import cx from "classnames";
import { connect } from "react-redux";
import {
  Alert,
  Menu,
  Switch,
  ContextMenu,
  Tooltip,
  Overlay,
  MenuItem,
  MenuDivider,
  Popover,
  Intent,
  Toaster,
  PopoverInteractionKind,
  Position
} from "@blueprintjs/core";
import moment from "moment/moment";
import _ from "lodash";
import TemplateGroupDetail from "./TemplateGroupDetail";
import { removeEmailTemplate, removeEmailTemplateTranslation } from "admin/actions/emailTemplate";
import getUrlFromPost from "utils/getUrlFromPost";

const GroupRow = ({ id, templates, master, select, isActive, editTemplate, toggleFeatured, removeTemplate }) => {
  return (
    <tr onClick={() => select(id, templates)} className={isActive ? "is-active" : null}>
      <td>{master.email_id}</td>
      <td>
        <div>
          <a href="#">{master.name}</a>
        </div>
        <div>
          {templates.map(template => (
            <StateTag
              onClick={e => editTemplate(e, template.id)}
              key={`tag-locale-${template.language.id}`}
              value={"published"}
              text={template.language.language}
            />
          ))}
        </div>
      </td>
      <td>{master.description}</td>
      <td className="single-action-col">
        <Action
          key="item-action-remove"
          icon="pt-icon-remove"
          intent="pt-intent-danger"
          action={e => removeTemplate(e, id)}
          tooltip="Remove Template"
        />
      </td>
    </tr>
  );
};

class EmailTemplates extends Component {
  static contextTypes = {
    client: PropTypes.object.isRequired,
    locale: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      predicate: ["updated_at", "created_at", "publish_at"],
      order: [true, false, false],
      selected: undefined,
      search: "",
      removeWarning: false,
      removeWarningTranslation: false
    };
  }

  alertRemoveTemplate = (e, id) => {
    e.stopPropagation();
    this.setState({
      removeWarning: true,
      deleteQueue: id
    });
  };

  confirmRemoveTemplate = async () => {
    await this.props.removeEmailTemplate(this.state.deleteQueue);
    this.setState({
      deleteQueue: undefined,
      removeWarning: false
    });
    this.props.refetch();
  };

  closeRemoveWarning = () => {
    this.setState({
      removeWarning: false,
      removeWarningTranslation: false
    });
  };

  alertRemoveTemplateTranslation = (e, id) => {
    e.stopPropagation();
    this.setState({
      removeWarningTranslation: true,
      deleteQueue: id
    });
  };

  confirmRemoveTemplateTranslation = async () => {
    await this.props.removeEmailTemplateTranslation(this.state.deleteQueue);
    this.setState({
      deleteQueue: undefined,
      removeWarningTranslation: false
    });
    this.props.refetch();
  };

  addTemplate = e => {
    e.preventDefault();
    history.push("/tools/email-manager/add");
  };

  editAircraft = (e, id) => {
    e.stopPropagation();
    history.push(`/tools/email-manager/edit/${id}`);
  };

  select = (id, group) => {
    if (this.state.selected !== id) {
      this.setState({
        selected: id,
        templateGroup: group
      });
    }
  };

  toggleSortBy = (e, predicate) => {
    e.preventDefault();

    if (this.state.predicate.every((pred, i) => pred === predicate[i])) {
      this.setState({
        order: predicate.map((predicate, index) => !this.state.order[index] || false)
      });
    } else {
      this.setState({
        predicate,
        order: predicate.map((predicate, index) => this.state.order[index] || false)
      });
    }
  };

  filterBy = (field, value) => {
    if (value !== null) {
      this.props.setFilter({ filter: { field, value } });
      this.setState({ selected: [] });
    }
  };

  closeSidebar = () => {
    this.setState({ selected: undefined });
  };

  changeSearch = e => {
    this.setState({
      ...this.state,
      searchValue: e.target.value
    });
  };

  translateTemplate = async (e, id, lang_id, duplicate = false) => {
    e.preventDefault();
    return history.push(`/tools/email-manager/edit/${id}/translate/${lang_id}`);
  };

  render() {
    const { currentRoute, languages, defaultLanguage, templatesArray } = this.props;
    const { searchValue } = this.state;
    const loweredQuery = searchValue ? searchValue.toLowerCase() : "";
    const templates = templatesArray.filter(template => _.toLower(template.name).includes(loweredQuery));
    const grouped = _.groupBy(templates, template => template.email_id);

    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={currentRoute} />;

    const filters = [
      <Filter
        tooltip="Search for title here"
        key="filter-search"
        type="search"
        label="Search ..."
        search={this.changeSearch}
      />
    ];

    const actions = [
      <Action
        key="action-add"
        icon="pt-icon-add"
        intent="pt-intent-primary"
        action={this.addTemplate}
        label="Create Email Template"
      />
      // <Action key={`action-edit`} icon="pt-icon-edit" intent="pt-intent-default" className={(this.state.selected.length !== 1) ? 'pt-disabled' : null} action={this.editUser} tooltip={'Edit User'} />,
    ];

    return (
      <Page actions={actions} filters={filters} breadcrumbs={breadcrumbs}>
        <Alert
          intent={Intent.DANGER}
          iconName="pt-icon-warning-sign"
          isOpen={this.state.removeWarning}
          confirmButtonText={"I'm sure!"}
          onConfirm={this.confirmRemoveTemplate}
          cancelButtonText="Cancel"
          onCancel={this.closeRemoveWarning}
        >
          <span>This will erase the email templates, including translations, are you sure?</span>
        </Alert>

        <Alert
          intent={Intent.DANGER}
          iconName="pt-icon-warning-sign"
          isOpen={this.state.removeWarningTranslation}
          confirmButtonText={"I'm sure!"}
          onConfirm={this.confirmRemoveTemplateTranslation}
          cancelButtonText="Cancel"
          onCancel={this.closeRemoveWarning}
        >
          <span>This will delete the selected translation, are you sure?</span>
        </Alert>

        <div className={s.emailTemplate}>
          <table className="pt-table pt-striped lj-table">
            <thead>
              <tr>
                <th>Email ID</th>
                <th>Name</th>
                <th>Description</th>
                <th className="single-action-col" />
              </tr>
            </thead>
            <tbody onScroll={this.onScrollToBottom}>
              {Object.keys(grouped).length ? (
                Object.keys(grouped).map((key, index) => {
                  const group = grouped[key];
                  const master = _.find(group, { language: defaultLanguage }) || group[0];

                  return (
                    <GroupRow
                      id={key}
                      key={`templates-group-${key}`}
                      templates={group}
                      master={master}
                      select={this.select}
                      isActive={this.state.selected === key}
                      editTemplate={this.editTemplate}
                      removeTemplate={this.alertRemoveTemplate}
                    />
                  );
                })
              ) : (
                <NoResultsRow cols={8} />
              )}
            </tbody>
          </table>
        </div>
        <Overlay isOpen={this.state.selected} transitionName="slide" inline onClose={this.closeSidebar}>
          <TemplateGroupDetail
            key="sidebar-email"
            groupId={this.state.selected}
            templateGroup={this.state.templateGroup}
            removeTemplate={this.alertRemoveTemplateTranslation}
          />
        </Overlay>
      </Page>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const availableLocales = state.runtime.availableLocales;
  const languages = _.keyBy(Object.values(availableLocales), "id");
  const defaultLanguage = availableLocales[state.runtime.defaultLocale];
  return {
    languages,
    defaultLanguage
  };
};

export default connect(mapStateToProps, {
  removeEmailTemplate,
  removeEmailTemplateTranslation
})(withStyles(s)(EmailTemplates));
