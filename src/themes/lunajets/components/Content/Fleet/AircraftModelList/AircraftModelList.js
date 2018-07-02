import React from "react";
import PropTypes from "prop-types";
import AircraftModel from "../AircraftModel";
import AircraftComparatorModel from "../AircraftComparatorModel";
import Button from "../../../Primitives/Button";
import Link from "../../../Primitives/Link";
import LoadingSpinner from "../../../Widgets/LoadingSpinner";
import cx from "classnames";
import * as _ from "lodash";
import Text from "../../../Primitives/Text";

class AircraftModelList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      listNum: this.props.initialNum,
    };

    this.loadMore = this.loadMore.bind(this);
  }

  loadMore = () => {
    this.setState({
      listNum: this.state.listNum + this.props.initialNum,
    });
  };

  isThereMoreToLoad = () => {
    return this.state.listNum < this.props.aircrafts.length;
  };

  render() {
    const {
      aircrafts,
      showMoreButton,
      showMoreTextDefault,
      showMoreTextId,
      cardStyle,
      changeOption,
      comparedAircrafts,
    } = this.props;

    let comparedIds = [];
    let filteredAircrafts = [];

    if (cardStyle !== "fleet") {
      comparedIds = comparedAircrafts.map(c => {
        return c.id;
      });
      filteredAircrafts = _.filter(aircrafts, a => {
        return comparedIds.indexOf(a.id) < 0;
      });
      filteredAircrafts = comparedAircrafts.concat(filteredAircrafts);
    }

    let btnLoadMore = null;
    if (this.state.loading) {
      btnLoadMore = <LoadingSpinner className={cx("spinner")} />;
    } else if (this.isThereMoreToLoad()) {
      btnLoadMore = (
        <Link
          className={cx("btn btn-outline dk-blue w-100 btn-load-more my-0")}
          text={showMoreTextDefault}
          onClick={this.loadMore}
          id={showMoreTextId}
        />
      );
    }

    return (
      <div className={cx("container mb-5")}>
        <div className="row my-5">
          {cardStyle == "fleet"
            ? aircrafts.map((aircraft, index) => {
                if (index < this.state.listNum) {
                  return (
                    <div className="col-sm-4 mb-4">
                      <AircraftModel
                        aircraft={aircraft}
                        comparedAircrafts={comparedAircrafts}
                        changeOption={val => this.props.changeOption(val)}
                      />
                    </div>
                  );
                }
              })
            : aircrafts.map((aircraft, index) => {
                if (index < this.state.listNum) {
                  return (
                    <div className="col-sm-4">
                      <AircraftComparatorModel
                        aircraft={aircraft}
                        comparedAircrafts={comparedAircrafts}
                        changeOption={val => this.props.changeOption(val)}
                      />
                    </div>
                  );
                }
              })}
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-4">{btnLoadMore}</div>
        </div>
      </div>
    );
  }
}

AircraftModelList.PropTypes = {
  initialNum: PropTypes.number,
  showMoreButton: PropTypes.bool,
  showMoreTextDefault: PropTypes.string,
  showMoreTextId: PropTypes.string,
  cardStyle: PropTypes.string,
};

AircraftModelList.defaultProps = {
  initialNum: 9,
  showMoreButton: true,
  showMoreTextDefault: "View jet fleet",
  showMoreTextId: "",
  cardStyle: "air",
};

export default AircraftModelList;
