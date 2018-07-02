import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import Text from "../../../Primitives/Text";
import s from "./CareerHeaderButton.scss";

import service from "../../../../templates/home/gfx/service.svg";

class CareerHeaderButton extends React.Component {

  render() {
    const posts = this.props.career;
    // console.log('CareerHeaderButton: ', posts)
    return (
      <div className={cx(s["header-button-area"])}>
        <button id={posts.id} className={`${(posts.class) ? posts.class : 'btn btn-secondary'}`, cx(s["header-button"])}>
          {posts.text} <Text id={posts.id} className={cx(s["icon-button"])} defaultMessage={posts.iconText}></Text>
        </button>
      </div>
    );
  }
}

export default withStyles(s)(CareerHeaderButton);
