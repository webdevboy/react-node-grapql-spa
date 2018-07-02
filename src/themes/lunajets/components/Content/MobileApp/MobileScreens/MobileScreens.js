import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import Carousel from "../../../Widgets/Carousel";
import Text from "../../../Primitives/Text";
import s from "./MobileScreens.scss";
import welcome_screen from "./gfx/mobile_welcome.png";
import account_screen from "./gfx/mobile_account.png";
import chat_screen from "./gfx/mobile_chat.png";
import request_screen from "./gfx/mobile_request.png";

const slides = [
  {
    image: welcome_screen,
    description: "something",
  },
  {
    image: account_screen,
    description: "something",
  },
  {
    image: chat_screen,
    description: "something",
  },
  {
    image: request_screen,
    description: "something",
  },
  {
    image: welcome_screen,
    description: "something",
  },
  {
    image: account_screen,
    description: "something",
  },
  {
    image: chat_screen,
    description: "something",
  },
  {
    image: request_screen,
    description: "something",
  },
  {
    image: welcome_screen,
    description: "something",
  },
  {
    image: account_screen,
    description: "something",
  },
];

class MobileScreens extends React.Component {

  render() {
    const posts = this.props.mobile;
    return (
      <div className={cx("container", s["list-container"])}>
        <h3 className={`section-title ${(posts.titleColor) ? posts.titleColor : 'white'}`}>
          <Text defaultMessage={posts.title} id={posts.id} />
        </h3>
        <div className="row row my-5">
          <div className="col">
            <Carousel slides={slides} slidesToShow={posts.slidesToShow} slidesToScroll={posts.slidesToScroll} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MobileScreens);
