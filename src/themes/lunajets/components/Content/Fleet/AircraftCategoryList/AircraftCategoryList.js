import React from "react";
import cx from "classnames";
import SlickSlider from "react-slick";

import Text from "../../../Primitives/Text";
import Image from "../../../Primitives/Image";
import SectionTitle from "../../../Layout/SectionTitle";
import AircraftCategory from "../AircraftCategory";

import s from "./AircraftCategoryList.scss";

class AircraftCategoryList extends React.Component {
  state = {};
  render() {
    const categories = this.props.categories;
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
            <SectionTitle textId="client.fleet.aircraftCategory.sectionTitle" defaultMessage="aircraft categories" hx={true} />
          </div>
        </div>
        <div className="row my-5 d-sm-flex d-none">
          {
            categories.map((category, index) =>
              <div key={`category-${index}-box`} className={cx("col-sm-4 col-12 p-0")}>
                <AircraftCategory category={category} mobile={false} top={(index < 3) ? true : false} left={(index+1) % 3 === 1 ? true : false} id={`aircraft-category-${index}`}/>
              </div>
            )
          }
        </div>
        <div className="d-sm-none d-block my-5">
          <SlickSlider {...sliderSettings}>
            {categories.map((category, index) =>
              <div key={`category-${index}-box`}>
                <AircraftCategory category={category} top={true} left={true} mobile={(index+1) % 2 === 1 ? true : false} id={`aircraft-catefory-ads-${index}`}/>
              </div>
            )}
          </SlickSlider>
        </div>
      </div>
    )
  }
}

export default AircraftCategoryList;
