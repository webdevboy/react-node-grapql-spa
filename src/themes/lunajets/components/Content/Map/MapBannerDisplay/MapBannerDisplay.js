import React from "react";
import cx from "classnames";
import s from "./MapBannerDisplay.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import Map from "../../../Widgets/MapBox";
import PropTypes from "prop-types";
import _ from "lodash";
import ArrowRight from "react-feather/dist/icons/arrow-right";
import Loading from "react-loading-animation";

class MapBannerDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const listCity = this.props.data ? this.props.data : null;
    const title = this.props.title;

    console.log('===> ', listCity)

    return (
      <Loading isLoading={this.props.isFetching}>
        <div>
          <div className={cx(s["map-list"])}>
            <div className={cx("container")}>
              <div className={cx("row")}>
                {listCity
                  ? <div className={cx("col-sm-12 col-12", s["map-container"])}>
                      <Map maxZoom={10} zoom={2} type={"marker"} locations={listCity.map(city => ({ coordinates: city.coordinates }))} />
                    </div>
                  : null}
              </div>
            </div>
          </div>
        </div>
      </Loading>
    );
  }
}

export default withStyles(s)(MapBannerDisplay);
