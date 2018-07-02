import React from "react";
import { FormattedDate } from "react-intl";
import cx from "classnames";
import s from "./EmptyLegsDestinationDescription.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";

class EmptyLegsDestinationDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { destination } = this.props;
    return (
      <div className={s["emptylegs-description"]}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col")}>
              <span className={`section-title lt-blue m-0`}>
                <Text defaultMessage={"empty legs to "} id="client.emptylegsdestination.title" />
                {destination}
              </span>
            </div>
          </div>

          {/* Paragraph */}
          <div className={cx("row")}>
            <div className={cx("col", s["paragraph-title"])}>
              <span>SAVE UP TO 75% ON</span>
              <br />
              <span>YOUR PRIVATE JET FLIGHT</span>
            </div>
          </div>

          <div className={cx("row")}>
            <div className={cx("col", s["paragraph"])}>
              <p className={cx("mb-0")}>
                An empty leg, also called a ferry flight or an empty leg, is a private jet flying without
                passengers.This happens when an aircraft drops off passengers at their destination and return home
                "empty", or when it flies empty to pick up passengers at another airport.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(EmptyLegsDestinationDescription);
