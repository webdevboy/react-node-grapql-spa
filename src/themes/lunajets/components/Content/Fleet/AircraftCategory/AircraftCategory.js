import React from "react";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import slickCarousel from "slick-carousel/slick/slick.css";
import slickCarouselTheme from "slick-carousel/slick/slick-theme.css";
import getUrlFromPost from "utils/getUrlFromPost";

import s from "./AircraftCategory.scss";

import Image from "../../../Primitives/Image";
import Text from "../../../Primitives/Text";
import Link from "../../../Primitives/Link";

class AircraftCategory extends React.Component {
  state = {};
  render() {
    const {category, top, left, mobile, id, locale} = this.props;
    return (
      <div className={cx(s["category-box"], top ? s["no-top-border"] : '', left ? s["no-left-border"] : '', mobile ? s["only-right-border"] : '')}>
        <Link to={`${getUrlFromPost(locale, category)}`}>
          <Image source={category.image} alt={category.name} title={category.name}/>
        </Link>
        {/* <div className={s.name}>
          <Text defaultMessage={category.name} id={id}/>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.intl.locale
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s, slickCarousel, slickCarouselTheme)(AircraftCategory));
