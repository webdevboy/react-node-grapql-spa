import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import FixedRatioContainer from "../../../Primitives/FixedRatioContainer";
import Text from "../../../Primitives/Text";
import s from "./CareerList.scss";

import service from "../../../../templates/home/gfx/service.svg";

class CareerList extends React.Component {

  render() {
    const posts = this.props.corporate;
    // console.log('CareerList: ', posts)
    return (
      <div className={cx("container-fluid px-0 row", s["list-container"])}>
        <div className={cx(`col-sm-4 col-12 mt-sm-3`, s["list-content"])}>
          <FixedRatioContainer ratio={1} className={cx(s["tr-grey-bg"])}>
            <div className={cx(s["content"])}>
              <span className={s["team-image"]} />
              <Text className={cx("uppercase px-2", s["titleText"])} id={`${posts[0].id}-title`} defaultMessage={posts[0].title} />
              <Text strong={true} className={cx("px-2", s["text"])} id={`${posts[0].id}-text`} defaultMessage={posts[0].text} />
            </div>
          </FixedRatioContainer>
        </div>
        <div className={cx(`col-sm-4 col-12 mt-sm-3`, s["list-content"])}>
          <FixedRatioContainer ratio={1} className={cx(s["li-grey-bg"])}>
            <div className={cx(s["content"])}>
              <span className={s["service-image"]} />
              <Text className={cx("uppercase px-2", s["titleText"])} id={`${posts[1].id}-title`} defaultMessage={posts[1].title} />
              <div className={s["listTxt-container"]}>
              {
                posts[1].text.map((txt, i) =>
                  (
                    <Text strong={true} className={cx("px-2", s["text"])} id={`${posts[1].id}-text`} defaultMessage={txt} />
                  )
                )
              }
              </div>          
            </div>
          </FixedRatioContainer>
        </div>
        <div className={cx(`col-sm-4 col-12 mt-sm-3`, s["list-content"])}>
          <FixedRatioContainer ratio={1} className={cx(s["tr-grey-bg"])}>
            <div className={cx(s["content"])}>
              <span className={s["benefit-image"]} />
              <Text className={cx("uppercase px-2", s["titleText"])} id={`${posts[2].id}-title`} defaultMessage={posts[2].title} />
              <ul>
              {
                posts[2].text.map((txt, i) => 
                  (
                    <li>
                      <Text strong={true} className={cx(s["text"])} id={`${posts[2].id}-text-${i}`} defaultMessage={txt} />
                    </li>
                  )
                )
              }
              </ul>
            </div>
          </FixedRatioContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CareerList);
