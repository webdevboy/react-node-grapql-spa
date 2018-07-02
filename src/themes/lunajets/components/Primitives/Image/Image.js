import React from "react";
import PropTypes from "prop-types";

class Image extends React.Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
    maxWidth: PropTypes.string,
    maxHeight: PropTypes.string,
  };

  render() {
    const { source, width, height, alt, title, className, maxWidth, maxHeight } = this.props;
    return <img className={className} src={source} width={width} height={height} alt={alt} title={title} style={{maxWidth: maxWidth, maxHeight: maxHeight}} />;
  }
}

Image.defaultProps = {
  source: undefined,
  width: undefined,
  height: undefined,
  alt: undefined,
  title: undefined,
  maxWidth: undefined,
  maxHeight: undefined,
};

export default Image;