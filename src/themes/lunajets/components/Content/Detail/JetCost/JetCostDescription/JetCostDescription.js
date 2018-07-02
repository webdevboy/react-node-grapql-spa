import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import DraftjsDecoder from "utils/DraftjsDecoder";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import SectionTitle from "themes/lunajets/components/Layout/SectionTitle";
import Text from "themes/lunajets/components/Primitives/Text";
import Link from "themes/lunajets/components/Primitives/Link";
import emptyLegs from "./gfx/jet_cost_empty_legs.png";
import reroutedEmptyLegs from "./gfx/jet_cost_rerouted_empty_legs.png";
import onDemandJet from "./gfx/jet_cost_on_demand_jet.png";
import circle from "./gfx/circle.svg";
import s from "./JetCostDescription.scss";

class JetCostDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { city, title, description, showSaveColumns } = this.props;
    let desc_msg = [];
    
    let jsonBody;
    const body = description;
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    return (
      <section className={s["how much-jet-cost"]}>
        <div className={cx("container my-5", s["jet-cost-description"])}>
          <div className="row">
            <div className="col">
              <SectionTitle suffixMessage={city} defaultMessage= "Private Jet Charter Cost To " textId="client.jetCostDestination.sectionTitle" noHeader/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h1 className={cx("uppercase", s["heading"])}>
                {title}
              </h1>
            </div>
          </div>

          <div className={cx("row")}>
            <div className={cx("col", s["paragraph"])}>
              <DraftjsDecoder contentState={jsonBody} />
            </div>
          </div>
        </div>

        {showSaveColumns && (
          <div className={cx("container-fluid")}>
            {/* save up section */}
            <div className="row row-eq-height">
              <div className={cx("col-md-4", s["save-up-column"])}>
                <div className={cx(s["save-up-column-wrap"])}>
                  <div className={cx(s["circle-wrapper"])}>
                    <img src={circle} className={cx(s["circle-sign"])} alt="75%" title="75%"/>
                    <Text
                      className={"uppercase"}
                      defaultMessage={"SAVE UP TO"}
                      id={`jet-cost-description-saveup-75-badge-title`}
                    />
                    <Text
                      className={"uppercase"}
                      defaultMessage={"75%"}
                      id={`jet-cost-description-saveup-75-badge-percentage`}
                    />
                  </div>
                  <div className={cx(s["ads-title"])}>
                    <Link to={"/private-jet-charter"}>
                      <Text strong={true} defaultMessage={"Empty Legs"} id={`jet-cost-description-saveup-75-header`} />
                    </Link>
                  </div>
                  <Text
                    defaultMessage={`An empty leg, or ferry flight, refers to a private jet flying "empty" after dropping off passengers,
                    or en route to pick up passengers. As the flight is already paid for, we offer significant discounts
                    on these flights. LunaJets can offer such prices when the empty leg of a private jet matches your
                    itinerary and timing exactly. This option is for one-way flights only.`}
                    id={`jet-cost-description-saveup-75`}
                  />
                </div>
              </div>

              <div className={cx("col-md-4", s["save-up-column"])}>
                <div className={cx(s["save-up-column-wrap"])}>
                  <div className={cx(s["circle-wrapper"])}>
                    <img src={circle} className={cx(s["circle-sign"])} alt="50%" title="50%"/>
                    <Text
                      className={"uppercase"}
                      defaultMessage={"SAVE UP TO"}
                      id={`jet-cost-description-saveup-50-badge-title`}
                    />
                    <Text
                      className={"uppercase"}
                      defaultMessage={"50%"}
                      id={`jet-cost-description-saveup-50-badge-percentage`}
                    />
                  </div>
                  <div className={cx(s["ads-title"])}>
                    <Link to={"/private-jet-charter"}>
                      <Text
                        strong={true}
                        defaultMessage={"Rerouted Empty Legs"}
                        id={`jet-cost-description-saveup-50-header`}
                      />
                    </Link>
                  </div>
                  <Text
                    defaultMessage={`If there are no empty leg flights for your exact itinerary and timing, LunaJets will search its
                    proprietorial database to reroute an empty leg. This would be a private jet that would make an
                    additional stop to pick you up at your departure airport, drop you off at your destination airport or
                    both. These stops incur an additional cost (landing fees, extra fuel) that LunaJets will negociate
                    with operators for the best possible deal. Although greater than an empty leg price, a rerouted empty
                    leg will always be much less expensive than a full fare on-demand private jet price.`}
                    id={`jet-cost-description-saveup-50`}
                  />
                </div>
              </div>

              <div className={cx("col-md-4", s["save-up-column"])}>
                <div className={cx(s["save-up-column-wrap"])}>
                  <div className={cx(s["circle-wrapper"])}>
                    <img src={circle} className={cx(s["circle-sign"])} alt="25%" title="25%"/>
                    <Text
                      className={"uppercase"}
                      defaultMessage={"SAVE UP TO"}
                      id={`jet-cost-description-saveup-25-badge-title`}
                    />
                    <Text
                      className={"uppercase"}
                      defaultMessage={"25%"}
                      id={`jet-cost-description-saveup-25-badge-percentage`}
                    />
                  </div>
                  <div className={cx(s["ads-title"])}>
                    <Link to={"/private-jet-charter"}>
                      <Text
                        strong={true}
                        defaultMessage={"On demand private jet charter"}
                        id={`jet-cost-description-saveup-25-header`}
                      />
                    </Link>
                  </div>
                  <Text
                    defaultMessage={`If there are no empty legs and no possibility of rerouting an empty leg, LunaJets can negociate with
                    its network of partner operators for the best on-demand charter price for your itinerary. You will be
                    offered a selection of aircraft at the best charter prices to choose from. No minimum fying time is
                    required and you just pay the fixed pre-agreed price for your flight. No upfront deposit. No long-term
                    contract. Private jet charter costs are fixed and include all necessary amenities.`}
                    id={`jet-cost-description-saveup-25`}
                  />
                </div>
              </div>

              <div className={cx("col-md-4", s["illustration"])}>
                <div className={cx(s["image"])}>
                  <img src={emptyLegs} />
                </div>
                <div className={cx(s["price"])}>
                  <Text
                    className={cx(s["price-description"])}
                    defaultMessage={"Empty Leg"}
                    id={`jet-cost-description-pirce-1`}
                  />
                  <Text
                    className={cx(s["price-description"])}
                    defaultMessage={"Starting at ZZ,00€"}
                    id={`jet-cost-description-pirce-start-1`}
                  />
                </div>
                <div className={cx(s["action-button"])}>
                  <Link
                    to="#"
                    className={"btn lt-red w-100"}
                    text="BOOK AN EMPTY LEG"
                    id="client.jetCost.bookAnEmptyLegs"
                  />
                </div>
              </div>
              <div className={cx("col-md-4", s["illustration"])}>
                <div className={cx(s["image"])}>
                  <img src={reroutedEmptyLegs} />
                </div>
                <div className={cx(s["price"])}>
                  <Text
                    className={cx(s["price-description"])}
                    defaultMessage={"Re-route empty leg"}
                    id={`jet-cost-description-pirce-2`}
                  />
                  <Text
                    className={cx(s["price-description"])}
                    defaultMessage={"Starting at XX,00€"}
                    id={`jet-cost-description-pirce-start-2`}
                  />
                </div>
                <div className={cx(s["action-button"])}>
                  <Link
                    to="#"
                    className={"btn lt-red w-100"}
                    text="Contact our team"
                    id="client.jetCost.contactOurTeam"
                  />
                </div>
              </div>
              <div className={cx("col-md-4", s["illustration"])}>
                <div className={cx(s["image"])}>
                  <img src={onDemandJet} />
                </div>
                <div className={cx(s["price"])}>
                  <Text
                    className={cx(s["price-description"])}
                    defaultMessage={"On demand charter"}
                    id={`jet-cost-description-pirce-3`}
                  />
                  <Text
                    className={cx(s["price-description"])}
                    defaultMessage={"Starting at YY,00€"}
                    id={`jet-cost-description-pirce-start-3`}
                  />
                </div>
                <div className={cx(s["action-button"])}>
                  <Link
                    to="#"
                    className={"btn lt-red w-100"}
                    text="Charter a private jet"
                    id="client.jetCost.charterAPrivateJet"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
}

JetCostDescription.propTypes = {
  city: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.object,
  showSaveColumns: PropTypes.bool,
};

JetCostDescription.defaultProps = {
  city: "",
  title: "How much does a private jet charter cost?",
  description: {},
  showSaveColumns: true,
};

export default withStyles(s)(JetCostDescription);
