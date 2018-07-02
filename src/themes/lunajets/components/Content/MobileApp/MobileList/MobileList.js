import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import * as FontAwesome from "react-icons/lib/fa";

import FixedRatioContainer from "../../../Primitives/FixedRatioContainer";
import Text from "../../../Primitives/Text";
import s from "./MobileList.scss";

import aircraft from "./gfx/airport.svg";
import flight_ticket from "./gfx/flight_ticket.png";
import flight from "./gfx/flight.png";


class MobileList extends React.Component {

  render() {
    const posts = this.props.mobile;
    return (
      <div className={cx("container px-0", s["list-container"])}>
        <div className={cx("row px-0", s["child-list"])}>
          <div className={cx("col-12 col-sm-4 col-md-4 column px-0", s["lchild-container"])}>
            <FixedRatioContainer ratio={1.4} className={cx(s["child-bg"])}>
            {
              posts.lists.map((list, i) =>
                (
                  (i / 3) < 1 ? (
                    <div className={cx("px-0", s["card"])}>
                      <div className={cx(s["card-header"])}>
                        <Text strong={true} className={cx("uppercase", s["card-info-title"])} id={`${list.id}-title-${i}`} defaultMessage={list.title} />
                        {
                          i === 0 ? <FontAwesome.FaStreetView size="3vw" fill="#263d50" stroke="#263d50" strokeWidth="1" className={cx(s["card-ads-image"])} /> : (i == 1 ? <FontAwesome.FaFileTextO size="3vw" fill="#263d50" stroke="#263d50" strokeWidth="1" className={cx(s["card-ads-image"])} /> : <FontAwesome.FaComments size="3vw" fill="#263d50" stroke="#263d50" strokeWidth="1" className={cx(s["card-ads-image"])} />)
                        }
                      </div>
                      <div className={cx(s["card-info"])}>
                        <Text className={cx(s["card-info-text"])} id={`${list.id}-text-${i}`} defaultMessage={list.text} />
                      </div>
                    </div>
                  ) : ""
                )
              )
            }
            </FixedRatioContainer>
          </div>
          <div className={cx("col-12 col-sm-4 col-md-4", s["mchild-container"])}>
            <FixedRatioContainer ratio={1.4} className={cx(s["child-bg"])}>
              <div className={cx(s["mobile-screen"])}>
              </div>
            </FixedRatioContainer>
          </div>
          <div className={cx("col-12 col-sm-4 col-md-4 column px-0", s["rchild-container"])}>
            <FixedRatioContainer ratio={1.4} className={cx(s["child-bg"])}>
            {
              posts.lists.map((list, i) =>
                (
                  (i / 3) >= 1 ? (
                    <div className={cx("px-0", s["card"])}>
                      <div className={cx(s["card-header"])}>
                        {
                          i === 3 ? <img className={cx(s["card-ads-image"])} src={flight_ticket} /> : (i == 4 ? <img className={cx(s["card-ads-image"])} src={flight} /> : <img className={cx(s["card-ads-image"])} src={aircraft} />)
                        }
                        <Text strong={true} className={cx("uppercase", s["card-info-title"])} id={`${list.id}-title-${i}`} defaultMessage={list.title} />
                      </div>
                      <div className={cx(s["card-info"])}>
                        <Text className={cx(s["card-info-text"])} id={`${list.id}-text-${i}`} defaultMessage={list.text} />
                      </div>
                    </div>
                  ) : ""
                )
              )
            }
            </FixedRatioContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MobileList);
