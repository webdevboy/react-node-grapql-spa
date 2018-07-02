import React from "react";
import PropTypes from "prop-types";
import BuilderTypes from "../../../admin/components/PageBuilder/types";

class Image extends React.Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
  };

  render() {
    const { source, width, height, alt, title, className } = this.props;
    return <img className={className} src={source} width={width} height={height} alt={alt} title={title} />;
  }
}

Image.defaultProps = {
  source: undefined,
  width: undefined,
  height: undefined,
  alt: undefined,
  title: undefined,
};

Image.propSchema = {
  source: BuilderTypes.URL,
  width: BuilderTypes.TEXT,
  height: BuilderTypes.TEXT,
  alt: BuilderTypes.TEXT,
  title: BuilderTypes.TEXT,
};

export default Image;

export const component = {
  defaultProps: Image.defaultProps,
  propTypes: Image.propTypes,
  propSchema: Image.propSchema,
  category: "primitive",
  tags: ["image", "img", "src"],
};
