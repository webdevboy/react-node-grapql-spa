import React from "react";
import cx from "classnames";
import s from "./JetDetailMap.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import SectionTitle from "../../../Layout/SectionTitle";
import MapBox from "../../../Widgets/MapBox";
import Heading from "../../../Layout/Heading";
import Loading from "react-loading-animation";

class JetDetailMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [{ coordinates: "51.518250335096376,-0.13235092163085938" }],
      range: 80,
    };
  }

  render() {
    const data = this.props.data ? this.props.data : null;
    const jetRange = data && data.range ? data.range : this.state.range;
    const { comparedAircrafts } = this.props;
    let ranges = (comparedAircrafts &&
      comparedAircrafts.map(a => {
        return a.details && a.details.w_range_nm__c ? a.details.w_range_nm__c : 80;
      })) || [jetRange];

    return (
      <Loading isLoading={this.props.isFetching}>
        <section className={cx(s["map-section"])}>
          <div className={cx("container my-5")}>
            <div className={cx("row")}>
              <div className={cx("col")}>
                <SectionTitle textId="client.jetComparator.rangeMap.sectionTitle" defaultMessage="Range Map" />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Heading text={data ? data.name : ""} />
              </div>
            </div>
          </div>

          <div className={cx("container-fluid")}>
            <div className={cx("row")}>
              <div className={cx("col", s["map-container"])}>
                <MapBox
                  type="range"
                  zoomControl={true}
                  scrollZoom={false}
                  locations={this.state.locations}
                  ranges={ranges.sort()}
                  range={jetRange}
                  mapboxType="jet compare"
                />
              </div>
            </div>
          </div>
        </section>
      </Loading>
    );
  }
}

export default withStyles(s)(JetDetailMap);
