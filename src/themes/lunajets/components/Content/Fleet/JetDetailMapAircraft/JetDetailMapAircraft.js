import React,{Fragment} from "react";
import cx from "classnames";
import s from "./JetDetailMapAircraft.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import SectionTitle from "../../../Layout/SectionTitle";
import MapBox from "../../../Widgets/MapBox";
import Heading from "../../../Layout/Heading";
import Loading from "react-loading-animation";

class JetDetailMapAircraft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [{ coordinates: "46.23416667,6.1094444" }],
      range: 80,
    };
  }

  render() {
    const data = this.props.data ? this.props.data : null;
    const jetRange = data && data.range ? data.range : this.state.range;
    const ranges = [jetRange];

    return (
      <Fragment>
        <section className={cx(s["map-section"])}>
          <div className={cx("container my-5")}>
            <div className={cx("row")}>
              <div className={cx("col")}>
                <SectionTitle textId="client.jetDetails.rangeMap.sectionTitle" defaultMessage="Range Map" hx={true} />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Heading text={data ? data.name : ""} hx={false} strong={true}/>                
              </div>
            </div>
          </div>

          <div className={cx("container-fluid")}>
            <div className={cx("row")}>
              <div className={cx("col", s["map-container"])}>
                <MapBox
                  maxZoom={2}
                  type="range"
                  locations={this.state.locations}
                  ranges={ranges.sort()}
                  range={jetRange}
                  mapboxType="jet compare"
                  zoomControl
                  scaleControl
                  scrollZoom={false}
                />
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default withStyles(s)(JetDetailMapAircraft);
