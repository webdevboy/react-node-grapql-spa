import React from "react";
import cx from "classnames";
import SlickSlider from "react-slick";

import Image from "../../../Primitives/Image";
import SectionTitle from "../../../Layout/SectionTitle";
import AircraftManufacture from "../AircraftManufacture";

class AircraftManufactureList extends React.Component {
  state = {};
  render() {
    const manufacturers = this.props.manufacturers;
    const sliderSettings = {
      dots: true,
      arrows: false,
      slidesToScroll: 2,
      slidesToShow: 2,
    };

    return (
      <div className="container">
        <div className="row my-5">
          <div className="col">
            <SectionTitle textId="client.fleet.manufacturers.sectionTitle" defaultMessage="MANUFACTURERS" hx={true} />
          </div>
        </div>
        <div className="row my-5 d-sm-flex d-none">
          {
            manufacturers.map((manufacture, index) =>
              <div key={`manufacture-${index}-box`} className={cx("col-sm-4 col-12 p-0")}>
                <AircraftManufacture manufacture={manufacture} mobile={false} top={(index < 3) ? true : false} left={(index+1) % 3 === 1 ? true : false}/>
              </div>
            )
          }
        </div>
        <div className="d-sm-none d-block my-5">
          <SlickSlider {...sliderSettings}>
            {manufacturers.map((manufacture, index) =>
              <div key={`manufacture-${index}-box`}>
                <AircraftManufacture manufacture={manufacture} top={true} left={true} mobile={(index+1) % 2 === 1 ? true : false}/>
              </div>
            )}
          </SlickSlider>
        </div>
      </div>
    )
  }
}

export default AircraftManufactureList;
