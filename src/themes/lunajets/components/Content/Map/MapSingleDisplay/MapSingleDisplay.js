import React from "react";
import cx from "classnames";
import s from "./MapSingleDisplay.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import Map from "../../../Widgets/MapBox";
import PropTypes from "prop-types";
import _ from "lodash";
import ArrowRight from "react-feather/dist/icons/arrow-right";
import Loading from "react-loading-animation";

class MapSingleDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const listCity = this.props.data ? this.props.data : null;
    const title = this.props.title;

    return (
      <Loading isLoading={this.props.isFetching}>
        <div>
          <div className={cx(s["map-list"])}>
            <div className={cx("container")}>
              <div className={cx("row")}>
                {listCity
                  ? listCity.slice(0, 1).map(city => {
                      return (
                        <div className={cx("col-sm-12 col-12", s["map-container"])}>
                          <Map maxZoom={10}  zoom={10} type={"marker"} locations={[{ coordinates: city.coordinates }]} />
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </Loading>
    );
  }
}

export default withStyles(s)(MapSingleDisplay);
