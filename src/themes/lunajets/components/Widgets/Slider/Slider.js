import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import SlickSlider from "react-slick";
import slickCarousel from "slick-carousel/slick/slick.css";
import slickCarouselTheme from "slick-carousel/slick/slick-theme.css";
import Link from "../../Primitives/Link";
import s from "./Slider.css";

class Slider extends Component {
  state = {
    current: 0,
  };

  onSwitchStarted = ({ prev: current, current: next }) => { };
  onSwitching = (progress, deck) => { };
  onSlideChange = index => {
    this.setState({
      current: index,
    });
  };

  componentDidMount() {
    this.slick.innerSlider.onWindowResized();
  }

  componentWillReceiveProps() {
    this.slick.innerSlider.onWindowResized();
  }

  render() {
    const { current } = this.state;
    const { slides, removeDiscover } = this.props;
    const settings = {
      ref: el => (this.slick = el),
      dots: true,
      arrows: false,
      infinite: false,
      slidesToScroll: 1,
      slidesToShow: 1,
      speed: 2000,
      autoPlay: true,
      swipeToSlide: true,
      initialSlide: 0,
      lazyLoad: true,
      afterChange: this.onSlideChange,
    };

    return (
      <div className={cx(s["root"], this.props.className)}>
        <SlickSlider {...settings}>
          {slides.length &&
            slides.map((slide, index) => (
              <div key={`slide-id-${index}`}>
                <div className={s.slide} style={{ backgroundImage: `url(${slide.image})` }} />
              </div>
            ))}
        </SlickSlider>
        <div className={cx(s.container, "container-fluid")}>
          <div className="container">
            <div className="row">
              {slides[current].description ? (
                <div className="col-lg-8">
                  <span className="section-title white">{slides[current].description}</span>
                </div>
              ) : null}
              {!removeDiscover ? (
                <div className={cx("col-lg-4", s["button-discover"])}>
                  <Link className={cx("btn lt-red-bg")} to="#" text="Discover More" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object),
};

Slider.defaultProps = {
  slides: [
    {
      image: "https://picsum.photos/3000/1996?image=1071",
      title: "Insert Title",
      link: "#",
      description: "Grandprix Monaco F1",
      button: "Discover More",
    },
    {
      image: "http://via.placeholder.com/1280x700/ffff00/ffffff",
      title: "Insert Title",
      link: "#",
      description: "Tuan's Slider",
      button: "Discover More",
    },
    {
      image: "http://via.placeholder.com/1280x700/ff00ff/0000ff",
      title: "Insert Title",
      link: "#",
      description: "Dodo's Slider",
      button: "Discover More",
    },
  ],
};

export default withStyles(s, slickCarousel, slickCarouselTheme)(Slider);
