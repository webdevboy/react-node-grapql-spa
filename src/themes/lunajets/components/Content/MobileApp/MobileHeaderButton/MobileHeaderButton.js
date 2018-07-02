import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import s from "./MobileHeaderButton.scss";
import appStore from "../../../Footer/FooterEnd/gfx/app-store-badge.svg";
import playStore from "../../../Footer/FooterEnd/gfx/play-store-badge.svg";

class MobileHeaderButton extends React.Component {
  render() {
    const posts = this.props.career;
    return (
      <div className={cx(s.switches, "col-md-7")}>
        <Text id={posts.id} defaultMessage={posts.text} />
        <div className={cx(s.badges)}>
          <div className={cx(s.badge, "d-inline-block mr-2")}>
            <a href="https://itunes.apple.com/app/lunajets-private-jets/id462220739" target="_blank">
              <img id="iOs_app_dl" src={appStore} />
            </a>
          </div>
          <div className={cx(s.badge, "d-inline-block")}>
            <a href="https://play.google.com/store/apps/details?id=com.abonobo.lunajets" target="_blank">
              <img id="Android_app_dl" src={playStore} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MobileHeaderButton);
