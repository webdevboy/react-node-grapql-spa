import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import Link from "../../../Primitives/Link";
import EmptyLegLink from "../../../Primitives/EmptyLegLink";
import Slider from "react-slick";
import ArrowRight from "react-feather/dist/icons/arrow-right";
import history from "core/history";
import s from "./NearbyEmptyLegs.css";
import getEmptyLegsNearbyDeparture from "./queryNearbyEmptyLegs.graphql";
import fetchAllEmptyLegs from "./fetchAllEmptyLegs.graphql";
import { graphql } from "react-apollo";
import FormattedCurrency from '../../../i18n/FormattedCurrency';

const EmptyLeg = inEmptyleg => {
  const slug = inEmptyleg.parentSlug;
  const emptyleg = inEmptyleg.emptyleg;
  const fromAirport = emptyleg.from_airport;
  const toAirport = emptyleg.to_airport;

  moment.locale(inEmptyleg.locale);
  const fromDate = moment(emptyleg.from_date, ["YYYY-MM-DDTHH:mm:ss.SSS"]);
  const toDate = moment(emptyleg.until_date, ["YYYY-MM-DDTHH:mm:ss.SSS"]);
  var fromCityName = fromAirport.city["name_" + inEmptyleg.locale];
  if (fromCityName === undefined) {
    fromCityName = fromAirport.city.name;
  }
  var toCityName = toAirport.city["name_" + inEmptyleg.locale];
  if (toCityName === undefined) {
    toCityName = toAirport.city.name;
  }

  return (
    <EmptyLegLink
      emptyLegId={emptyleg.id}
      cityFrom={emptyleg.from_airport.city}
      cityTo={emptyleg.to_airport.city}
      className={s.emptyleg}
    >
      <div className={s.relevant}>
        <div className={s.flyfrom}>
          <div className={s.iata}>{fromAirport.iata}</div>
          <div className={s.location}>
            <i className={`famfamfam-flags ${fromAirport.city.country.countryCode}`} />
            <span>
              {fromCityName}, {fromAirport.city.country.countryCode.toUpperCase()}
            </span>
          </div>
        </div>
        <div className={s.flyto}>
          <div className={s.iata}>{toAirport.iata}</div>
          <div className={s.location}>
            <i className={`famfamfam-flags ${toAirport.city.country.countryCode}`} />
            <span>
              {toCityName}, {toAirport.city.country.countryCode.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      <div className={s.seperator} />
      <div className={s.info}>
        <div className={s.from}>
          <div className={s.label}>
            <Text defaultMessage="from" id="client.home.emptylegs.from" />
          </div>
          <div className={s.date}>{fromDate.format("ddd, D MMM YYYY")}</div>
        </div>
        <div className={s.until}>
          <div className={s.label}>
            <Text defaultMessage="until" id="client.home.emptylegs.until" />
          </div>
          <div className={s.date}>{toDate.format("ddd, D MMM YYYY")}</div>
        </div>
      </div>
      <div className={s["more-info"]}>
        <div className={s.label}>Falcon 9X</div>
        <div className={s.pricebox}>
          <span className={s.price}>
            <FormattedCurrency value={emptyleg.price} currency={emptyleg.currency.currency} />
          </span>
          <ArrowRight color="#3E5970" />
        </div>
      </div>
    </EmptyLegLink>
  );
};

class NearbyEmptyLegs extends React.Component {
  static propTypes = {
    search: PropTypes.bool,
  };

  static contextTypes = {
    fetch: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    let newState = {
      emptyLegs: [],
      parentSlug: "empty-legs-flights",
    };
    this.state = newState;
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    let newState = this.state;
    if (nextProps.data.emptylegs && nextProps.data.emptylegs.length > 0) {
      newState.emptyLegs = nextProps.data.emptylegs;
      // Get parent slug
      if (nextProps.data.posts && nextProps.data.posts.length > 0) {
        newState.parentSlug = nextProps.data.posts[0].slug;
      }
      this.setState(newState);
    }
  }
  render() {
    const { children, classnames, id , locale} = this.props;
    const { loc, city, region, country } = this.props.ipInfo;
    const { emptyLegs, parentSlug } = this.state;

    let validEmptyLeg = true;

    if (emptyLegs && emptyLegs.length === 3) {
      emptyLegs.map(emptyLeg => {
        if (!emptyLeg.from_airport || !emptyLeg.from_airport.city || !emptyLeg.from_airport.city.country ||
            !emptyLeg.to_airport || !emptyLeg.to_airport.city || !emptyLeg.to_airport.city.country) {
              validEmptyLeg = false;
            }
      });
    } else {
      validEmptyLeg = false;
    }

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
      <div className={cx("container-fluid", s.root)}>
        <div ref="circle" className={s.circlesWrapper}>
          <div className={cx(s.circle, s.animated, s.fadeIn, s.infinite)} />
          <div className={cx(s.circle, s.animated, s.fadeIn, s.infinite)} />
          <div className={cx(s.circle, s.animated, s.fadeIn, s.infinite)} />
          <div className={cx(s.circle, s.animated, s.fadeIn, s.infinite)} />
          <div className={cx(s.circle, s.animated, s.fadeIn, s.infinite)} />
        </div>

        <div className="container my-5">
          <div className="row">
            <div className="col">
              <h2 className={`section-title lt-blue`}>
                <Text defaultMessage="Empty Legs" id="client.home.emptylegs" />
              </h2>
              <strong className={"section-heading-1 section-heading white"}>
                <Text defaultMessage="Find Nearby Opportunities" id="client.home.emptylegs.nearby" />
              </strong>
            </div>
          </div>
          <div className="row d-none d-md-flex">
            <div className="col d-flex flex-column">
              {city ? [<span className={s.geolocation}>
                <Text defaultMessage="Near " id="client.home.emptylegs.near" suffixMessage={`${city}, ${region} - ${country}`}/></span>] : <span />}
            </div>
          </div>

          {/* desktop */}
          {validEmptyLeg
            ? [
                <div className={cx("row d-none d-md-flex", s["emptylegs-row"])}>
                  <div className="col-lg-4 mt-5">
                    <EmptyLeg emptyleg={emptyLegs[0]} parentSlug={parentSlug} locale={locale}/>
                  </div>
                  <div className="col-lg-4 mt-5">
                    <EmptyLeg emptyleg={emptyLegs[1]} parentSlug={parentSlug} locale={locale}/>
                  </div>
                  <div className="col-lg-4 mt-5">
                    <EmptyLeg emptyleg={emptyLegs[2]} parentSlug={parentSlug} locale={locale}/>
                  </div>
                </div>,
              ]
            : null}

          {/* mobile */}
          {validEmptyLeg
            ? [
                <div className={cx("d-md-none my-5", s["emptylegs-row-mobile"])}>
                  <Slider {...settings}>
                    <div>
                      <EmptyLeg emptyleg={emptyLegs[0]} parentSlug={parentSlug} />
                    </div>
                    <div>
                      <EmptyLeg emptyleg={emptyLegs[1]} parentSlug={parentSlug} />
                    </div>
                    <div>
                      <EmptyLeg emptyleg={emptyLegs[2]} parentSlug={parentSlug} />
                    </div>
                  </Slider>
                </div>,
              ]
            : null}

          <div className="row">
            <div className="col d-flex justify-content-center">
              <Link
                to="#"
                className={"btn btn-outline btn-block white conduit"}
                text="VIEW ALL LEGS"
                id="client.home.emptylegs.viewAll"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let coordinate = [undefined, undefined];
  if (state.ipInfo && state.ipInfo.loc) {
    coordinate = state.ipInfo.loc.split(",");
  }

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
    ipInfo: state.ipInfo,
    coordinate: coordinate,
    locale: currentLocale,
    language_id: language_id,
  };
};

export default connect(mapStateToProps)(
  withStyles(s)(
    graphql(getEmptyLegsNearbyDeparture, {
      options: ownProps => ({
        variables: {
          lat: ownProps.coordinate[0],
          long: ownProps.coordinate[1],
          limit: 3,
          language_id: ownProps.language_id,
          template: "empty-legs",
        },
        notifyOnNetworkStatusChange: true,
      }),
    })(NearbyEmptyLegs)
  )
);
