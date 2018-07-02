import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import Text from "../../../Primitives/Text";
import Image from "../../../Primitives/Image";
import Link from "../../../Primitives/Link";
import LoadingSpinner from "../../../Widgets/LoadingSpinner";
import s from "./PreferredFleets.scss";
import getUrlFromPost from "utils/getUrlFromPost";

class PreferredFleets extends React.Component {
  constructor(props) {
    super(props);
  }

  scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  render() {
    const { aircrafts, locale } = this.props;
  
    return (
      <div className={s["section-fleets"]}>
          <div className={cx("row d-flex", s["fleet-container"])}>
            {aircrafts.map(aircraft => (
              <div className={cx("col-sm-4 col-12", s["fleet-infos"])} key={aircraft.id}>
                <Image
                  className={cx("jet_img jet_name", s["fleet-illustration"])}
                  source={aircraft.media.src}
                  alt={aircraft.title}
                  title={aircraft.title}
                />
                <div className={s["fleet-description"]}>
                  <div className={s["fleet-name"]}>
                    <Link to={`${getUrlFromPost(locale, aircraft)}`} className={cx(s.name)} text={aircraft.title} />                    
                  </div>
                </div>
              </div>
            ))}
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
  locale: state.intl.locale,
});

const mapDispatchToProps = {};

export const Aircrafts = connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(
  graphql(queryAircrafts, {
    options: {
      variables: {
        offset: 0,
        limit: 9,
      },
      notifyOnNetworkStatusChange: true,
    },
  })(PreferredFleets),
));

export const AircraftsByManufacturer = connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(
  graphql(queryAircraftsByManufacturer, {
    options: ({ manufacturer_slug }) => ({
      variables: {
        manufacturer_slug,
        offset: 0,
        limit: 9,
      },
      notifyOnNetworkStatusChange: true,
    }),
  })(PreferredFleets),
));

export const AircraftsByCategory = connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(
  graphql(queryAircraftsByCategory, {
    options: ({ category_slug }) => ({
      variables: {
        category_slug,
        offset: 0,
        limit: 9,
      },
      notifyOnNetworkStatusChange: true,
    }),
  })(PreferredFleets),
));

export default (withStyles(s)(PreferredFleets));

export const component = {
  defaultProps: PreferredFleets.defaultProps,
  propTypes: PreferredFleets.propTypes,
  propSchema: PreferredFleets.propSchema,
  category: "content",
  tags: ["aircraft", "list", "grid"],
};
