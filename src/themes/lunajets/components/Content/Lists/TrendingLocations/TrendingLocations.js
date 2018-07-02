import React, { Component, Fragment } from "react";
import _ from "lodash";
import cx from "classnames";
import moment from "moment";
import { Query } from "react-apollo";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./TrendingLocations.scss";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { FormattedDate } from "react-intl";
import Slider from "react-slick";
import gql from "graphql-tag";
import LoadingSpinner from "../../../Widgets/LoadingSpinner";
import Text from "../../../Primitives/Text";
import Link from "../../../Primitives/Link";
import WrapperLink from "../../../Primitives/WrapperLink";
import moscow from "./gfx/moscow.png";
import kualalumpur from "./gfx/kuala-lumpur.png";
import london from "./gfx/london.png";
import londonhd from "./gfx/london-hd.jpg";

const QUERY = gql`
  query($language_id: ID, $locale: String) {
    trendingLocations: getTrendingLocation(language_id: $language_id, locale: $locale) {
      cityName
      pathUrl
      teaser
      image_id
      image_src
      events
    }
  }
`;

class TrendingLocations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: null,
    };
  }

  componentDidMount() {}

  renderMonth = month => {
    if (month) {
      const thisYear = new Date().getFullYear();
      return <FormattedDate value={new Date(thisYear, month, 1)} month="long" />;
    }
  };

  render() {
    const { city } = this.state;
    const { classnames, id, language_id, locale } = this.props;

    const containerStyle = location => {
      return {
        backgroundImage: `linear-gradient(-180deg, #3e59707d 0%, #3e59709c 53%, #3e5970cf 70%, #3e5970 90%, #3e5970 100%), linear-gradient(-180deg, #00000080 0%, #00000075 4%, #fff0 39%, #fff0 99%), url(${
          city ? city.image_src : location.image_src
        })`,
      };
    };

    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      variableWidth: false,
      cssEase: "ease",
      rtl: false,
      lazyLoad: true,
      draggable: false,
      touchMove: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <Query
        query={QUERY}
        variables={{ language_id: language_id, locale: locale }}
        fetchPolicy="cache-and-network"
        notifyOnNetworkStatusChange
      >
        {({ loading, data, refetch, error }) => {
          if (loading) return <LoadingSpinner />;
          if (error) return error.message;
          const { trendingLocations } = data;
          if (!trendingLocations || !trendingLocations.length) {
            return null;
          }
          return (
            <div
              className={cx("container-fluid", s.main, s.animated, s.fadeIn)}
              style={containerStyle(trendingLocations[0])}
            >
              <div className="container lj-pad-y-50">
                <div className="row">
                  <div className="col">
                    <h2 className={`section-title lt-blue`}>
                      <Text defaultMessage="Trending Locations" id="client.home.trendingLocations" />
                    </h2>
                    <strong className={"section-heading-1 section-heading white"}>
                      <Text
                        defaultMessage="Trending locations & Future Events"
                        id="client.home.trendingLocationsFutureEvents"
                      />
                    </strong>
                  </div>
                </div>

                {/* desktop */}
                <div className="row pt-5 d-none d-md-flex">                  
                  {trendingLocations.map(location => (
                    <div className="col-lg-4">
                      <div className={s.trendingLocation} onMouseEnter={() => this.setState({ city: location })}>
                        <img src={location.image_src} alt={location.cityName} title={location.cityName} className="rounded" />
                        <p className={cx(s.detail, "conduit")}>
                          <WrapperLink pathUrl={location.pathUrl}>
                            <h4>{location.cityName}</h4>
                          </WrapperLink>
                          <p>{location.teaser}</p>
                        </p>
                      </div>
                      <div className={cx(s.events, "conduit")}>
                        <h4><Text defaultMessage="Next events" id="client.home.trendingLocations.nextEvents"/></h4>
                        <ul className={s.eventlist}>
                          {location.events &&
                            Object.keys(location.events).map((key, index) => {
                              return (
                                <Fragment>
                                  <li className={s.month}>{this.renderMonth(key)}</li>
                                  {location.events[key].map(event => (
                                    <li className={s.event}>
                                      <div>
                                        <WrapperLink pathUrl={event.pathUrl}>
                                          <span className={s.title}>{event.title}</span>
                                        </WrapperLink>
                                        <span className={s.date}>{moment(event.date).format("ddd, D MMM YYYY")}</span>
                                      </div>
                                    </li>
                                  ))}
                                </Fragment>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* mobile */}
                <div className={cx("d-md-none my-5", s["trending-row-mobile"])}>
                  <Slider {...settings}>
                    {trendingLocations.map(location => (
                      <div>
                        <div className={s.trendingLocation} onMouseEnter={() => this.setState({ city: location })}>
                          <WrapperLink pathUrl={location.pathUrl}>
                            <img src={location.image_src} className="rounded" />
                          </WrapperLink>
                          <p className={cx(s.detail, "conduit")}>
                            <WrapperLink pathUrl={location.pathUrl}>
                              <h4>{location.cityName}</h4>
                            </WrapperLink>
                            <span>{location.teaser}</span>                            
                          </p>
                        </div>
                        <div className={cx(s.events, "conduit")}>
                          <h4><Text defaultMessage="Next events" id="client.home.trendingLocations.nextEvents"/></h4>
                          <ul className={s.eventlist}>
                            {location.events &&
                              Object.keys(location.events).map((key, index) => {
                                return (
                                  <Fragment>
                                    <li className={s.month}>{this.renderMonth(key)}</li>
                                    {location.events[key].map(event => (
                                      <li className={s.event}>
                                        <div>
                                          <WrapperLink pathUrl={event.pathUrl}>
                                            <span className={s.title}>{event.title}</span>
                                          </WrapperLink>
                                          <span className={s.date}>{moment(event.date).format("ddd, D MMM YYYY")}</span>
                                        </div>
                                      </li>
                                    ))}
                                  </Fragment>
                                );
                              })}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>

                <div className="row">
                  <div className="col d-flex justify-content-center">
                    <Link
                      to="#"
                      className={"btn btn-outline white conduit"}
                      text="EXPLORE DESTINATIONS"
                      id="client.home.reviews.exploreDestinations"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = state => {
  const currentLocale = state.intl.locale;
  const availableLocales = state.runtime.availableLocales;
  let language_id = false;

  for (var key in availableLocales) {
    if (availableLocales.hasOwnProperty(key)) {
      if (availableLocales[key].locale === currentLocale) {
        language_id = availableLocales[key].id;
      }
    }
  }
  return {
    language_id: language_id,
    locale: currentLocale,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(TrendingLocations));
