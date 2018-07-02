import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import * as FontAwesome from "react-icons/lib/fa";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import SlickSlider from "react-slick";
import slickCarousel from "slick-carousel/slick/slick.css";
import slickCarouselTheme from "slick-carousel/slick/slick-theme.css";

import { paragraph } from "mock";
import Page from "client/components/Page";
import Heading from "components/Layout/Heading";
import Text from "components/Primitives/Text";
import Button from "components/Primitives/Button";
import Image from "components/Primitives/Image";
import FixedRatioImage from "components/Primitives/FixedRatioImage";
import Search from "components/Widgets/Search";
import DropdownMenu from "components/Widgets/DropdownMenu";
import AircraftModel from "components/Content/Fleet/AircraftModel";
import SectionTitle from "components/Layout/SectionTitle";
import Video from "components/Primitives/Video";
import video from "../../home/gfx/big_buck_bunny.mp4";
import LoadingSpinner from "components/Widgets/LoadingSpinner";

import s from "./Fleet.scss";

class Fleet extends React.Component {
  getCategories() {
    const { categories } = this.props.data;
    return categories ? categories.map(category => category.name) : [];
  }
  getManufacturers() {
    const { manufacturers } = this.props.data;
    return manufacturers ? manufacturers.map(manufacturer => manufacturer.name) : [];
  }
  loadAllAircrafts = () => {
    this.props.data.refetch({
      offset: 0,
      limit: undefined,
    });
  };
  render() {
    const { aircrafts } = this.props.data;
    const categories = [0, 1, 2, 3, 4, 5];
    const getDesktopBorderClass = (total, columnPerRow, index) => {
      const maxRow = Math.ceil(total / columnPerRow);
      const row = Math.floor(index / columnPerRow);
      const column = index % columnPerRow;
      let className = "border-secondary";
      if (column !== columnPerRow - 1) {
        className += " border-right";
      }
      if (row !== maxRow - 1) {
        className += " border-bottom";
      }
      return className;
    };
    const getMobileBorderClass = index => {
      let className = "border-secondary";
      if (index % 2 === 0) {
        className += " border-right";
      }
      return className;
    };
    const sliderSettings = {
      dots: true,
      arrows: false,
      slidesToScroll: 2,
      slidesToShow: 2,
    };
    return (
      <Page template="Default">
        <FixedRatioImage ratio={0.3} image={{ src: "https://s3-eu-west-1.amazonaws.com/upgrade-it-lab/AIRCR.png" }} />
        <div className={cx("container my-5")}>
          <div className="row">
            <div className="col">
              <SectionTitle textId="fleet" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Heading textId="page.fleet.heading" />
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("col")}>
              <p>
                <Text id="page.fleet.paragraph" defaultMessage="paragraph" />
              </p>
            </div>
          </div>
          <div className="row my-5">
            <div className="col-sm-6 col-12 mb-3">
              <Search />
            </div>
            <div className="col-sm-3 col-6 pr-1">
              <DropdownMenu options={this.getCategories()} placeholderId="text.category" />
            </div>
            <div className="col-sm-3 col-6 pl-1">
              <DropdownMenu options={this.getManufacturers()} placeholderId="text.manufacturer" />
            </div>
          </div>
          <div className="row my-5">
            {aircrafts &&
              aircrafts.map(aircraft => (
                <div className="col-sm-4 col-12 my-3" key={aircraft.id}>
                  <AircraftModel data={aircraft} />
                </div>
              ))}
          </div>
          <div className="row justify-content-center mb-5">
            <div className="col-sm-4">
              {this.props.data.loading ? (
                <LoadingSpinner />
              ) : (
                <Button
                  className="btn btn-outline-primary w-100"
                  textId="client.fleet.viewMoreAircrafts"
                  onClick={this.loadAllAircrafts}
                />
              )}
            </div>
          </div>
        </div>
        <div className="container-fluid bg-primary my-5 py-5 position-relative">
          <div className="container">
            <div className="row">
              <div className="col">
                <SectionTitle textId="jet comparator" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-12">
                <div className="row">
                  <div className="col">
                    <h1 className="uppercase text-white">
                      <Text id="compare jets" defaultMessage="compare jets" />
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p className="text-white">
                      <Text id="id" defaultMessage={paragraph} />
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-12">
                <Video border source={video} />
              </div>
              <div className="col-sm-6 col-12 mt-3">
                <Button className="btn btn-outline-light w-100" textId="client.fleet.goToJetComparator" />
              </div>
            </div>
            <div className={cx(s["plane-left"])}>
              <FontAwesome.FaPlane size="30vw" fill="none" stroke="white" strokeWidth="0.2" />
            </div>
            <div className={cx(s["plane-right"])}>
              <FontAwesome.FaPlane size="10vw" fill="none" stroke="white" strokeWidth="1" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row my-5">
            <div className="col">
              <SectionTitle textId="fleet.sectionTitle.aircraftCategories" />
            </div>
          </div>
          <div className="row my-5 d-sm-flex d-none">
            {categories.map(index => (
              <div key={index} className={cx("col-sm-4", getDesktopBorderClass(categories.length, 3, index))}>
                <Image source="https://s3-eu-west-1.amazonaws.com/upgrade-it-lab/LJ_longrangejet.svg" />
              </div>
            ))}
          </div>
          <div className="d-sm-none d-block my-5">
            <SlickSlider {...sliderSettings}>
              {categories.map(index => (
                <div key={index} className={cx(getMobileBorderClass(index))}>
                  <Image source="https://s3-eu-west-1.amazonaws.com/upgrade-it-lab/LJ_longrangejet.svg" />
                </div>
              ))}
            </SlickSlider>
          </div>
          <div className="row my-5">
            <div className="col">
              <SectionTitle textId="fleet.sectionTitle.aircraftManufacturers" />
            </div>
          </div>
          <div className="row my-5 d-sm-flex d-none">
            {categories.map(index => (
              <div className={cx("col-sm-4", getDesktopBorderClass(categories.length, 3, index))}>
                <FixedRatioImage
                  ratio={0.6}
                  image={{ src: "https://s3-eu-west-1.amazonaws.com/upgrade-it-lab/Bombardier.png" }}
                />
              </div>
            ))}
          </div>
          <div className="my-5 d-sm-none d-block">
            <SlickSlider {...sliderSettings}>
              {categories.map(index => (
                <div key={index} className={cx(getMobileBorderClass(index))}>
                  <FixedRatioImage
                    ratio={0.6}
                    image={{ src: "https://s3-eu-west-1.amazonaws.com/upgrade-it-lab/Bombardier.png" }}
                  />
                </div>
              ))}
            </SlickSlider>
          </div>
        </div>
      </Page>
    );
  }
}

const getAircrafts = gql`
  query($offset: Int, $limit: Int) {
    aircrafts: getAircrafts(offset: $offset, limit: $limit) {
      id
      media {
        src
      }
      model {
        name
        seats
        speed
        range
      }
    }
    categories: getSFAircraftsCategories {
      sfid
      name
    }
    manufacturers: getSFAircraftManufacturers {
      sfid
      name
    }
  }
`;

const componentWithStyles = withStyles(s, slickCarousel, slickCarouselTheme)(Fleet);
const componentWithGraphQL = graphql(getAircrafts, {
  options: {
    variables: {
      offset: 0,
      limit: 12,
    },
    notifyOnNetworkStatusChange: true,
  },
})(componentWithStyles);

export default componentWithGraphQL;
