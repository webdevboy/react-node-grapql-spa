import React, { Component } from "react";
import ReactDOM from "react-dom";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Coverflow.css";

const PLANE_WIDTH = 580;
const DIST_PER_PLANE = 150;
const SCALE_RATIO = 0.11;
const OPACITY_RATIO = 0.25;
let current = 1;

class Coverflow extends Component {
  constructor(props) {
    super(props);
    const { slides } = this.props;
    this.state = {
      totalCount: slides.length,
      center: slides.length >> 1,
    };
  }

  renderCoverflow = current => {
    const { slides } = this.props;
    const { totalCount, center } = this.state;
    const ids = this.prepareIds(totalCount, current);
    ids.forEach((idx, i) => {
      const dist = Math.abs(i - center);
      const offset = (i - center) * DIST_PER_PLANE - (PLANE_WIDTH >> 1);
      const scale = 1 - dist * SCALE_RATIO;
      const opacity = 1 - dist * OPACITY_RATIO;

      // figure
      const figure = $("#coverflow > figure").eq(idx);
      const styleFig = {
        zIndex: (totalCount - dist) * 10,
        transform: `translate(${offset}px) scale(${scale})`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      };
      figure.css(styleFig);

      // image in figure
      const figureImg = $("#coverflow > figure > img").eq(idx);
      const styleImg = {
        opacity: `${opacity}`,
      };
      figureImg.css(styleImg);
    });
  };

  prepareIds = (count, current) => {
    const center = count >> 1;
    const rot = current > center ? current - center : count - center + current;
    return this.rotateArray(Array.apply(null, { length: count }).map(Number.call, Number), rot);
  };

  rotateArray = (arr, n) => {
    return arr.slice(n, arr.length).concat(arr.slice(0, n));
  };

  componentDidMount = () => {
    const { totalCount, center } = this.state;
    $("#coverflow").click(() => {
      current += 1;
      if (current >= totalCount) current -= totalCount;
      this.renderCoverflow(current);
    });
    this.renderCoverflow(current);
  };

  render() {
    const { slides } = this.props;
    return (
      <div className={cx(s["coverflow"], this.props.className)}>
        <div className={s.coverFlowWrapper}>
          <div id="coverflow" className={s.slide}>
            {slides.length &&
              slides.map((slide, index) => (
                <figure key={`coverflow-id-${index}`}>
                  <img src={`${slide.image}`} alt={slide.description} />
                </figure>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Coverflow);
