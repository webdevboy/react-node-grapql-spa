import React from "react";
import cx from "classnames";
import s from "./MapListDisplay.css";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import SlickSlider from "react-slick";
import slickCarousel from "slick-carousel/slick/slick.css";
import slickCarouselTheme from "slick-carousel/slick/slick-theme.css";
import Text from "../../../Primitives/Text";
import Map from "../../../Widgets/MapBox";
import PropTypes from "prop-types";
import _ from "lodash";
import ArrowRight from "react-feather/dist/icons/arrow-right";
import Loading from "react-loading-animation";
import Link from "../../../Primitives/Link";
import getUrlFromPost from "utils/getUrlFromPost";

class MapListDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  render() {
    const { locale, defaultTitle, titleId, fixedText, lastTextId, lastTextDefault } = this.props;
    const listAirports = this.props.data ? this.props.data.posts : null;

    const settings = {
      ref: el => (this.slick = el),
      dots: true,
      arrows: false,
      infinite: false,
      variableWidth: false,
      cssEase: "ease",
      rtl: false,
      lazyLoad: true,
      draggable: false,
      touchMove: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <Loading isLoading={this.props.isFetching}>
        <div className={cx(s["map-list"])}>
          <div className={cx("container")}>
            {/* title */}
            <div className={cx("row")}>
              <div className={cx("col")}>
                <span className={cx("section-title lt-blue", s["title"])}>
                  <Text defaultMessage={defaultTitle} id={titleId} />{fixedText ? <Text defaultMessage={fixedText} /> : null}{lastTextId ? <Text defaultMessage={lastTextDefault} id={lastTextId} />: null }
                </span>
              </div>
            </div>

            {/* airports */}
            {/* listAirport to be replaced by event.city.recommendedAirports */}
            <SlickSlider {...settings}>
              {listAirports.length &&
                listAirports.map((airport, index) => (
                  <div className={cx(s["map-container"])} key={`airport-map-index-${index}`}>
                    {/* map */}
                    <Map maxZoom={10} zoom={10} type={"marker"} locations={[{ coordinates: airport.details ? `${airport.details.location__latitude__s}, ${airport.details.location__longitude__s}` : '' }]} />

                    {/* caption */}
                    <Link to={`${getUrlFromPost(locale, airport)}`}>
                      <div className={cx(s["caption"], "clearfix", this.props.captionBackgroundColor)}>
                        <span className={cx(s["caption-location"], "conduit conduit-bold white uppercase")}>
                          <i className={cx(`famfamfam-flags ${airport.details ? airport.details['city.country.country_code__c'].toLowerCase() : 'fr' || 'fr'}`)} />
                          <span className={s["caption-city"]}>{airport.details ? airport.details.name__c : ''}</span>
                        </span>
                        <ArrowRight color={"#b5393d"} size={24} />
                      </div>
                    </Link>
                  </div>
                ))}
            </SlickSlider>
          </div>
        </div>
      </Loading>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.intl.locale
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(s, slickCarousel, slickCarouselTheme))(MapListDisplay));
