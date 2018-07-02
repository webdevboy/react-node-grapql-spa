import React from "react";
import cx from "classnames";
import s from "./EventHelicopter.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../../Primitives/Text";
import SectionTitle from "../../../../Layout/SectionTitle";
import DraftjsDecoder from 'utils/DraftjsDecoder';
import FixedRationImage from "../../../../Primitives/FixedRatioImage";
import { image } from "mock";

class EventHelicopter extends React.Component {
  render() {
    const { data: { event } } = this.props;
    let jsonBody;
    const body = event.body.sub;
    if (body) {
      if (typeof body === "string") {
        jsonBody = body;
      } else {
        jsonBody = JSON.stringify(body);
      }
    }

    let displayImage;
    if (event.meta && event.meta.helicopter_image) {
      displayImage = event.meta.helicopter_image;
    } else {
      displayImage = image;
    }

    const V3 = ({ jsonBody }) => (
      <div className={s["event-helicopter"]}>
        <div className={cx("container")}>
          {/* title */}
          <div className={cx("row mb-4")}>
            <div className={cx("col")}>
              <h2 className="section-title lt-blue">
                <Text defaultMessage="Helicopter Transfer" id="title.helicopterTransfer" />
              </h2>
            </div>
          </div>
          {/* infos */}
          <div className={cx("row")}>
            <div className={cx("col-4", s["event-helicopter-photo"])}>
              <FixedRationImage image={displayImage} />
            </div>
            <div className={cx("col-8", s["event-helicopter-paragraph"])}>
              <DraftjsDecoder contentState={jsonBody} />
            </div>
          </div>
        </div>
      </div>);

    return (
      <div>
        { jsonBody ? <V3 jsonBody={jsonBody} /> : null}
      </div>
    );
  }
}

export default withStyles(s)(EventHelicopter);
