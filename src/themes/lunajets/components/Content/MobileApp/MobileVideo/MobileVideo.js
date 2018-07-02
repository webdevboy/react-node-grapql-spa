import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import FixedRatioContainer from "../../../Primitives/FixedRatioContainer";
import Text from "../../../Primitives/Text";
import Video from "../../../Primitives/Video";
import s from "./MobileVideo.scss";
import video from "../../../../templates/home/gfx/big_buck_bunny.mp4";

class MobileVideo extends React.Component {

  render() {
    const posts = this.props.mobile;
    return (
      <div className={cx("px-0", s["list-container"])}>
        <div className={cx("container px-5", s["video-header"])}>
          <h3 className={`section-title ${(posts.textColor) ? posts.textColor : 'white'}`}>
            <Text defaultMessage={posts.text} id={posts.id} />
          </h3>
        </div>
        <Video border source={video} />
      </div>
    );
  }
}

export default withStyles(s)(MobileVideo);
