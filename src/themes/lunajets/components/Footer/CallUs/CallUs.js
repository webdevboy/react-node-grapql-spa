import React, { Component } from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import PropTypes from "prop-types";
import Text from "../../Primitives/Text";
import s from "./CallUs.css";
import AirportContactButton from "themes/lunajets/components/Content/Detail/Airport/AirportContactButton";

class CallUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const CallBtnSettings = {
      Text : "Call us",
      icon : "phone",
      id: "emptylegs-details-call-us-btn",
      href: "tel:+41844041844"
    };
    
    const MailBtnSettings = {
      Text: "Email us",
      icon: "mail",
      id: "emptylegs-details-email-us-btn",
      href: `mailto:lunajets@lunajets.com?subject=${encodeURI('Fly Now')}`
    }
    return (
      <section className={cx("py-5", s["callus-section"])}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col")}>
              <div className={cx(s["title"], "conduit")}>
                <Text defaultMessage="WANT TO KNOW MORE ABOUT THIS AIRCRAFT" id="client.callus.more.title" />
              </div>
            </div>
          </div>

          <div className={cx("row")}>
            <div className={cx("col")}>
              <div className={s["sub-title"]}>
                <Text
                  defaultMessage="Our team of private aviation advisors is here to help!"
                  id="client.callus.more.subtitle"
                />
              </div>
            </div>
          </div>

          <div className={cx("row")}>
            <div className={cx("col")}>
              <div className={s["form-wrapper"]}>
                <AirportContactButton settings={CallBtnSettings} />
                <span className={cx(s["separation-or"])}>OR</span>
                <AirportContactButton settings={MailBtnSettings} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withStyles(s)(CallUs);
