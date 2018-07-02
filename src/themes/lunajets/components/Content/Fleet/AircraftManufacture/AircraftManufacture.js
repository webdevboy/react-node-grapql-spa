import React from "react";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import slickCarousel from "slick-carousel/slick/slick.css";
import slickCarouselTheme from "slick-carousel/slick/slick-theme.css";
import getUrlFromPost from "utils/getUrlFromPost";

import s from "./AircraftManufacture.scss";

import Image from "../../../Primitives/Image";
import Link from "../../../Primitives/Link";

class AircraftManufacture extends React.Component {
  state = {};
  render() {
    const {manufacture, top, left, mobile, locale} = this.props;
    return (
      <div className={cx(s["category-box"], top ? s["no-top-border"] : '', left ? s["no-left-border"] : '', mobile ? s["only-right-border"] : '')}>
        <Link to={`${getUrlFromPost(locale, manufacture)}`}>
          <Image source={manufacture.image} title={manufacture.name} alt={manufacture.name} />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.intl.locale
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s, slickCarousel, slickCarouselTheme)(AircraftManufacture));

