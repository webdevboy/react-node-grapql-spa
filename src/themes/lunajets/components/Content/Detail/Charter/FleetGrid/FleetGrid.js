import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import Text from "../../../../Primitives/Text";
import Image from "../../../../Primitives/Image";
import Link from "../../../../Primitives/Link";
import CallToActionLink from "../../../../Primitives/CallToActionLink";
import LoadingSpinner from "../../../../Widgets/LoadingSpinner";
import s from "./FleetGrid.scss";
import getUrlFromPost from "utils/getUrlFromPost";


class FleetGrid extends React.Component {
  constructor(props) {
    super(props);
    this.showAll = this.showAll.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  showAll() {
    /*
    this.props.data.fetchMore({
      variables: {
        ...this.props.data.variables,
        offset: this.props.data.aircrafts.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => ({
        ...previousResult,
        aircrafts: [...previousResult.aircrafts, ...fetchMoreResult.aircrafts],
      }),
    });
    */
  }

  isThereMore() {
    //return this.props.data.aircrafts.length === 9;
  }

  scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  render() {

    // const aircrafts = [
    //   {
    //     id: '12344567',
    //     image:
    //       'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
    //     name: 'Aircraft 1',
    //     alt: 'test',
    //     title: 'test',
    //   },
    //   {
    //     id: '12344567',
    //     image:
    //       'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
    //     name: 'Aircraft 2',
    //     alt: 'test',
    //     title: 'test',
    //   },
    //   {
    //     id: '12344567',
    //     image:
    //       'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
    //     name: 'Aircraft 3',
    //     alt: 'test',
    //     title: 'test',
    //   },
    //   {
    //     id: '12344567',
    //     image:
    //       'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
    //     name: 'Aircraft 4',
    //     alt: 'test',
    //     title: 'test',
    //   },
    //   {
    //     id: '12344567',
    //     image:
    //       'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
    //     name: 'Aircraft 5',
    //     alt: 'test',
    //     title: 'test',
    //   },
    //   {
    //     id: '12344567',
    //     image:
    //       'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
    //     name: 'Aircraft 6',
    //     alt: 'test',
    //     title: 'test',
    //   },
    //   {
    //     id: '12344567',
    //     image:
    //       'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
    //     name: 'Aircraft 7',
    //     alt: 'test',
    //     title: 'test',
    //   },
    //   {
    //     id: '12344567',
    //     image:
    //       'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
    //     name: 'Aircraft 8',
    //     alt: 'test',
    //     title: 'test',
    //   },
    //   {
    //     id: '12344567',
    //     image:
    //       'https://www.toulouse-tourisme.com/sites/www.toulouse-tourisme.com/files/styles/incontournable_hp/public/thumbnails/image/incontournables_0.jpg',
    //     name: 'Aircraft 9',
    //     alt: 'test',
    //     title: 'test',
    //   },
    // ];

    // TODO: handling loading, error
    //const { aircrafts = [] } = this.props.data;
    // const buttonName =
    //   this.props.buttonName !== undefined
    //     ? this.props.buttonName
    //     : { defaultMessage: "Request a flight", id: "client.callToAction.requestAFlight" };
    // let btnShowAll = null;
    // if (false) {
    //   btnShowAll = (
    //     <div className={cx("col-md-4 col-12")}>
    //       <LoadingSpinner />
    //     </div>
    //   );
    // } else if (true) {
    //   btnShowAll = (
    //     <div className={cx("col-md-4 col-12")}>
    //       <div className={s["button-view-all-craft"]}>
    //         <a className={cx("btn btn-outline dk-blue")} onClick={this.showAll}>
    //           <Text defaultMessage="view all craft" id="client.callToAction.viewAllCraft" />
    //         </a>
    //       </div>
    //     </div>
    //   );
    // }

    const buttonName =
      this.props.buttonName !== undefined
        ? this.props.buttonName
        : { defaultMessage: "Request a flight", id: "client.callToAction.requestAFlight" };

    const { aircrafts, flyToValue, index, locale } = this.props;

    let data = undefined;
    if (flyToValue){
      data = {
        direction: "to",
        index: index,
        value: flyToValue,
      }
    }
    return (
      <div className={s["section-fleets"]}>
        <div className={cx("container")}>
          {/* [desktop only] */}
          {/* aircraft grid */}
          <div className={cx("row d-none d-sm-flex", s["fleet-container"])}>
            {aircrafts.map(aircraft => (
              <div className={cx("col-sm-4 col-12", s["fleet-infos"])} key={aircraft.id}>
                <Image
                  className={cx("jet_img", s["fleet-illustration"])}
                  source={aircraft.media.src}
                  alt={aircraft.title}
                  title={aircraft.title}
                />
                <div className={s["fleet-description"]}>
                  <div className={s["fleet-name"]}>
                    <Link to={`${getUrlFromPost(locale, aircraft)}`} className={cx(s.name, "jet_name")} text={aircraft.title} />                    
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* [mobile only] */}
          <div className={cx("row d-sm-none", s["fleet-container-mobile"])}>
            {aircrafts.map(aircraft => (
              <div className={cx("col-12", s["fleet-description"])} key={aircraft.id}>
                <div className={cx("row")}>
                  <div className={cx("col-6 pr-1", s["fleet-illustration"])}>
                    <Image source={aircraft.media.src} alt={aircraft.title} title={aircraft.title} className="jet_img" />
                  </div>
                  <div className={cx("col-6 pl-1", s["fleet-infos"])}>
                    <div className={s["fleet-name"]}>
                      <Link to={`${getUrlFromPost(locale, aircraft)}`} className={cx(s.name, "jet_name")} text={aircraft.title} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* buttons */}
          <div className={cx("row", "justify-content-around", s.buttons)}>
            {/* button view all craft */}
            <div className={cx("col-md-4 col-12")}>
              <div className={s["button-view-all-craft"]}>
                <Link elementId="view_all_jets" id="client.priviate.jet.charter.link.view.all.jets" to={`/fleet`} className={cx("btn btn-outline dk-blue")} text={`view all aircraft`} />
              </div>
            </div>
            {/* button request a flight */}
            <div className={cx("col-md-4 col-12")}>
              <div className={s["button-request-a-flight"]}>
                <CallToActionLink elementId="request_flight" className="btn dk-red" data={data} >
                  <Text defaultMessage={buttonName.defaultMessage} id={buttonName.id} />
                </CallToActionLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const queryAircrafts = gql`
  query($offset: Int, $limit: Int) {
    aircrafts: getAircrafts(offset: $offset, limit: $limit) {
      id
      
    }
  }
`;

const queryAircraftsByManufacturer = gql`
  query($manufacturer_slug: String, $offset: Int, $limit: Int) {
    aircrafts: getAircraftsByManufacturer(manufacturer_slug: $manufacturer_slug, offset: $offset, limit: $limit) {
      id
      
    }
  }
`;

const queryAircraftsByCategory = gql`
  query($category_slug: String, $offset: Int, $limit: Int) {
    aircrafts: getAircraftsByCategory(category_slug: $category_slug, offset: $offset, limit: $limit) {
      id
      
    }
  }
`;

const mapStateToProps = state => ({
  index: state.requestFlight.legs.length - 1,
  locale: state.intl.locale,
});

export const Aircrafts = connect(mapStateToProps, {})(withStyles(s)(
  graphql(queryAircrafts, {
    options: {
      variables: {
        offset: 0,
        limit: 9,
      },
      notifyOnNetworkStatusChange: true,
    },
  })(FleetGrid),
));

export const AircraftsByManufacturer = withStyles(s)(
  graphql(queryAircraftsByManufacturer, {
    options: ({ manufacturer_slug }) => ({
      variables: {
        manufacturer_slug,
        offset: 0,
        limit: 9,
      },
      notifyOnNetworkStatusChange: true,
    }),
  })(FleetGrid),
);

export const AircraftsByCategory = withStyles(s)(
  graphql(queryAircraftsByCategory, {
    options: ({ category_slug }) => ({
      variables: {
        category_slug,
        offset: 0,
        limit: 9,
      },
      notifyOnNetworkStatusChange: true,
    }),
  })(FleetGrid),
);

export default (withStyles(s)(FleetGrid));

export const component = {
  defaultProps: FleetGrid.defaultProps,
  propTypes: FleetGrid.propTypes,
  propSchema: FleetGrid.propSchema,
  category: "content",
  tags: ["aircraft", "list", "grid"],
};
