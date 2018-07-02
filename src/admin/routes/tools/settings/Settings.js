import React, { Component } from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Settings.css";
import Options from "../../../components/Widgets/Settings";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { SETTINGS } from "../../../../fixtures";
import Currency from "../../../components/Widgets/Currencies/currency";

class Settings extends Component {
  site_default = SETTINGS.site;
  aws_settings = SETTINGS.aws;
  mail_smtp_settings = SETTINGS.smtp;
  social_media_settings = SETTINGS.social;

  render() {
    const { currentRoute } = this.props;
    return (
      <div className="wrapper">
        <div className="actions">
          <Breadcrumbs route={currentRoute} />
        </div>

        <div className="body">
          <div className={s.widgets}>
            <Options key="general" title="General Settings" options={this.site_default} />
            <Options key="aws" title="AWS S3 Settings" options={this.aws_settings} />
            <Options key="smtp" title="Email SMTP Settings" options={this.mail_smtp_settings} />
            <Options key="social" title="Social Networks" options={this.social_media_settings} />
            
            <Currency />

          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Settings);
