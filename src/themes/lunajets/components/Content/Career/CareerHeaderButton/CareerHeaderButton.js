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
        <a target="_blank" id="CTA_linkedin" className={cx(`${(posts.class) ? posts.class : 'btn btn-secondary dk-red-bg'}`, s["header-button"])} href='https://www.linkedin.com/company/lunajets-s-a-/'>
          <Text id={posts.id} className={cx(s["text-button"])}  defaultMessage={posts.text}></Text>
          <span className={cx(s["icon-button"])}>{posts.iconText}</span>
        </a>
      </div>
    );
  }
}

export default withStyles(s)(CareerHeaderButton);
