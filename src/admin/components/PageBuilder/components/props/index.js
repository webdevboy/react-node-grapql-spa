import React, { Component } from 'react'
import ArrayType from '../props/Array';
// import ColorType from '../props/Color';
import EnumType from '../props/Enum';
import ImageType from '../props/Image';
import Types from "../../types";

const VisualType = (props) => {
  if (!props.prop) return null

  switch (type) {
    // case Types.COLOR:
      // return <ColorType {...props} />
    case Types.ENUM:
      return <EnumType {...props} />
    case Types.IMAGE:
      return <ImageType {...props} />
    case Types.ARRAY:
      return <ArrayType {...props} />
    default:
      return null
  }
}

class PropertyType extends Component {
  constructor() {
    
  }

  renderChild = () => {}

  render() {
    const { schema } = this.props;
    return Object.keys(propSchema).length && Object.keys(propSchema).map(typeKey =>
      this.renderProperty(propSchema[typeKey], typeKey)
      // sends eg: { 'backgroundColor': Type.COLOR }, 'style'
    )
  }
}

export default PropertyType