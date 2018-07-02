import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./AircraftComparatorModel.scss";
import * as _ from "lodash";
import FixedRatioContainer from "../../../Primitives/FixedRatioContainer";
import FixedRatioImage from "../../../Primitives/FixedRatioImage";
import Text from "../../../Primitives/Text";

class AircraftComparatorModel extends React.Component {
  render() {
    const { aircraft, changeOption, comparedAircrafts, index } = this.props;

    return (
      <div className={cx(s["jet-selection"])} id="jet_selection">
        {/* desktop */}
        <div className={cx("d-md-block d-none")}>
          {/* photo */}
          <FixedRatioImage className={cx(s["jet-photo"])} alt={'Compare the ' + aircraft.title} title={'Compare the ' + aircraft.title} image={aircraft.media} ratio={0.6} />
          {/* infos with checkbox */}
          <div className={cx(s["jet-name"])}>
            <div className={cx(s["title"])}><strong>{aircraft.title}</strong></div>
            {/* checkbox */}
            <div className={cx(s.checkbox)}>
              <label htmlFor={"compare_" + aircraft.id} className="text-secondary">
                <span>Compare</span>                
                <input
                  type="checkbox"
                  id={"compare_" + aircraft.id}
                  name={"compare_" + aircraft.id}
                  className="checkbox"
                  checked={
                    _.findIndex(comparedAircrafts, c => {
                      return c.id === aircraft.id;
                    }) > -1
                  }
                  disabled={
                    _.findIndex(comparedAircrafts, c => {
                      return c.id === aircraft.id;
                    }) < 0 && comparedAircrafts.length > 1
                  }
                  onTouchEnd={e => this.props.changeOption({ value: aircraft, checked: e.target.checked })}
                  onChange={e => this.props.changeOption({ value: aircraft, checked: e.target.checked })}
                />
                <span className={s.fakebox} />
              </label>
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className={cx("d-md-none")}>
          <div className="row no-gutters">
            <div className={cx("col-6 pr-1")}>
              <FixedRatioImage className={cx(s["jet-photo"])} alt={'Compare the ' + aircraft.title} title={'Compare the ' + aircraft.title} image={aircraft.media} ratio={0.5} />
            </div>

            <div className={cx("col-6 pl-1")}>
              <div className={cx(s["jet-name"])}>
                <div className={cx(s["title"])}><strong>{aircraft.title}</strong></div>
                {/* checkbox */}
                <div className={cx(s.checkbox)}>
                  <label htmlFor={"compare_" + aircraft.id} className="text-secondary">
                    <span>Compare</span>                    
                    <input
                      type="checkbox"
                      id={"compare_" + aircraft.id}
                      name={"compare_" + aircraft.id}
                      className="checkbox"
                      checked={
                        _.findIndex(comparedAircrafts, c => {
                          return c.id === aircraft.id;
                        }) > -1
                      }
                      disabled={
                        _.findIndex(comparedAircrafts, c => {
                          return c.id === aircraft.id;
                        }) < 0 && comparedAircrafts.length > 1
                      }
                      onTouchEnd={e => this.props.changeOption({ value: aircraft, checked: e.target.checked })}
                      onChange={e => this.props.changeOption({ value: aircraft, checked: e.target.checked })}
                    />
                    <span className={s.fakebox} />
                  </label>
                </div>                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AircraftComparatorModel);
