import React, { Component } from "react";
import { FormattedDate } from "react-intl";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import s from "./EventsList.css";
import cx from "classnames";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import history from "core/history";
import Image from "../../../Primitives/Image";
import Text from "../../../Primitives/Text";
import LoadingSpinner from "../../../Widgets/LoadingSpinner";
import _ from "lodash";
import ArrowRight from "react-feather/dist/icons/arrow-right";
import queryGetEventsForEvergreen from "./queryGetEventsForEvergreen.graphql";
import getUrlFromPost from "utils/getUrlFromPost";

class EventsList extends Component {
  constructor(props) {
    super(props);
	  const { data } = props;
    this.handleDiscoverMore = this.handleDiscoverMore.bind(this);
	  this.state = {
      posts: [],
      display: 1,
   };
  }

  componentWillReceiveProps(nextProps) {
	let newState = this.state;
    newState.posts = nextProps.data.posts;
    if (newState.posts.length > 2) {
      newState.display = 1;
    } else {
      newState.display = 0;
    }
    this.setState(newState);
  }

  componentDidMount() {
  }

  async handleDiscoverMore() {

	  this.props.data.fetchMore({
      variables: {
        type: "event",
        language_id: this.props.language_id,
        published: true,
        pagination: { offset: this.state.posts.length, limit: 4 },
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
		  let eventsFiltered = [];
      let displayValue = 1;

      if (fetchMoreResult.posts.length === 4) {
        eventsFiltered = fetchMoreResult.posts.slice(0, 3);
      } else {
        displayValue = 0;
        eventsFiltered = fetchMoreResult.posts;
      }

      let posts = this.state.posts.concat(eventsFiltered);
      this.setState({
        posts: posts,
		    display: displayValue
      });
      },
    });
  }

  render() {
	if (this.props.data.loading) {
      return (<LoadingSpinner />)
    }

    const posts = this.state.posts;
    const displayValue = this.state.display;

    return (
      <div className={s["section-events"]}>
        <div className={cx("container")}>
          {/* title */}
          <div className={cx("row")}>
            <div className={cx("col")}>
              <h2 className={`${s["events-title"]} section-title lt-blue`}>
                <Text defaultMessage="upcoming events" id="client.evergreen.upcomingEvents.title" />
              </h2>
            </div>
          </div>
          {/* event list */}
          <div className={cx("row ml-0", s["events-container"])}>
            {posts.map(event => (
              <div className={cx("col-12 col-sm-4 pl-0", s["event-description"])} key={event.id}>
                {event.media ? (
                  <Image
                    className={s["event-illustration"]}
                    source={event.media.src}
                    alt={event.media.filename}
                    title={event.media.filename}
                    height="150px"
                    width="150px"
                  />
                ) : null}
                <div className={s["event-infos"]}>
                  {/* event title */}
                  <div className={s["event-title"]}>
                    <span className={cx("section-sub-heading-subtitle uppercase", s["title"])}>{event.title}</span>
                  </div>

                  <div className={s["event-add-infos"]}>
                    {/* location */}
                    <div className={`${s["event-location"]} clearfix`}>
                      <span className={`${s["event-label"]} uppercase conduit bold`}>
                        <Text defaultMessage="location" id="client.map.location" />
                      </span>
                      <span className={`${s["event-city"]} conduit bold lt-blue`}>
                        {
                          (event.meta && event.meta.city_name) ? event.meta.city_name : "Undefined"
                        }
                      </span>
                    </div>

                    {/* date */}
                    <div className={`${s["event-date"]} clearfix`}>
                      <div className={s["event-label"]}>
                        <span className="uppercase conduit bold">
                          <Text defaultMessage="date" id="client.date.date" />
                        </span>
                      </div>
                      <div className={s["event-from-to"]}>
                        <div className={s["event-from"]}>
                          <span className={`${s["from-label"]} uppercase conduit bold lt-blue`}>
                            <Text defaultMessage="from" id="client.date.fromDate" />
                          </span>

                          <span className="uppercase conduit bold lt-blue">
                            <FormattedDate
                              value={event.meta ? event.meta.from_date: null}
                              weekday="short"
                              day="numeric"
                              month="short"
                              year="numeric"
                            />
                          </span>
                        </div>
                        <div className={s["event-to"]}>
                          <span className={`${s["to-label"]} uppercase conduit bold lt-blue`}>
                            <Text defaultMessage="to" id="client.date.untilDate" />
                          </span>
                          <span className="uppercase conduit bold lt-blue">
                            <FormattedDate
                              value={event.meta ? event.meta.to_date : null}
                              weekday="short"
                              day="numeric"
                              month="short"
                              year="numeric"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* read more button */}

                  <div className={s["read-more-button"]}>
                    <a className={cx("btn", s["btn"])} href={`${getUrlFromPost(event.language.locale, event)}`}>
                      <Text className="dk-blue" defaultMessage="read more" id="client.callToAction.readMore" />
                      <ArrowRight polyline="15 8 22 12 15 16" color="red" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* button discover more */}
          {displayValue === 1 && (
            <div className={cx("row", s["btn-discover-more"])}>
              <div className={cx("col")}>
                <a className={cx("btn btn-outline dk-blue")} onClick={this.handleDiscoverMore}>
                  <Text defaultMessage="discover more" id="client.callToAction.discoverMore" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

EventsList.propTypes = {
  data: PropTypes.array,
  linkToDetail: PropTypes.string,
};

EventsList.defaultProps = {
  data: {},
  linkToDetail: "/events",
};

const mapStateToProps = (state) => {

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
    language_id : language_id,
	  locale : currentLocale,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(
  graphql(queryGetEventsForEvergreen, {
    options: (ownProps) => ({
      variables: {
        type: "event",
        language_id: ownProps.language_id,
        pagination: {
          limit: 3,
          offset: 0,
        },
      },
	  notifyOnNetworkStatusChange: true,
    }),
  })(EventsList),));