import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import Link from "../../../Primitives/Link";
import RichImage from "../../../Primitives/RichImage";
import Carousel from "../../../Widgets/Carousel";
import SliderLink from "../../../Primitives/SliderLink";
import suisse from "./gfx/suisse.png";
import cnn from "./gfx/cnn.png";
import bloomberg from "./gfx/bloomberg.png";
import cnbc from "./gfx/cnbc.png";
import cx from "classnames";
import s from "./style.css";

const slides = [
  {
    image: "https://picsum.photos/350/250/?image=257",
    description: "something",
  },
  {
    image: "https://picsum.photos/g/350/250/?image=49",
    description: "something",
  },
  {
    image: "https://picsum.photos/350/250/?image=25",
    description: "something",
  },
  {
    image: "https://picsum.photos/g/350/250/?image=10",
    description: "something",
  },
  {
    image: "https://picsum.photos/g/350/250/?image=151",
    description: "something",
  },
  {
    image: "https://picsum.photos/g/350/250/?image=155",
    description: "something",
  },
];

export class AsSeenOn extends Component {
  render() {
    const { post } = this.props;
    return (
      <div className="container lj-pad-y-50">
        <div className="row">
          <div className="col">
              <Text className={"section-title corporate-blue"} id="client.home.asSeenOn" defaultMessage="As Seen On" h2 />
          </div>
        </div>
        <div className={cx("row my-5", s["as-seen-slider"])}>
          <div className="col">
            <SliderLink post={post} defaultSlides={slides} />
          </div>
        </div>
        <div className="row lj-pad-y-50">
          <div className="col-lg-3 col-sm-6 py-sm-4 py-4 d-flex justify-content-center align-items-center">
            <RichImage
              to="#"
              text="Suisse RTV"
              id="client.home.asSeenOn.link.suisse"
              src={suisse}
            />
          </div>
          <div className="col-lg-3 col-sm-6 py-sm-4 py-4 d-flex justify-content-center align-items-center">
            <RichImage
              to="#"
              text="CNBC"
              id="client.home.asSeenOn.link.cnbc"
              src={cnbc}
            />
          </div>
          <div className="col-lg-3 col-sm-6 py-sm-4 py-4 d-flex justify-content-center align-items-center">
            <RichImage
              to="#"
              text="Bloomberg"
              id="client.home.asSeenOn.link.bloomberg"
              src={bloomberg}
            />
          </div>
          <div className="col-lg-3 col-sm-6 py-sm-4 py-4 d-flex justify-content-center align-items-center">
            <RichImage
              to="#"
              text="CNN"
              id="client.home.asSeenOn.link.cnn"
              src={cnn}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default  withStyles(s)(AsSeenOn);
