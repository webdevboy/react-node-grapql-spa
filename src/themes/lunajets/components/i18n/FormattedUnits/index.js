import React from 'react';
import PropTypes from 'prop-types';
import Text from "../../Primitives/Text";

class FormattedUnit extends React.Component{

  static propTypes = {
    value: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

  }

  render(){
    const { value, id, unit } = this.props;

    if(unit == 'metric'){
      return <span style={{cursor: 'pointer'}}>{value} <Text id="client.formated-units.meters" defaultMessage="meters" /></span>
    }
    else if(unit == 'imperial'){
      const val = value / 0.3048;
      return <span style={{cursor: 'pointer'}}>{val.toFixed(1)}  <Text id="client.formated-units.ft" defaultMessage="ft" /></span>
    }
  }
}



export default FormattedUnit;
