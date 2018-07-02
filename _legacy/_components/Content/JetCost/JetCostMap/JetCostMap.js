import React from "react";
import cx from "classnames";
import s from "./JetCostMap.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "components/Primitives/Text";
import SectionTitle from "components/Layout/SectionTitle";
import MapBox from "components/Widgets/MapBox";

class JetCostMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [{ coordinates: "51.518250335096376,-0.13235092163085938" }],
      range: 100,
    };
  }

  render() {
    return (
      <section className={cx(s["map-section"])}>
        <div className={cx("container my-5")}>
          <div className={cx("row")}>
            <div className={cx("col")}>
              <SectionTitle textId="Range Map" />
            </div>
          </div>

          <div className="row mt-5">
            <div className="col">
              <p>
                LunaJets is innovating the private jet travel industry with a simple pricing model that is transparent,
                fixed and easy to understand. With so many different options, you're certain to find the price that
                works for you. We guarantee our customers will incur no hidden costs. Use the interactive map below to
                determine flight time between two destinations. Start by selecting the city from which you'd like to
                depart, choose a flight time and the map will display the cities you can reach.
              </p>
            </div>
          </div>
        </div>

        <div className={cx("container-fluid")}>
          <div className={cx("row")}>
            <div className={cx("col", s["map-container"])}>
              <MapBox type="range" locations={this.state.locations} range={this.state.range} />
            </div>
          </div>

          <div className={cx("container", s["price-table"])}>
            <div className="row">
              <div className="col">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className={cx("text-left")}>
                          Flight Up to
                        </th>
                        <th scope="col">1 HR</th>
                        <th scope="col">2 HR</th>
                        <th scope="col">3 HR</th>
                        <th scope="col">4 HR</th>
                        <th scope="col">5 HR</th>
                        <th scope="col">6 HR</th>
                        <th scope="col">8 HR</th>
                        <th scope="col">10 HR</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          <div className={cx(s["price-label"])}>Price for cabin</div>
                          <div className={cx(s["price-legend"])}>(Starting from)*</div>
                        </th>
                        <td>2,000 €</td>
                        <td>3,500 €</td>
                        <td>6,000 €</td>
                        <td>10,000 €</td>
                        <td>15,000 €</td>
                        <td>20,000 €</td>
                        <td>30,000 €</td>
                        <td>50,000 €</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cx("container mb-5")}>
          <div className="row">
            <div className="col">
              <p>
                {/* TODO: Reformated and removed br */}
                - Price are for the whole cabin / plane.<br />
                - Passenger (and luggage) capacity to be confirmed according to type of plane.<br />
                - For pricing purposes, the duration of the flight is calculated at an average speed of 400 knots/hour.
                Actual flight times may vary according to jet type and weather.<br />
                <br />
                *Prices vary depending on availability and positionning of the aircraft in the airport of departure.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withStyles(s)(JetCostMap);
