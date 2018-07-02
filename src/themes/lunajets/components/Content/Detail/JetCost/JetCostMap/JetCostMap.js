import React from "react";
import cx from "classnames";
import s from "./JetCostMap.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "themes/lunajets/components/Primitives/Text";
import SectionTitle from "themes/lunajets/components/Layout/SectionTitle";
import MapBox from "themes/lunajets/components/Widgets/MapBox";
import RichText from 'themes/lunajets/components/Primitives/RichText';

const ranges = {
  1: 1120,
  2: 2240,
  3: 3360,
  4: 4480,
  5: 5600,
  6: 6720,
  8: 8960,
  10: 11200
}

class JetCostMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [{ coordinates: "51.518250335096376,-0.13235092163085938" }],
      range: 1,
    };

    this.changeRange = this.changeRange.bind(this);
  }

  changeRange(range) {
    this.setState({
      range
    });
  }

  render() {
    const { range } = this.state;
    return (
      <section className={cx(s["map-section"])}>
        <div className={cx("container my-5")}>
          <div className={cx("row")}>
            <div className={cx("col")}>
              <h2>
                <Text
                  className={cx("text-secondary uppercase", s["section-title1"])}
                  id="Range Map"
                  defaultMessage="Range Map"
                />
              </h2>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col">
              <p>
                <Text defaultMessage={"LunaJets is innovating the private jet travel industry with a simple pricing model that is transparent, fixed and easy to understand. With so many different options, you're certain to find the price that works for you. We guarantee our customers will incur no hidden costs. Use the interactive map below to determine flight time between two destinations. Start by selecting the city from which you'd like to depart, choose a flight time and the map will display the cities you can reach."} id={"client.jet.cost.sub.content"} />              
              </p>
            </div>
          </div>
        </div>

        <div className={cx("container-fluid")}>
          <div className={cx("row")}>
            <div className={cx("col", s["map-container"])}>
              <MapBox type="range" locations={this.state.locations} range={ranges[range]} zoom={2} maxZoom={7} zoomControl={true} scrollZoom={false} />
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
                          <Text defaultMessage={"Flight Up to"} id={`jet-cost-map-flight-up-to`} />
                        </th>
                        <th className={cx({ [s.active]: range === 1 })} scope="col" onClick={() => this.changeRange(1)}>
                          <span>1</span>
                          <Text id="client.page-jet-cost.range-table.1hr" defaultMessage="HR" />
                        </th>
                        <th className={cx({ [s.active]: range === 2 })} scope="col" onClick={() => this.changeRange(2)}>
                          <span>2</span>
                          <Text id="client.page-jet-cost.range-table.2hr" defaultMessage="HR" /></th>
                        <th className={cx({ [s.active]: range === 3 })} scope="col" onClick={() => this.changeRange(3)}>
                          <span>3</span>
                          <Text id="client.page-jet-cost.range-table.3hr" defaultMessage="HR" />
                        </th>
                        <th className={cx({ [s.active]: range === 4 })} scope="col" onClick={() => this.changeRange(4)}>
                          <span>4</span>
                          <Text id="client.page-jet-cost.range-table.4hr" defaultMessage="HR" />
                        </th>
                        <th className={cx({ [s.active]: range === 5 })} scope="col" onClick={() => this.changeRange(5)}>
                          <span>5</span>
                          <Text id="client.page-jet-cost.range-table.5hr" defaultMessage="HR" />
                        </th>
                        <th className={cx({ [s.active]: range === 6 })} scope="col" onClick={() => this.changeRange(6)}>
                          <span>6</span>
                          <Text id="client.page-jet-cost.range-table.6hr" defaultMessage="HR" />
                        </th>
                        <th className={cx({ [s.active]: range === 8 })} scope="col" onClick={() => this.changeRange(8)}>
                          <span>8</span>
                          <Text id="client.page-jet-cost.range-table.8hr" defaultMessage="HR" />
                        </th>
                        <th className={cx({ [s.active]: range === 10 })} scope="col" onClick={() => this.changeRange(10)}>
                          <span>10</span>
                          <Text id="client.page-jet-cost.range-table.10hr" defaultMessage="HR" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          <div className={cx(s["price-label"])}><Text defaultMessage={"Price for cabin"} id={`jet-cost-map-price-for-cabin`} /></div>
                          <div className={cx(s["price-legend"])}><Text defaultMessage={"(Starting from)*"} id={`jet-cost-map-starting-from`} /></div>
                        </th>
                        <td className={cx({ [s.active]: range === 1 })} onClick={() => this.changeRange(1)}>2,000 €</td>
                        <td className={cx({ [s.active]: range === 2 })} onClick={() => this.changeRange(2)}>3,500 €</td>
                        <td className={cx({ [s.active]: range === 3 })} onClick={() => this.changeRange(3)}>6,000 €</td>
                        <td className={cx({ [s.active]: range === 4 })} onClick={() => this.changeRange(4)}>10,000 €</td>
                        <td className={cx({ [s.active]: range === 5 })} onClick={() => this.changeRange(5)}>15,000 €</td>
                        <td className={cx({ [s.active]: range === 6 })} onClick={() => this.changeRange(6)}>20,000 €</td>
                        <td className={cx({ [s.active]: range === 8 })} onClick={() => this.changeRange(8)}>30,000 €</td>
                        <td className={cx({ [s.active]: range === 10 })} onClick={() => this.changeRange(10)}>50,000 €</td>
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
            <p>
              <Text defaultMessage={"- Price are for the whole cabin / plane."} id={"jet-cost-map-todo-1"} />
              <br />
              <Text defaultMessage={"- Passenger (and luggage) capacity to be confirmed according to type of plane."} id={"jet-cost-map-todo-2"} />
              <br />
              <Text defaultMessage={`- For pricing purposes, the duration of the flight is calculated at an average speed of 400 knots/hour.
                Actual flight times may vary according to jet type and weather.`} id={"jet-cost-map-todo-3"} />
              <br />
              <br />
              <Text defaultMessage={"*Prices vary depending on availability and positionning of the aircraft in the airport of departure."} id={"jet-cost-map-todo-4"} />
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default withStyles(s)(JetCostMap);
