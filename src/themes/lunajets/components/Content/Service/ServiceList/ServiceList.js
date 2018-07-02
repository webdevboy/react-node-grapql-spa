import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import { image } from "mock";
import FixedRatioImage from "../../../Primitives/FixedRatioImage";
import FixedRatioContainer from "../../../Primitives/FixedRatioContainer";
import Text from "../../../Primitives/Text";
import Link from "../../../Primitives/Link";
import Input from "../../../Primitives/Input";
import s from "./ServiceList.scss";

class ServiceList extends React.Component {

  render() {
    const posts = this.props.corporate;
    const submitPencilStyle = {
      zIndex: 1,
      color: 'white',
      marginTop: '32px',
      marginLeft: '-40px'
    }
    // console.log('serviceList: ', posts)
    return (
      <div className={cx("container-fluid px-0 row", s["list-container"])}>
        {
          posts.map((p, i) =>
            (
              <div className={i % 2 == 0 ? cx(`col-sm-6 col-12 order-${i + 2} mt-sm-3 px-sm-2`, s["list-content"]) : cx(`col-sm-6 col-12 order-${i + 2} order-sm-${i + 1} mt-sm-3 px-sm-2`, s["list-content"])}>
                <FixedRatioContainer ratio={1} className={cx(s["li-grey-bg"])}>
                  <div className={cx(s["content"])}>
                    <Text className={cx("uppercase px-2", s["titleText"])} id={`${p.id}.title`} defaultMessage={p.defaultTitle} h2={true} />
                    <Text className={cx("px-2", s["subText"])} id={`${p.id}.subTitle`} defaultMessage={p.defaultSubTitle} />
                    <Text className={cx("px-2", s["text"])} id={`${p.id}.text`} defaultMessage={p.defaultText} />
                    <div className={s['submit-wrapper']}>
                      <Input
                        type="submit"
                        value={p.defaultButtonText}
                        name="flight_request_form"
                        className={cx("btn-outline red", s["btn-read-more"])}
                        pencilStyle={submitPencilStyle}
                        placeholderId={`client.lunajets.service.readmore`}
                      />
                    </div>
                  </div>
                </FixedRatioContainer>
              </div>
            ),
          )
        }
      </div>
    );
  }
}

export default withStyles(s)(ServiceList);
