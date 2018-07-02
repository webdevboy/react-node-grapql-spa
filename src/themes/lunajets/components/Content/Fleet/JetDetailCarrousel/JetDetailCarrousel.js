import React, {Fragment} from "react";
import cx from "classnames";
import s from "./JetDetailCarrousel.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import DraftjsDecoder from "utils/DraftjsDecoder";
import CallToActionLink from "../../../Primitives/CallToActionLink";

class JetDetailCarrousel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const data = this.props.data ? this.props.data : null;
    const post = this.props.post;
    var jsonBody;
    const body = post && post.jet ? post.jet.body.main : {};
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    const aircraftName = data && data.name ? data && data.name : "";
    const manuName = data && data.manufacturer && data.manufacturer.name ? data.manufacturer.name : "";
    const fullName = manuName + " " + aircraftName;
    const cabinHeight = data && data.cabin_height ? data.cabin_height + " m" : "-";
    const manufacturerName =
      data && data.manufacturer && data.manufacturer.name ? data.manufacturer.name : "-";
    const speed = data && data.speed ? data.speed + " kts" : "-";
    const range = data && data.range ? data.range + " nmi" : "-";
    // console.log ("Manufacturer => ", data);
    const manufacturerCountry = "us";
    return (
      <Fragment>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <table className={cx("col-md-8")}>
              <tbody>
                <tr className={cx("row m-0")}>
                  {/* manufacturer */}
                  <td className={cx("col-6", s["jet-info"])}>
                    <span className={cx(s["jet-info-label"])}>
                      <Text defaultMessage="manufacturer: " id="client.jetPlane.manufacturer" />
                    </span>
                    <span className={cx(s["value"])}>
                      {manufacturerName} <div className={cx("famfamfam-flags", manufacturerCountry, s["flag"])} />
                    </span>
                  </td>

                  {/* height */}
                  <td className={cx("col-6", s["jet-info"])}>
                    <span className={cx(s["jet-info-label"])}>
                      <Text defaultMessage="height: " id="client.jetPlane.height" />
                    </span>
                    <span className={cx(s["value"])}>{cabinHeight}</span>
                  </td>

                  {/* speed */}
                  <td className={cx("col-6", s["jet-info"])}>
                    <span className={cx(s["jet-info-label"])}>
                      <Text defaultMessage="speed: " id="client.jetPlane.speed" />
                    </span>
                    <span className={cx(s["value"])}>{speed}</span>
                  </td>

                  {/* range */}
                  <td className={cx("col-6", s["jet-info"])}>
                    <span className={cx(s["jet-info-label"])}>
                      <Text defaultMessage="range: " id="client.jetPlane.range" />
                    </span>
                    <span className={cx(s["value"])}>{range}</span>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* button Book Now */}
            <div className={cx("col-md-4", s["btn-book-now"])}>
              <CallToActionLink contact={{field:"additionalNotes", value: fullName}} className={"btn lt-red"}>
                <Text defaultMessage="Book now" id="client.callToAction.bookNow" elementId={'book_now'}/>
              </CallToActionLink>
            </div>
          </div>

          <div className={cx("row mt-5")}>
            <div className={cx("col")}>
              <span className={"section-heading-paragraph"}>
                <DraftjsDecoder contentState={jsonBody} />
              </span>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(JetDetailCarrousel);
