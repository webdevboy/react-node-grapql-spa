import React from "react";
import { FormattedDate } from "react-intl";
import cx from "classnames";
import s from "./AirportContact.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import AirportContactButton from "../AirportContactButton";
import Text from "../../../../Primitives/Text";
import Link from "../../../../Primitives/Link";
import DraftjsDecoder from 'utils/DraftjsDecoder';

class AirportContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const {
    } = this.props;

    const CallBtnSettings = {
      Text : "Call us",
      icon : "phone",
      id: "airport-details-call-us-btn",
      href: "tel:+41844041844"
    };
    
    const MailBtnSettings = {
      Text: "Email us",
      icon: "mail",
      id: "airport-details-email-us-btn",
      href: `mailto:lunajets@lunajets.com?subject=${encodeURI('Fly Now')}`
    }

    return (
      <div className={cx("py-5 px-5", s["container-fluid"])}>
        <p>
          <Text className={"uppercase"} defaultMessage={"Didn't find the flight you need?"} id={`airport-contact-flight-need`} />
        </p>
        <p>
          <Text className={"uppercase"} defaultMessage={"Contact us now and we will find you the best flight option!"} id={`airport-contact-flight-option`} />
        </p>
        <div className={cx("py-4", s["contact-button-area"])}>
          <AirportContactButton settings={CallBtnSettings} />
          <span className={cx(s["between-text"])}>
            <Text className={"px-4 uppercase"} defaultMessage={"or"} id={`airport-contact-button-between-text`} />
          </span>
          <AirportContactButton settings={MailBtnSettings} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AirportContact);
