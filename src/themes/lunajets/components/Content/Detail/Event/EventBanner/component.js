import React from "react";
import s from "./EventBanner.css";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Loading from "react-loading-animation";
import Text from "../../../../Primitives/Text";
import FixedRatioImage from "../../../../Primitives/FixedRatioImage";
import Image from "../../../../Primitives/Image";

class EventBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const {
      data: { event },
    } = this.props;
    const media = event.media ? event.media.src : "https://s3-eu-west-1.amazonaws.com/upgrade-it-lab/AIRCR.png";
    return (
      <div>
        {/* Desktop banner */}
        <div className={cx(s["banner"], "d-none d-md-block")}>
          <Image source={media} width="100%" height="100%" alt={""} />
        </div>

        {/* Mobile banner */}
        <FixedRatioImage className="d-md-none" ratio={0.8} image={{ src: media }} />
      </div>
    );
  }
}

export default withStyles(s)(EventBanner);
