import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import SectionTitle from "../../../Layout/SectionTitle";
import s from "./AircraftComparison.scss";
import FixedRatioContainer from "../../../Primitives/FixedRatioContainer";
import FixedRatioImage from "../../../Primitives/FixedRatioImage";
import Button from "../../../Primitives/Button";
import Switch from "../../../Primitives/Switch";
import Text from "../../../Primitives/Text";
import * as _ from "lodash";
import history from "core/history";

class AircraftComparison extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      unit: "imperial",
    };
  }

  removeAircraft = index => {
    this.props.removeAircraft(this.props.aircrafts[index].id);
  };

  goLink(url) {
    history.push(url);
  }

  getValuePerUnit(val) {
    if (val) {
      return this.state.unit === 'imperial' ? val.toFixed(2) + ' ft' : (val * 0.3048).toFixed(2) + ' m';
    } else {
      return 'm';
    }
  }

  render() {
    const { aircrafts, cardStyle, changeOption, langCode, categories, manufacturers } = this.props;
    return (
      <div className={cx("container pt-5", s["compare-table"])}>
        <div className={cx("row")}>
          <div className={cx("col-12 col-sm-8")}>
            <SectionTitle
              textId="client.page.jetComparator.jetComparison.sectionTitle"
              defaultMessage="Aircraft comparison"
            />
          </div>
          <div className={cx("col-12 col-sm-4", s["unit-switch"])}>
            <span className={cx(s["property"], this.state.unit !== "imperial" ? "lt-blue" : "white")}>
              <Text defaultMessage="IMPERIAL" id="client.units.imperial" />
            </span>

            <Switch
              version={2}
              onChange={(ev, bool) => {
                this.setState({ unit: bool ? "metric" : "imperial" });
              }}
            />

            <span className={cx(s["property"], this.state.unit !== "metric" ? "lt-blue" : "white")}>
              <Text defaultMessage="METRIC" id="client.units.metric" />
            </span>
          </div>
          <div className={cx("col mb-5")}>
            <table className={cx("table mt-5")}>
              <tbody>
                <tr>
                  <td>
                    <span className={cx(s["btn-close"])} onClick={e => this.removeAircraft(0)}>
                      &times;
                    </span>
                    <FixedRatioImage image={aircrafts[0].media} ratio={0.6} />
                  </td>
                  <td />
                  <td>
                    <span className={cx(s["btn-close"])} onClick={e => this.removeAircraft(0)}>
                      &times;
                    </span>
                    <FixedRatioImage image={aircrafts[0].media} ratio={0.6} />
                  </td>
                  <td>
                    <span className={cx(s["btn-close-second"])} onClick={e => this.removeAircraft(1)}>
                      &times;
                    </span>
                    <FixedRatioImage image={aircrafts[1].media} ratio={0.6} />
                  </td>
                </tr>
                <tr>
                  {/* for mobile */}
                  <td className={s["aircraft-title"]}>
                    <span>{aircrafts[0].title}</span>
                  </td>
                  <td />

                  {/* desktop */}
                  <td className={s["aircraft-title"]}>
                    <span>{aircrafts[0].title}</span>
                  </td>
                  <td className={s["aircraft-title"]}>
                    <span>{aircrafts[1].title}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>
                      {_.find(categories, c => {
                        return c.sfid === aircrafts[0].meta.category;
                      }) &&
                        _.find(categories, c => {
                          return c.sfid === aircrafts[0].meta.category;
                        }).name}
                    </span>
                  </td>
                  <td>
                    <Text id="client.content.fleet.aircraftComparison.category" defaultMessage="CATEGORY" />
                  </td>
                  <td>
                    <span>
                      {_.find(categories, c => {
                        return c.sfid === aircrafts[0].meta.category;
                      }) &&
                        _.find(categories, c => {
                          return c.sfid === aircrafts[0].meta.category;
                        }).name}
                    </span>
                  </td>
                  <td>
                    <span>
                      {_.find(categories, c => {
                        return c.sfid === aircrafts[1].meta.category;
                      }) &&
                        _.find(categories, c => {
                          return c.sfid === aircrafts[1].meta.category;
                        }).name}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>
                      {_.find(manufacturers, m => {
                        return m.sfid === aircrafts[0].meta.manufacturer;
                      }) &&
                        _.find(manufacturers, m => {
                          return m.sfid === aircrafts[0].meta.manufacturer;
                        }).name}
                    </span>
                  </td>
                  <td>
                    <Text id="client.content.fleet.aircraftComparison.category" defaultMessage="MANUFACTURER" />
                  </td>
                  <td>
                    <span>
                      {_.find(manufacturers, m => {
                        return m.sfid === aircrafts[0].meta.manufacturer;
                      }) &&
                        _.find(manufacturers, m => {
                          return m.sfid === aircrafts[0].meta.manufacturer;
                        }).name}
                    </span>
                  </td>
                  <td>
                    <span>
                      {_.find(manufacturers, m => {
                        return m.sfid === aircrafts[1].meta.manufacturer;
                      }) &&
                        _.find(manufacturers, m => {
                          return m.sfid === aircrafts[1].meta.manufacturer;
                        }).name}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>{aircrafts[0].details && aircrafts[0].details.w_speed__c && aircrafts[0].details.w_speed__c.toFixed(2)} kts</span>
                  </td>
                  <td>
                    <Text id="client.content.fleet.aircraftComparison.category" defaultMessage="SPEED" />
                  </td>
                  <td>
                    <span>{aircrafts[0].details && aircrafts[0].details.w_speed__c && aircrafts[0].details.w_speed__c.toFixed(2)} kts</span>
                  </td>
                  <td>
                    <span>{aircrafts[1].details && aircrafts[1].details.w_speed__c && aircrafts[1].details.w_speed__c.toFixed(2)} kts</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>{aircrafts[0].details && aircrafts[0].details.w_range_nm__c} nm</span>
                  </td>
                  <td>
                    <Text id="client.content.fleet.aircraftComparison.category" defaultMessage="RANGE" />
                  </td>
                  <td>
                    <span>{aircrafts[0].details && aircrafts[0].details.w_range_nm__c} nm</span>
                  </td>
                  <td>
                    <span>{aircrafts[1].details && aircrafts[1].details.w_range_nm__c} nm</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>{this.getValuePerUnit(aircrafts[0].details && aircrafts[0].details.w_cabin_height__c)}</span>
                  </td>
                  <td>
                    <Text id="client.content.fleet.aircraftComparison.category" defaultMessage="HEIGHT" />
                  </td>
                  <td>
                    <span>{this.getValuePerUnit(aircrafts[0].details && aircrafts[0].details.w_cabin_height__c)}</span>
                  </td>
                  <td>
                    <span>{this.getValuePerUnit(aircrafts[1].details && aircrafts[1].details.w_cabin_height__c)}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>{this.getValuePerUnit(aircrafts[0].details && aircrafts[0].details.w_cabin_width__c)}</span>
                  </td>
                  <td>
                    <Text id="client.content.fleet.aircraftComparison.category" defaultMessage="WIDTH" />
                  </td>
                  <td>
                    <span>{this.getValuePerUnit(aircrafts[0].details && aircrafts[0].details.w_cabin_width__c)}</span>
                  </td>
                  <td>
                    <span>{this.getValuePerUnit(aircrafts[1].details && aircrafts[1].details.w_cabin_width__c)}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>{this.getValuePerUnit(aircrafts[0].details && aircrafts[0].details.w_cabin_length__c)}</span>
                  </td>
                  <td>
                    <Text id="client.content.fleet.aircraftComparison.category" defaultMessage="LENGTH" />
                  </td>
                  <td>
                    <span>{this.getValuePerUnit(aircrafts[0].details && aircrafts[0].details.w_cabin_length__c)}</span>
                  </td>
                  <td>
                    <span>{this.getValuePerUnit(aircrafts[1].details && aircrafts[1].details.w_cabin_length__c)}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>{aircrafts[0].details && aircrafts[0].details.normal_passenger_seats__c}</span>
                  </td>
                  <td>
                    <Text id="client.content.fleet.aircraftComparison.category" defaultMessage="SEATS" />
                  </td>
                  <td>
                    <span>{aircrafts[0].details && aircrafts[0].details.normal_passenger_seats__c}</span>
                  </td>
                  <td>
                    <span>{aircrafts[1].details && aircrafts[1].details.normal_passenger_seats__c}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>{aircrafts[0].details && aircrafts[0].details.w_luggage_cap_m3__c && aircrafts[0].details.w_luggage_cap_m3__c.toFixed(2)} m<sup>3</sup></span>
                  </td>
                  <td>
                    <Text id="client.content.fleet.aircraftComparison.category" defaultMessage="LUGAGGE" />
                  </td>
                  <td>
                    <span>{aircrafts[0].details && aircrafts[0].details.w_luggage_cap_m3__c && aircrafts[0].details.w_luggage_cap_m3__c.toFixed(2)} m<sup>3</sup></span>
                  </td>
                  <td>
                    <span>{aircrafts[1].details && aircrafts[1].details.w_luggage_cap_m3__c && aircrafts[1].details.w_luggage_cap_m3__c.toFixed(2)} m<sup>3</sup></span>
                  </td>
                </tr>
                <tr>
                  <td>
                    {aircrafts[0].details && aircrafts[0].details[`w_url_${langCode}__c`] ? (
                      <Button
                        className={cx("btn-outline dk-blue btn-load-more my-0")}
                        textId="aircraft-comparison-more-details1"
                        defaultMessage="more details"
                        onClick={() => this.goLink(aircrafts[0].details[`w_url_${langCode}__c`])}
                      />
                    ) : null}
                  </td>
                  <td />
                  <td>
                    {aircrafts[0].details && aircrafts[0].details[`w_url_${langCode}__c`] ? (
                      <Button
                        className={cx("btn-outline dk-blue btn-load-more my-0")}
                        textId="aircraft-comparison-more-details1"
                        defaultMessage="more details"
                        onClick={() => this.goLink(aircrafts[0].details[`w_url_${langCode}__c`])}
                      />
                    ) : null}
                  </td>
                  <td>
                    {aircrafts[1].details && aircrafts[1].details[`w_url_${langCode}__c`] ? (
                      <Button
                        className={cx("btn-outline dk-blue btn-load-more my-0")}
                        textId="aircraft-comparison-more-details2"
                        defaultMessage="more details"
                        onClick={() => this.goLink(aircrafts[1].details[`w_url_${langCode}__c`])}
                      />
                    ) : null}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AircraftComparison);
