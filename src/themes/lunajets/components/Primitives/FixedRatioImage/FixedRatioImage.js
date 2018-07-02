import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Image from "../../Primitives/Image";
import s from "./FixedRatioImage.scss";

class FixedRatioImage extends React.Component {
  render() {
    const { image, ratio = 1, alt, title } = this.props;
    return (
      <div style={{ paddingTop: `${ratio * 100}%` }} className={cx(s["root"], this.props.className)}>
        {image !== null ? (
        <Image source={image.src || image} width="100%" height="100%" alt={alt || ''} title={title || ''} />
      ) : null} 
      </div>
    );
  }
}

export default withStyles(s)(FixedRatioImage);
