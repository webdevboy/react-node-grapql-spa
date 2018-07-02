import React from "react";
import cx from "classnames";
import s from "./MapEmptyLegDisplay.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import Map from "../../../Widgets/MapBox";
import PropTypes from "prop-types";
import _ from "lodash";
import ArrowRight from "react-feather/dist/icons/arrow-right";
import Loading from "react-loading-animation";

class MapEmptyLegDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  render() {
    const legs = this.props.data ? this.props.data : null;
    const title = this.props.title;

    return (
      <Loading isLoading={this.props.isFetching}>
        <div>
          <div className={cx(s["map-list"])}>
            <div className={cx("container")}>
              <div className={cx("row")}>
                {legs
                  ?
                  <div className={cx("col-sm-12 col-12", s["map-container"])}>
                    <Map type={"emptylegs"} legs={legs} />
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

export default withStyles(s)(MapEmptyLegDisplay);
