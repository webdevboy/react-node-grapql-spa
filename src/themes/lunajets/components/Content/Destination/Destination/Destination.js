import React, { Component } from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import FixedRatioImage from "../../../Primitives/FixedRatioImage";
import s from "./Destination.scss";
import getUrlFromPost from "utils/getUrlFromPost";
import Link from "../../../Primitives/Link";
import Text from "../../../Primitives/Text";
import { image } from "mock";

class Destination extends Component {
  render() {
    const post = this.props.data;
    const cityName = post.city ? post.city.name : "city";
    const imgSrc = post.media ? post.media.src : image.src;
    return (
      <div className="col-sm-4 col-12">
        <div className={cx(s.destination)}>
          <FixedRatioImage image={{ src: imgSrc }} ratio={1} alt={cityName} title={cityName} />
          <div className={cx(s.infos)}>
            <Link
              to={getUrlFromPost(post.locale, post)}
              className="d-flex justify-content-between align-items-center"
            >
              <span className={cx(s.title)}>{cityName}</span>
              <Text id="seeMore" defaultMessage="see more" className={cx(s["see-more"])} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Destination);

export const component = {
  defaultProps: Destination.defaultProps,
  propTypes: Destination.propTypes,
  propSchema: Destination.propSchema,
  category: "content",
  tags: ["destinations", "list", "content"],
};
