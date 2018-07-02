import React from "react";
import { FormattedDate } from "react-intl";
import cx from "classnames";
import s from "./JetCostDestinationDescription.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import SectionTitle from "components/Layout/SectionTitle";
import Heading from "components/Layout/Heading";

class JetCostDestinationDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className={cx("container my-5", s["jet-cost-destination-description"])}>
        <div className="row">
          <div className="col">
            <SectionTitle textId="Private Jet Charter Cost to Geneva" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Heading textId="How much does a private jet charter cost" />
          </div>
        </div>

        <div className={cx("row")}>
          <div className={cx("col", s["paragraph"])}>
            <p>
              Having access to more than 4,800 private jets, LunaJets offers private jet charters for your travel plans,
              worldwide. Private aviation meets all your flight needs whether on business or for leisure.
            </p>
            <p>
              Fly between Paris and Geneva on board a Dassault Falcon Jet by booking your private flight at the cheapest
              price with LunaJets. Thanks for private yet charter, reduce your flight time to and from Europe, Asia or
              the United States. Also, enjoy the confort of a private jet for you medium haul flights such as
              Geneva-Moscow.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(JetCostDestinationDescription);
