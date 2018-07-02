import React, { Fragment } from "react";
import cx from "classnames";
import Text from "../../../Primitives/Text";
import FixedRatioImage from "../../../Primitives/FixedRatioImage";
import SectionTitle from "../../../Layout/SectionTitle";
import Heading from "../../../Layout/Heading";

class JetDetailBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const data = this.props.data ? this.props.data : null;
    const post = this.props.post;
    const media = post && post.jet && post.jet.media ? post.jet.media.src : "";

    const category = data && data.category && data.category.name ? data.category.name : "-";
    const name = data && data.name ? data.name : "-";

    return (      
      <Fragment>
        {
          /* Desktop banner */
           media !== null ? (
            <div className="d-none d-md-block" style={{ paddingTop: `30%`, backgroundImage: `url(${media})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            </div>
           ) :
           (
            <div className="d-none d-md-block" style={{ paddingTop: `30%` }}>
            </div>
           ) 
        }        
        {
          /* Mobile banner */
           media !== null ? (
            <div className="d-md-none" style={{ paddingTop: `80%`, backgroundImage: `url(${media})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            </div>
           ) :
           (
            <div className="d-md-none" style={{ paddingTop: `30%` }}>
            </div>
           ) 
        }

        {/* <FixedRatioImage className="d-none d-md-block" ratio={0.3} image={{ src: media }} />        
        <FixedRatioImage className="d-md-none" ratio={0.8} image={{ src: media }} /> */}
        <div className={cx("container my-5")}>
          <div className="row">
            <div className="col">
              <SectionTitle defaultMessage={category} noHeader={true} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Heading text={name} hx={true}/>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default JetDetailBanner;
