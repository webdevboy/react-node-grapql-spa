import React from "react";
import cx from "classnames";
import s from "./JetCostCompare.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "themes/lunajets/components/Primitives/Text";
import SectionTitle from "themes/lunajets/components/Layout/SectionTitle";
import IoCheckYes from "react-icons/lib/io/checkmark-round";
import IoCheckNo from "react-icons/lib/io/close-round";
import IoAndroid from "react-icons/lib/fa/android";
import IoApple from "react-icons/lib/fa/apple";
import confirmIcon from './gfx/confirm.svg';
import deleteIcon from './gfx/delete.svg';

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
              <h2>
                <Text
                  className={cx("text-secondary uppercase", s["section-title1"])}
                  id="Compare your options"
                  defaultMessage="Compare your options"
                />
              </h2>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col">
              <p>
                <Text defaultMessage={`Chances are you've considered various options and business models for flying privately. The table below
                will show you how the LunaJets on-demand charter programme compares to options like jet card and
                fractional jet ownership programmes. For private jet flyers who need flexibility, both in their schedule
                and financially, on-demand charter is the best option.`} id={`jet-cost-compare-text-1`} />
                </p>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="table-responsive">
                <table className={cx("table", s["table-compare"])}>
                  <thead>
                    <tr>
                      <th />
                      <th scope="col" className={cx(s["lunajets"])}>
                        <Text defaultMessage={`LunaJets`} id={`jet-cost-compare-table-header-1`} />
                      </th>
                      <th scope="col">
                        <Text defaultMessage={`Owner / Fractionnal`} id={`jet-cost-compare-table-header-2`} />
                      </th>
                      <th scope="col">
                        <Text defaultMessage={`25H-Card Program`} id={`jet-cost-compare-table-header-3`} />
                      </th>
                      <th scope="col">
                        <Text defaultMessage={`"Traditional Broker"`} id={`jet-cost-compare-table-header-4`} />
                      </th>
                      <th scope="col">
                        <Text defaultMessage={`"App / Web Broker"`} id={`jet-cost-compare-table-header-5`} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <div className={cx(s["label"])}>
                          <Text defaultMessage={`Best negociated prices`} id={`jet-cost-compare-table-body-1`} />
                        </div>
                      </th>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">
                        <div className={cx(s["label"])}>
                          <Text defaultMessage={`Empty leg discounted prices`} id={`jet-cost-compare-table-body-2`} />
                        </div>
                      </th>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">
                        <div className={cx(s["label"])}>
                          <Text defaultMessage={`Dedicated private jet advisor 24 / 7`} id={`jet-cost-compare-table-body-3`} />
                        </div>
                      </th>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                    </tr>

                     <tr>
                      <th scope="row">
                        <div className={cx(s["label"])}>
                          <Text defaultMessage={`App`} id={`jet-cost-compare-table-body-3-1`} /><IoAndroid size={20} /> <IoApple size={20} /> <Text defaultMessage={`/ Web booking`} id={`jet-cost-compare-table-body-3-2`} />
                        </div>
                      </th>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">
                        <div className={cx(s["label"])}>
                          <Text defaultMessage={`No minimum notice / urgent take off(60')`} id={`jet-cost-compare-table-body-4`} />
                        </div>
                      </th>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">
                        <div className={cx(s["label"])}>
                          <Text defaultMessage={`No long term commitment / membership`} id={`jet-cost-compare-table-body-5`} />
                        </div>
                      </th>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">
                        <div className={cx(s["label"])}>
                          <Text defaultMessage={`Access to worldwide fleet`} id={`jet-cost-compare-table-body-6`} />
                        </div>
                      </th>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">
                        <div className={cx(s["label"])}>
                          <Text defaultMessage={`Access to all size aircraft - no costly ratios`} id={`jet-cost-compare-table-body-7`} />
                        </div>
                      </th>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">
                        <div className={cx(s["label"])}>
                          <Text defaultMessage={`Groups / Emergency / Medical / Pets / Fine arts`} id={`jet-cost-compare-table-body-8`} />
                        </div>
                      </th>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
                      </td>
                      <td>
                        <img src={confirmIcon} alt="Yes" title="Yes"/>
                      </td>
                      <td>
                        <img src={deleteIcon} alt="No" title="No"/>
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
                and financially, on-demand charter is the best option.`} id={`jet-cost-compare-text-2`} />
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withStyles(s)(JetCostCompare);
