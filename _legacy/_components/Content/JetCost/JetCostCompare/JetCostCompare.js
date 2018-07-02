import React from "react";
import cx from "classnames";
import s from "./JetCostCompare.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "components/Primitives/Text";
import SectionTitle from "components/Layout/SectionTitle";
import IoCheckYes from "react-icons/lib/io/checkmark-round";
import IoCheckNo from "react-icons/lib/io/close-round";

class JetCostCompare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className={cx(s["jet-cost-compare"])}>
        <div className={cx("container my-5")}>
          <div className={cx("row")}>
            <div className={cx("col")}>
              <SectionTitle textId="Compare your options" />
            </div>
          </div>

          <div className="row mt-5">
            <div className="col">
              <p>
                <Text defaultMessage={`Chances are you've considered various options and business models for flying privately. The table below
                will show you how the LunaJets on-demand charter programme compares to options like jet card and
                fractional jet ownership programmes. For private jet flyers who need flexibility, both in their schedule
                and financially, on-demand charter is the best option.`} id={`jet-cost-compare-text-1`}/>
              </p>
            </div>
          </div>

          <div className="row my-5">
            <div className="col">
              <div className="table-responsive">
                <table className={cx("table", s["table-compare"])}>
                  <thead>
                    <tr>
                      <th />
                      <th scope="col" className={cx(s["lunajets"])}>
                        LunaJets
                      </th>
                      <th scope="col">Owner / Fractionnal</th>
                      <th scope="col">25H-Card Program</th>
                      <th scope="col">"Traditional Broker"</th>
                      <th scope="col">"App / Web Broker"</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <div className={cx(s["label"])}>Best negociated prices</div>
                      </th>
                      <td>
                        <IoCheckYes size={28} color="#b6cada" />
                      </td>
                      <td>
                        <IoCheckNo size={28} color="#b51f24" />
                      </td>
                      <td>
                        <IoCheckNo size={28} color="#b51f24" />
                      </td>
                      <td>
                        <IoCheckNo size={28} color="#b51f24" />
                      </td>
                      <td>
                        <IoCheckNo size={28} color="#b51f24" />
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">
                        <div className={cx(s["label"])}>Empty leg discounted prices</div>
                      </th>
                      <td>
                        <IoCheckYes size={28} color="#b6cada" />
                      </td>
                      <td>
                        <IoCheckNo size={28} color="#b51f24" />
                      </td>
                      <td>
                        <IoCheckNo size={28} color="#b51f24" />
                      </td>
                      <td>
                        <IoCheckNo size={28} color="#b51f24" />
                      </td>
                      <td>
                        <IoCheckYes size={28} color="#b6cada" />
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">
                        <div className={cx(s["label"])}>Dedicated private jet advisor 24 / 7</div>
                      </th>
                      <td>
                        <IoCheckYes size={28} color="#b6cada" />
                      </td>
                      <td>
                        <IoCheckYes size={28} color="#b6cada" />
                      </td>
                      <td>
                        <IoCheckYes size={28} color="#b6cada" />
                      </td>
                      <td>
                        <IoCheckYes size={28} color="#b6cada" />
                      </td>
                      <td>
                        <IoCheckNo size={28} color="#b51f24" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <p>
                <Text defaultMessage={`Chances are you've considered various options and business models for flying privately. The table below
                will show you how the LunaJets on-demand charter programme compares to options like jet card and
                fractional jet ownership programmes. For private jet flyers who need flexibility, both in their schedule
                and financially, on-demand charter is the best option.`} id={`jet-cost-compare-text-2`}/>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withStyles(s)(JetCostCompare);
