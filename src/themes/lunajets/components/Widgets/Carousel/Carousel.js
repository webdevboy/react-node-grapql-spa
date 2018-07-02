import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import SlickSlider from "react-slick";
import slickCarousel from "slick-carousel/slick/slick.css";
import slickCarouselTheme from "slick-carousel/slick/slick-theme.css";
import Text from '../../Primitives/Text';
import s from "./Carousel.css";

class Carousel extends Component {
  change = e => {
    const target = e.target;
    const index = Array.prototype.indexOf.call(target.parentElement.children, target);

    this.setState({
      current: index,
    });
  };

  onSwitchStarted = ({ prev: current, current: next }) => {
    console.log(`started to switch from ${current} to ${next}`);
  };
  onSwitching = (progress, deck) => {
    console.log("switching on progress.");
    console.log(progress, deck.state.distance);
  };
  onSwitchDone = ({ prev, current }) => {
    console.log(`switch finished, current slide index: ${current}`);
  };

  componentDidMount() {
    this.slick.innerSlider.onWindowResized();
  }

  componentWillReceiveProps() {
    this.slick.innerSlider.onWindowResized();
  }

  render() {
    const {
      slides, withLink = false, slidesToShow = 3, autoPlay = false, height = 600, slidesToScroll = 3,
    } = this.props;

    const settings = {
      ref: el => (this.slick = el),
      dots: true,
      arrows: false,
      infinite: true,
      variableWidth: false,
      cssEase: "ease",
      rtl: false,
      lazyLoad: true,
      draggable: false,
      touchMove: true,
      slidesToShow: slidesToShow,
      slidesToScroll: slidesToScroll,
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
      <div className={s.root}>
        <SlickSlider {...settings}>
          {slides.length &&
            slides.map((slide, index) => (
              <div className={cx(slidesToShow > 1 ? "p-2" : null, s["slide-image"])} key={`slide-carousel-index-${index}`}>
                {withLink ? 
                  <a target="_blank" href={slide.link ? `${slide.link}` : '#'} >
                    <img src={slide.image} alt={slide.title} title={slide.title} />
                  </a>
                  : <img src={slide.image} alt={slide.title} title={slide.title} />
                }
                {slide.title && (<h2 className="d-flex my-sm-3">
                  <Text defaultMessage={slide.title} id="client.home.widget.carousel.title" />
                </h2>)}
                {slide.summary && (<span className="d-flex corporate-blue">
                  <Text defaultMessage={slide.summary} id="client.home.widget.carousel.content" />
                </span>)}
              </div>
            ))}
        </SlickSlider>
      </div>
    );
  }
}

Carousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object),
};

Carousel.defaultProps = {
  slides: [],
};

export default withStyles(s, slickCarousel, slickCarouselTheme)(Carousel);
