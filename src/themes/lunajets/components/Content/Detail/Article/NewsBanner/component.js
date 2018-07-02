import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import LinkedIn from "react-icons/lib/io/social-linkedin";
import Banner from "../../../Banner";
import background from "./background.jpg";
import FixedRatioImage from "../../../../Primitives/FixedRatioImage";
import SectionTitle from "../../../../Layout/SectionTitle";
import Text from "../../../../Primitives/Text";

class NewsBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const post = this.props.post;
    const media = post.media ? post.media.src : "https://s3-eu-west-1.amazonaws.com/upgrade-it-lab/AIRCR.png";
    return (
      <div>
        {/* Desktop banner */}
        <FixedRatioImage className="d-none d-md-block" ratio={0.3} image={{ src: media }} />
        {/* Mobile banner */}
        <FixedRatioImage className="d-md-none" ratio={0.8} image={{ src: media }} />
        <div className={cx("container my-5")}>
          <div className="row">
            <div className="col">
              <h2 className="section-heading">
                <Text defaultMessage={post.title} id={post.title} />
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsBanner;
