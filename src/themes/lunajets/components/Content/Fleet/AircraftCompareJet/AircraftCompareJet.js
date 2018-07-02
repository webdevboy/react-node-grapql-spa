import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";

import Text from "../../../Primitives/Text";
import TextHtml from "../../../Primitives/TextHtml";
import Video from "../../../Primitives/Video";
import Link from "../../../Primitives/Link";
import video from "./gfx/big_buck_bunny.mp4";
import s from "./AircraftCompareJet.scss";
import DraftjsDecoder from "utils/DraftjsDecoder";
import SectionTitle from "../../../Layout/SectionTitle";

class AircraftCompareJet extends React.Component {
  render() {
    let paragraph = this.props.summary !== "" ? this.props.summary : "";

    if (typeof paragraph === "string") {
      paragraph = paragraph;
    } else {
      paragraph = JSON.stringify(paragraph);
    }
    return (
      <div className={cx("container", s["compare-jets"])}>
        <div className="row">
          <div className="col">
            <SectionTitle textId="client.fleet.jetComparator.sectionTitle" defaultMessage="jet comparator" hx={true} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-12">
            <div className="row">
              <div className="col">
                <h1 className="uppercase text-white">
                  <Text strong={true} id="client.fleet.jetComparator.sectionSubtitle" defaultMessage="compare jets" />
                </h1>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <p className={cx("text-white", s["paragraph"])}>
                  <DraftjsDecoder contentState={paragraph} />
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-12">
            <div className={s.video}>
              <Video border source={video} id="comparator_video" />
            </div>
          </div>
          <div className="col-sm-6 col-12 mt-3">
            <Link
              className={cx("btn btn-outline-light w-100")}
              text="Go To The Jet Comparator"
              id="client.fleet.jet-comparator"
              to="/jet-comparator"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AircraftCompareJet);
