import React from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./EmailTemplate.css";
import {
  Menu,
  Checkbox,
  Switch,
  Button,
  ContextMenu,
  Tooltip,
  Overlay,
  MenuItem,
  MenuDivider,
  Popover,
  Intent,
  Toaster,
  PopoverInteractionKind,
  Position,
} from "@blueprintjs/core";
import Breadcrumbs from "admin/components/Breadcrumbs";
import Filter from "admin/components/Filter";
import Action from "admin/components/Action";
import Page from "admin/components/Page";
import cx from "classnames";
import { connect } from "react-redux";
import { Query, Mutation } from "react-apollo";
import { Suggest, MultiSelect, TagInput } from "@blueprintjs/labs";
import history from "core/history";
import TooltipLabel from "admin/components/TooltipLabel";
import { DateRangePicker, DateTimePicker, TimePickerPrecision, DateRangeInput } from "@blueprintjs/datetime";
import moment from "moment";
import LoadingSpinner from "admin/components/LoadingSpinner";
import UPSERT_TEMPLATE from "admin/mutations/addEmailTemplate.graphql";
import EmailEditor from "./EmailEditor";

const Collapsed = ({ saveEmptyLeg, cancel }) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-confirm"
      onClick={e => saveEmptyLeg}
      intent={Intent.SUCCESS}
      text="Save"
      className={cx(s.menuItem)}
    />
    <MenuItem
      iconName="pt-icon-undo"
      onClick={e => cancel}
      text="Cancel"
      intent={Intent.NONE}
      className={cx(s.menuItem)}
    />
  </Menu>
);

class EmailTemplate extends React.Component {
  refHandlers = {
    toaster: ref => (this.toaster = ref),
    editor: ref => (this.editor = ref)
  };

  static propTypes = {};

  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const { template, defaultLanguage, isEdit, isTranslate, transLanguage } = this.props;
    if (isEdit) {
      this.state = {
        isLoading: false,
        template: {
          ...template,
          language_id: template.language.id
        }
      };
    } else if (isTranslate) {
      const {id, ...newTemplate} = template;
      this.state = {
        isLoading: false,
        template: {
          ...newTemplate,
          language_id: transLanguage
        }
      };
    } else {
      this.state = {
        isLoading: false,
        template: {
          name: "",
          email_id: "",
          description: "",
          subject: "",
          content_html: "",
          content_json: "",
          language_id: template && template.language ? template.language.id : defaultLanguage.id,
          email_to: []
        }
      };
    }
  }

  componentDidMount() {}

  handleChange = e => {
    this.setState({
      template: {
        ...this.state.template,
        [e.target.name]: e.target.value
      }
    });
  };

  handleChangeRecipient = (values) => {

    console.log(values);
    this.setState({
      template: {
        ...this.state.template,
        email_to: values,
      }
    });
  };

  validateTemplate(template) {
    let message = "";
    if (!template.email_id) {
      message = "Please fill the email id";
    }
    else if (!template.name) {
      message = "Please fill the email template name";
    } else {
      if (!template.description) {
        message = "Please fill email template description";
      } else if (!template.subject) {
        message = "Please fill email template subject";
      }
    }

    return message;
  }

  cancel = () => {
    history.push(`/tools/email-manager`);
  };

  saveEmailTemplate = async () => {
    const { template } = this.state;
    let errorMessage = this.validateTemplate(template);

    if (errorMessage) {
      this.toaster.show({
        message: errorMessage,
        timeout: 3000,
        intent: Intent.DANGER,
        iconName: "pt-icon-error"
      });
      return;
    }
    this.toaster.clear();
    let newTemplate;
    this.editor.exportHtml(async data => {
      const { design, html } = data;
      newTemplate = {
        ...template,
        content_html: html,
        content_json: design
      };

      const updated = await this.upsertTemplate({
        variables: {
          ...newTemplate
        }
      });
    });
  };

  onUpsertCompleted = ({ emailTemplate }) => {
    this.toaster.show({
      message: "Saved!",
      timeout: 3000,
      intent: Intent.SUCCESS,
      iconName: "pt-icon-success"
    });

    history.push(`/tools/email-manager/edit/${emailTemplate.id}`);
  };

  onUpsertError = error => {
    this.toaster.show({
      message: error.message,
      timeout: 3000,
      intent: Intent.DANGER,
      iconName: "pt-icon-error"
    });
  };

  render() {
    const { currentRoute, isTranslate, languages } = this.props;
    const { isLoading, template } = this.state;
    const lang = languages[template.language_id];
    const breadcrumbs = <Breadcrumbs route={currentRoute} />;
    const actions = [
      <Action
        key="action-confirm"
        icon="pt-icon-confirm"
        loading={isLoading}
        intent="pt-intent-success"
        action={this.saveEmailTemplate}
        label="Save"
      />,
      <Action key="action-cancel" icon="pt-icon-undo" intent="pt-intent-default" action={this.cancel} label="Close" />
    ];

    const actionPopover = <Collapsed save={this.saveEmptyLeg} cancel={this.cancel} />;

    return (
      <Page actions={actions} actionPopover={actionPopover} breadcrumbs={breadcrumbs}>
        <Mutation
          mutation={UPSERT_TEMPLATE}
          onCompleted={data => this.onUpsertCompleted(data)}
          onError={err => this.onUpsertError(err)}
        >
          {(upsertTemplate, { loading, error }) => {
            this.upsertTemplate = upsertTemplate;
            return (
              <div className={s.emailTemplate}>
                <Toaster position={Position.TOP} ref={this.refHandlers.toaster} />
                <form onSubmit={e => e.preventDefault()} className={s["emailTemplate-form"]}>
                  <div className="container">
                    <div className="pt-form-group">
                      <label className="pt-label" htmlFor="language">
                        <span>Language</span>
                        <input
                          maxLength={80}
                          type="text"
                          name="language"
                          className="pt-input pt-large pt-fill pt-bold"
                          id="language"
                          value={lang.language}
                          disabled
                        />
                      </label>
                    </div>
                    <div className="pt-form-group">
                      <label className="pt-label" htmlFor="Email ID">
                        <TooltipLabel label="Name" required tooltip="Please enter email id" />
                        <div className="pt-input-group">
                          <input
                            type="text"
                            name="email_id"
                            value={template.email_id}
                            className="pt-input pt-fill"
                            id="name"
                            onChange={this.handleChange}
                            placeholder="Email ID"
                            disabled={isTranslate ? "disabled" : ""}
                          />
                        </div>
                      </label>
                    </div>
                    <div className="pt-form-group">
                      <label className="pt-label" htmlFor="name">
                        <TooltipLabel label="Name" required tooltip="Please enter email template name without space" />
                        <div className="pt-input-group">
                          <input
                            type="text"
                            name="name"
                            value={template.name}
                            className="pt-input pt-fill"
                            id="name"
                            onChange={this.handleChange}
                            placeholder="Name"
                          />
                        </div>
                      </label>
                    </div>
                    <div className="pt-form-group">
                      <label className="pt-label" htmlFor="description">
                        <TooltipLabel label="Description" required tooltip="Please enter email template description" />
                        <div className="pt-input-group">
                          <input
                            type="text"
                            name="description"
                            value={template.description}
                            className="pt-input pt-fill"
                            id="description"
                            onChange={this.handleChange}
                            placeholder="Description"
                          />
                        </div>
                      </label>
                    </div>
                    <div className="pt-form-group">
                      <label className="pt-label" htmlFor="subject">
                        <TooltipLabel label="Subject" required tooltip="Please enter email template subject" />
                        <div className="pt-input-group">
                          <input
                            type="text"
                            name="subject"
                            value={template.subject}
                            className="pt-input pt-fill"
                            id="subject"
                            onChange={this.handleChange}
                            placeholder="Subject"
                          />
                        </div>
                      </label>
                    </div>
                    <div className="pt-form-group">
                      <label className="pt-label" htmlFor="recipients">
                        <TooltipLabel label="Email Recipients" tooltip="Please enter email recipients, leave empty if is a intended to client " />
                        <div className="pt-input-group">
                          <TagInput
                            id="recipients"
                            separator=","
                            leftIconName="pt-icon-email"
                            className={cx("pt-tag-input pt-input-group pt-input pt-fill", s.tag)}
                            onChange={(values) => this.handleChangeRecipient(values)}
                            values={this.state.template.email_to || []}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </form>
                <div className={s.editor}>
                  <EmailEditor ref={this.refHandlers.editor} design={template.content_json} />
                </div>
              </div>
            );
          }}
        </Mutation>
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

export default connect(mapStateToProps, {})(withStyles(s)(EmailTemplate));
