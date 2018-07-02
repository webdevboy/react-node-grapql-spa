import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from "classnames";
import SectionTitle from "themes/lunajets/components/Layout/SectionTitle";
import Destination from '../../../Destination/Destination';
import Button from "themes/lunajets/components/Primitives/Button";
import Text from "themes/lunajets/components/Primitives/Text";
import { connect } from "react-redux";
import {
  showSearch,
} from "../../../../../actions/navbar";
import s from "./JetCostDestinations.scss";

class JetCostDestinations extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick = () => {
    this.props.showSearch(true);
  }

  render() {
    const {destinations} = this.props;
    return   (<div className="container lj-pad-y-50">
    {destinations && destinations.length && (<h2>
      <Text
        className={cx("text-secondary uppercase", s["section-title1"])}
        id="Other destinations"
        defaultMessage="Other destinations"
      />
    </h2>)}
    <div className="row py-5">
      {destinations.map((dest, i) =>
        <Destination
          key={`jcd-${i}`}
          data={dest}
        />
      )}
    </div>

    <div className="text-center">
      <Button
        className="btn-outline-primary w-100"
        defaultMessage="Looking for another city ?"
        textId="client.jetCostDestination.lookingForOtherCity"
        onClick={this.onClick}
      />
    </div>
  </div>)
  }
}
JetCostDestinations.propTypes = {
  destinations: PropTypes.array
}

JetCostDestinations.defaultProps = {
  destinations: []
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch) => ({
  showSearch: (status) => dispatch(showSearch(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(JetCostDestinations));