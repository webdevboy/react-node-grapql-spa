import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import s from "./AirportGrid.scss";
import MapBox from "../../../../Widgets/MapBox";
import AirportCard from "../AirportCard";

class AirportGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { airports } = this.props;

    return (
      <div className={s["section-grid"]}>
        <div className={cx("container")}>
          {airports.map((airport, i) => (
            <div className={cx('row')} key={`${airport.name}-${i}`}>
              <div className={i % 2 == 0 ? cx(`col-sm-6 col-12 order-${i + 2} order-sm-${i + 1}  p-0`) : cx(`col-sm-6 col-12 order-${i + 2} order-sm-${i + 2} p-0`)}>
                <div className={s["grid"]}>
                  <AirportCard airport={airport} />
                </div>
              </div>
              <div className={i % 2 == 0 ? cx(`col-sm-6 col-12 order-${i + 1} order-sm-${i + 2}  p-0`) : cx(`col-sm-6 col-12 order-${i + 1} order-sm-${i + 1} p-0`)}>
                <div className={s["grid"]}>
                  <MapBox type="marker" locations={[{ coordinates: airport.coordinates }]} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default (withStyles(s)(AirportGrid));
