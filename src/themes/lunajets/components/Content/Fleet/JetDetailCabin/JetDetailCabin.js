import React, {Fragment} from "react";
import cx from "classnames";
import s from "./JetDetailCabin.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import BluePrint from "./gfx/airplane-length.svg";
import Sitting from "./gfx/sitting-symbol.svg";
import Suitcase from "./gfx/suitcase.svg";
import Luggage from "./gfx/luggage.svg";
import Cabin from "./gfx/cabinSize.svg";
import Switch from "../../../Primitives/Switch";
import FormattedUnits from "../../../i18n/FormattedUnits";
import Text from "../../../Primitives/Text";
import SectionTitle from "../../../Layout/SectionTitle";

class JetDetailCabin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: "metric",
    };
  }

  render() {
    const { unit } = this.state;
    const data = this.props.data ? this.props.data : null;
    const cabinLength = data && data.cabin_length ? data.cabin_length : "-";
    const cabinHeight = data && data.cabin_height ? data.cabin_height : "-";
    const cabinWidth = data && data.cabin_width ? data.cabin_width : "-";
    const meta = this.props.meta ? this.props.meta : null;
    const cabinViewImage = meta && meta.cabin_view_image ? meta.cabin_view_image.src : Cabin;
    const floorMapImage = meta && meta.floor_map_image ? meta.floor_map_image.src : BluePrint;

    return (
      <Fragment>
        <section className={cx(s["cabin-specifications"])}>
          <div className={cx("container")}>
            <div className={cx("row")}>
              <div className={cx("col mb-5")}>
                <SectionTitle textId="client.jetDetails.cabinSpecification.sectionTitle" defaultMessage="Cabin Specifications" hx={true} />
              </div>
            </div>

            <div className={cx("row")}>
              {/* cabin length */}
              <div className={cx("col-md-5")}>
                <div className={cx("row mb-3")}>
                  {/* length image */}
                  <div className={cx("col")}>
                    {/* <object className={cx(s["svg-blueprint"])} data={floorMapImage} type="image/svg+xml" /> */}
                    <img className={cx(s["img-blueprint"])} src={floorMapImage} />
                  </div>

                  {/* cabin info */}
                  <div className={cx("col", s["cabin-info-wrapper"])}>
                    <div className={cx("row")}>
                      <div className={cx("col")}>
                        <div className={cx(s["cabin-info"])}>
                          <div className={cx(s["cabin-icon"])}>
                            <object className={s["svg-sitting"]} data={Sitting} type="image/svg+xml" />
                          </div>

                          <div className={cx(s["cabin-value"])}>
                            <div className={cx(s["value"])}>{data && data.seats ? data.seats : "-"}</div>
                            <div className={cx(s["cabin-property"])}>
                              <Text defaultMessage="Seats" id="client.jetPlane.seats" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={cx("row")}>
                      <div className={cx("col")}>
                        <div className={cx(s["cabin-info"])}>
                          <div className={cx(s["cabin-icon"])}>
                            <object className={s["svg-suitcase"]} data={Suitcase} type="image/svg+xml" />
                          </div>

                          <div className={cx(s["cabin-value"])}>
                            <div className={cx(s["value"])}>
                              {data && data.luggage_small ? data.luggage_small : "-"}
                            </div>
                            <div className={cx(s["cabin-property"])}>
                              <Text defaultMessage="Suitcase" id="client.jetPlane.suitcase" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={cx("row")}>
                      <div className={cx("col")}>
                        <div className={cx(s["cabin-info"])}>
                          <div className={cx(s["cabin-icon"])}>
                            <object className={s["svg-luggage"]} data={Luggage} type="image/svg+xml" />
                          </div>

                          <div className={cx(s["cabin-value"])}>
                            <div className={cx(s["value"])}>
                              {data && data.luggage_standard ? data.luggage_standard : "-"}
                            </div>
                            <div className={cx(s["cabin-property"])}>
                              <Text defaultMessage="Carry-on" id="client.jetPlane.carryOn" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* length */}
                <div className={cx("row")}>
                  <div className={cx("col")}>
                    <span className={cx(s["property"])}>
                      <Text defaultMessage="length" id="client.jetPlane.length" />
                    </span>
                    <span className={cx(s["value"])}>
                      <FormattedUnits unit={unit} value={cabinLength} />
                    </span>
                    <div className={cx(s["property"], s["legend"])}>
                      <Text defaultMessage="Standard cabin layout" id="client.jetPlane.standardLayout" />
                    </div>
                  </div>
                </div>
              </div>

              {/* cabin height width */}
              <div className={cx("col-md-7")}>
                <div className={cx("row mb-3 mt-5 mt-md-0")}>
                  <div className={cx("col", s["cabin-col"])}>
                    <object className={cx(s["svg-cabin"])} data={cabinViewImage} type="image/svg+xml" />
                  </div>
                </div>

                {/* height and width */}
                <div className={cx("row")}>
                  <div className={cx("col")}>
                    <span className={cx(s["property"])}>
                      <Text defaultMessage="height" id="client.jetPlane.height" />
                    </span>
                    <span className={cx(s["value"])}>
                      <FormattedUnits unit={unit} value={cabinHeight} />
                    </span>
                  </div>
                  <div className={cx("col text-right")}>
                    <span className={cx(s["property"])}>
                      <Text defaultMessage="width" id="client.jetPlane.width" />
                    </span>
                    <span className={cx(s["value"])}>
                      <FormattedUnits unit={unit} value={cabinWidth} />
                    </span>
                  </div>
                </div>

                {/* unit switch */}
                <div className={cx("row")}>
                  <div className={cx("col", s["unit-switch"])}>
                    <span className={cx(s["property"], unit == "metric" ? "lt-blue" : "white")}>
                      <Text defaultMessage="metric" id="client.units.metric" />
                    </span>

                    <Switch
                      version={2}
                      onChange={(ev, bool) => {
                        this.setState({ unit: bool ? "imperial" : "metric" });
                      }}
                    />

                    <span className={cx(s["property"], unit == "imperial" ? "lt-blue" : "white")}>
                      <Text defaultMessage="imperial" id="client.units.imperial" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default withStyles(s)(JetDetailCabin);
