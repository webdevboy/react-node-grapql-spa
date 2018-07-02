import React from "react";
import _ from "lodash";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import JetDetailBanner from "../JetDetailBanner";
import JetDetailCarrousel from "../JetDetailCarrousel";
import JetDetailCabin from "../JetDetailCabin";
import JetDetailMapAircraft from "../JetDetailMapAircraft";
import Slider from "themes/lunajets/components/Widgets/Slider";
import getSFAircraftModel from "./getSFAircraftModel.graphql";
import getMediaByIds from "./getMediaByIds.graphql";
import getDataForAircraftDetails from "./getDataForAircraftDetails.graphql";
import { graphql } from "react-apollo";
import Coverflow from "themes/lunajets/components/Widgets/Coverflow";

class JetDetail extends React.Component {
  static contextTypes = {
    fetch: true,
    client: true
  };

  constructor(props) {
    super(props);
    this.state = {
      aircraftModel: undefined,
      photos: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.sfAircraftModel && nextProps.data.media) {
      this.setState({
        aircraftModel: nextProps.data.sfAircraftModel,
        photos: nextProps.data.media
      });
    }
  }

  render() {
    const { photos, aircraftModel } = this.state;
    let slides = [];
    if (photos && photos.length > 0) {
      photos.forEach(photo => {
        slides.push({ image: photo.src, description: photo.filename });
      });
    }
    return (
      <div>
        <JetDetailBanner data={aircraftModel} post={this.props.post} />
        <JetDetailCarrousel data={aircraftModel} post={this.props.post} />
        {/*For Desktop*/ slides.length > 0 && <Coverflow className="d-none d-md-flex" slides={slides} />}
        {/*For Mobile*/ slides.length > 0 && <Slider className="d-md-none" slides={slides} removeDiscover={true} />}
        <JetDetailCabin data={aircraftModel} meta={this.props.post && this.props.post.jet && this.props.post.jet.meta} />
        <JetDetailMapAircraft data={aircraftModel} />
      </div>
    );
  }
}

export default graphql(getDataForAircraftDetails, {
  options: ownProps => ({
    variables: {
      listId: ownProps.post.jet.meta.aircraft_gallery,
      sfid: ownProps.post.jet.meta.aircraft_sfid
    },
    notifyOnNetworkStatusChange: true
  })
})(JetDetail);
