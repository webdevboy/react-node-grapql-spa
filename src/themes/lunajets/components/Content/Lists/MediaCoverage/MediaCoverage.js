import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SlickSlider from "react-slick";
import slickCarousel from "slick-carousel/slick/slick.css";
import slickCarouselTheme from "slick-carousel/slick/slick-theme.css";
import SectionTitle from "../../../Layout/SectionTitle";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import s from "./MediaCoverage.css";

class MediaCoverage extends Component {

  componentDidMount() {
    // console.log(this.props);
  }

  slickPrev = ()=> {
    this.slick.slickPrev();
  }

  slickNext = ()=> {
    this.slick.slickNext();
  }


  render() {
    // const { data: { articles }, linkToDetail } = this.props;
    const {
      slides, slidesToShow = 3, autoPlay = false, height = 600, slidesToScroll = 1, coverages
    } = this.props;
    // console.log(coverages)

    const news = "LUNAJETS IN THE NEWS";

    const settings = {
      ref: el => (this.slick = el),
      dots: false,
      arrows: false,
      infinite: true,
      variableWidth: false,
      cssEase: "ease",
      rtl: false,
      lazyLoad: true,
      draggable: true,
      touchMove: true,
      slidesToShow: coverages.length < 3 ? coverages.length : 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    
    return (
      <div className={s.root}>
      <div className="row mb-5">
        <SectionTitle textId="client.page.mediaCoverage.sectionTitle" defaultMessage="MEDIA COVERAGE"  hx="2"/>
      </div>
      <div className="row">
          {
              coverages.length > 0 ? <div className={cx(s.slide, "col-lg-10 offset-lg-1 offset-0")}>
            <div className={s.prev} onClick={this.slickPrev}>
              <i className="fa fa-angle-left" />
            </div>
            <SlickSlider {...settings}>
                {coverages.map((slide, index) => (
                      <div className={cx(slidesToShow > 1 ? "p-2" : null)} key={`media-slide-carousel-index-${index}`}>
                        <img src={slide.media && slide.media.src} alt={`${slide.title}-${slide.summary}`} className={cx(s["coverage-img"])} />
                        {slide.title && (<h2 className="d-flex my-sm-3" style={{ justifyContent: 'center' }}>
                          <Text defaultMessage={slide.title} id="client.mediaContent.lists.mediaCoverage.title" />
                        </h2>)}
                        {slide.summary && (<span className="d-flex text-center corporate-blue" style={{ justifyContent: 'center' }}>
                          <Text defaultMessage={slide.summary} id="client.mediaContent.lists.mediaCoverage.title" />
                        </span>)}
                      </div>
                ))}
              </SlickSlider>
              
              <div className={s.next} onClick={this.slickNext}>
                <i className="fa fa-angle-right" />
              </div>
          </div> : null
          }
        </div>
          <div className="row pt-5 pb-5">
            <div className="col-lg-4" />
            <div className="col-lg-4">
              <a className="btn btn-outline dk-blue w-100">
                <Text id="primarybutton" defaultMessage={news} />
              </a>
            </div>
            <div className="col-lg-4" />
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default withStyles(s, slickCarousel, slickCarouselTheme)(MediaCoverage);

