import React from "react";
import { FormattedDate } from "react-intl";
import cx from "classnames";
import s from "./JetCostDescription.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import SectionTitle from "components/Layout/SectionTitle";
import Heading from "components/Layout/Heading";
import Button from "components/Primitives/Button";
import emptyLegs from "./gfx/jet_cost_empty_legs.png";
import reroutedEmptyLegs from "./gfx/jet_cost_rerouted_empty_legs.png";
import onDemandJet from "./gfx/jet_cost_on_demand_jet.png";

class JetCostDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <section className={s["how much-jet-cost"]}>
        <div className={cx("container my-5", s["jet-cost-description"])}>
          <div className="row">
            <div className="col">
              <SectionTitle textId="Private Jet Charter Cost to Geneva" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Heading textId="How much does a private jet charter cost ?" />
            </div>
          </div>

          <div className={cx("row")}>
            <div className={cx("col", s["paragraph"])}>
              <p>
                LunaJets guarantees a private jet charter at the best price, with no additional or hidden costs. We
                offer three different price schemes depending on the availability of a private jet for an itinerary and
                date of travel.
              </p>
            </div>
          </div>
        </div>

        <div className={cx("container-fluid")}>
          {/* save up section */}
          <div className="row row-eq-height">
            <div className={cx("col-md-4", s["save-up-column"])}>
              <div className={cx(s["save-up-column-wrap"])}>
                <div className={cx(s["circle-sign"])}>
                  <span>Save up to</span>
                  <span>75%</span>
                </div>
                <h3>Empty Legs</h3>
                <p>
                  An empty leg, or ferry flight, refers to a private jet flying "empty" after dropping off passengers,
                  or en route to pick up passengers. As the flight is already paid for, we offer significant discounts
                  on these flights. LunaJets can offer such prices when the empty leg of a private jet matches your
                  itinerary and timing exactly. This option is for one-way flights only.
                </p>
              </div>
            </div>

            <div className={cx("col-md-4", s["save-up-column"])}>
              <div className={cx(s["save-up-column-wrap"])}>
                <div className={cx(s["circle-sign"])}>
                  <span>Save up to</span>
                  <span>50%</span>
                </div>
                <h3>Rerouted Empty Legs</h3>
                <p>
                  If there are no empty leg flights for your exact itinerary and timing, LunaJets will search its
                  proprietorial database to reroute an empty leg. This would be a private jet that would make an
                  additional stop to pick you up at your departure airport, drop you off at your destination airport or
                  both. These stops incur an additional cost (landing fees, extra fuel) that LunaJets will negociate
                  with operators for the best possible deal. Although greater than an empty leg price, a rerouted empty
                  leg will always be much less expensive than a full fare on-demand private jet price.
                </p>
              </div>
            </div>

            <div className={cx("col-md-4", s["save-up-column"])}>
              <div className={cx(s["save-up-column-wrap"])}>
                <div className={cx(s["circle-sign"])}>
                  <span>Save up to</span>
                  <span>25%</span>
                </div>
                <h3>On demand private jet charter</h3>
                <p>
                  If there are no empty legs and no possibility of rerouting an empty leg, LunaJets can negociate with
                  its network of partner operators for the best on-demand charter price for your itinerary. You will be
                  offered a selection of aircraft at the best charter prices to choose from. No minimum fying time is
                  required and you just pay the fixed pre-agreed price for your flight. No upfront deposit. No long-term
                  contract. Private jet charter costs are fixed and include all necessary amenities.
                </p>
              </div>
            </div>

            <div className={cx("col-md-4", s["illustration"])}>
              <div className={cx(s["image"])}>
                <img src={emptyLegs} />
              </div>
              <div className={cx(s["price"])}>
                <span>Empty Leg</span>
                <span>Starting at ZZ,00€</span>
              </div>
              <div className={cx(s["action-button"])}>
                <Button className={cx("btn lt-red w-100")} textId="client.jetCost.bookAnEmptyLegs" />
              </div>
            </div>
            <div className={cx("col-md-4", s["illustration"])}>
              <div className={cx(s["image"])}>
                <img src={reroutedEmptyLegs} />
              </div>
              <div className={cx(s["price"])}>
                <span>Re-route empty leg</span>
                <span>Starting at XX,00€</span>
              </div>
              <div className={cx(s["action-button"])}>
                <Button className={cx("btn lt-red w-100")} textId="client.jetCost.contactOurTeam" />
              </div>
            </div>
            <div className={cx("col-md-4", s["illustration"])}>
              <div className={cx(s["image"])}>
                <img src={onDemandJet} />
              </div>
              <div className={cx(s["price"])}>
                <span>On demand charter</span>
                <span>Starting at YY,00€</span>
              </div>
              <div className={cx(s["action-button"])}>
                <Button className={cx("btn lt-red w-100")} textId="client.jetCost.charterAPrivateJet" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withStyles(s)(JetCostDescription);
