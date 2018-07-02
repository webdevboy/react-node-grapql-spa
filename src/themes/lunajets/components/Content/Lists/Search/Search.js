import React, { Component, Fragment } from "react";
import { FormattedDate } from "react-intl";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import s from "./Search.css";
import cx from "classnames";
import gql from "graphql-tag";
import moment from "moment";
import { Query } from "react-apollo";
import { graphql } from "react-apollo";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import history from "core/history";
import Image from "../../../Primitives/Image";
import Text from "../../../Primitives/Text";
import WrapperLink from "../../../Primitives/WrapperLink";
import EmptyLegLink from "../../../Primitives/EmptyLegLink";
import SearchInput from "../../../Widgets/Search";
import EmptyLegRow from "../../../Content/EmptyLegs/EmptyLegRow";
import LoadingSpinner from "../../../Widgets/LoadingSpinner";
import _ from "lodash";
import ArrowRight from "react-feather/dist/icons/arrow-right";
import QUERY_SEARCH from "./queryGetSearchData.graphql";
import getUrlFromPost from "utils/getUrlFromPost";
import FaAngleDown from "react-icons/lib/fa/angle-down";
import MdArrow from "react-icons/lib/md/keyboard-backspace";
import reactStringReplace from "utils/stringReplace";
import noImage from "./gfx/no_image.png";

const TitleSearch = ({ text, search_query }) => {
  let replacedText = reactStringReplace(text, search_query, (match, i) => <span className="keyword">{match}</span>);
  return <Fragment>{replacedText}</Fragment>;
};

const BodySearch = ({ mainText, subText, search_query }) => {
  let text = "";
  const searchKey = search_query.toLowerCase();

  if (mainText && mainText.toLowerCase().search(searchKey) !== -1) {
    text = mainText;
  } else if (subText && subText.toLowerCase().search(searchKey) !== -1) {
    text = subText;
  }
  const textLowerCase = text.toLowerCase();
  const indexSearch = textLowerCase.indexOf(searchKey);
  const firstIndex = Math.max(0, indexSearch - 100);
  const lastIndex = Math.min(text.length, indexSearch + 150);
  let displayText = text.slice(firstIndex, lastIndex);
  displayText = firstIndex > 0 ? "...".concat(displayText) : displayText;
  displayText = lastIndex < text.length ? displayText.concat("...") : displayText;
  let replacedText = reactStringReplace(displayText, search_query, (match, i) => (
    <span className="keyword">{match}</span>
  ));
  return <Fragment>{replacedText}</Fragment>;
};

class Search extends Component {
  static contextTypes = {
    fetch: true,
    client: true,
  };

  constructor(props) {
    super(props);
    const { search_query } = this.props;
    this.state = {
      search_query,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search_query !== this.props.search_query) {
      this.setState({
        search_query: nextProps.search_query,
      });
    }
  }

  searchEnter = keyword => {
    if (keyword !== "") {
      this.setState({
        search_query: keyword,
      });
    }
  };

  render() {
    const { language_id, locale } = this.props;
    const { search_query } = this.state;
    return (
      <Query
        query={QUERY_SEARCH}
        variables={{ search: search_query, language_id: language_id }}
        fetchPolicy="cache-and-network"
        notifyOnNetworkStatusChange
      >
        {({ loading, data, refetch, error }) => {
          if (loading) return <LoadingSpinner />;
          if (error) return error.message;
          const { posts, emptylegs } = data;
          const countPost = (posts && posts.length) || 0;
          const countEmptyLeg = (emptylegs && emptylegs.length) || 0;
          const articles = (posts && posts.filter(post => post.type === "article")) || [];
          const events = (posts && posts.filter(post => post.type === "event")) || [];
          const aircrafts = (posts && posts.filter(post => post.type === "aircraft")) || [];
          const airports = (posts && posts.filter(post => post.type === "airport")) || [];
          const destinations =
            (posts &&
              posts.filter(post => post.type === "page" && post.meta.template === "private-jet-charter-destination")) ||
            [];
          const count =
            countEmptyLeg + articles.length + events.length + aircrafts.length + airports.length + destinations.length;
          //APPLY THE FILTER HERE

          //END FILTER

          // Front office
          return (
            <Fragment>
              <div className={cx("container", s["search-title"])}>
                <h1 className={cx("section-heading")}>
                  <span>We found {count} results</span>
                </h1>
              </div>

              <div className={cx("container mb-5", s["search-input"])}>
                <div className="row">
                  <div className="col-12 col-md-9">
                    <SearchInput initKeyword={search_query} onSearch={this.searchEnter} />
                  </div>
                  <div className="col-md-3 d-none d-md-block">
                    <div className={cx("dropdown", s["sort-dropdown"])}>
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <Text defaultMessage="Sort by" id="client.search.sort-by" />
                        <FaAngleDown className={cx(s["arrow-down"])} size={30} color="#b6cada" />
                      </button>
                      <div className={cx("dropdown-menu", s.menu)} aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">
                          <Text defaultMessage="Popular" id="client.search.sort-by.popular" />
                        </a>
                        <a className="dropdown-item" href="#">
                          <Text defaultMessage="Most Recent" id="client.search.sort-by.mostrecent" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={cx("container my-5", s["search-result"])}>
                {/* empty legs */}
                {emptylegs &&
                  emptylegs.length > 0 && (
                    <div className={cx(s["empty-legs"])}>
                      <div className={cx("row")}>
                        <div className="col-12">
                          <h2 className="section-title lt-blue">
                            <Text defaultMessage="Empty Legs" id="client.search.emptylegs" />
                          </h2>
                        </div>
                      </div>
                      <table className={cx(s["table-empty-leg"])}>
                        {emptylegs.map(emptyleg => {
                          return (
                            <EmptyLegLink
                              emptyLegId={emptyleg.id}
                              cityFrom={emptyleg.from_airport.city}
                              cityTo={emptyleg.to_airport.city}
                            >
                              <EmptyLegRow key={emptyleg.id} version={2} emptyleg={emptyleg} />
                            </EmptyLegLink>
                          );
                        })}
                      </table>
                    </div>
                  )}

                {/* destinations */}
                {destinations &&
                  destinations.length > 0 && (
                    <div className={cx(s["search-item"], s["destinations"])}>
                      <div className={cx("row")}>
                        <div className="col-12">
                          <h2 className="section-title lt-blue">
                            <Text defaultMessage="Destinations" id="client.search.destinations" />
                          </h2>
                        </div>
                      </div>
                      {destinations.map(destination => {
                        return (
                          <div className={cx("row", s["search-item-row"])}>
                            <div className={cx("col-12 col-md-4", s["search-item-photo"])}>
                              <img src={destination.media ? destination.media.src : noImage} alt="" />
                            </div>
                            <div className={cx("col-12 col-md-8", s["search-item-infos"])}>
                              <div className={cx(s["info-title"])}>
                                <TitleSearch search_query={search_query} text={destination.title} />
                              </div>
                              <p className={cx("d-none d-md-block")}>
                                <BodySearch
                                  mainText={destination.body.mainText}
                                  subText={destination.body.subText}
                                  search_query={search_query}
                                />
                              </p>
                              <div className={cx(s["more"])}>
                                <WrapperLink pathUrl={`${getUrlFromPost(locale, destination)}`}>
                                  <Text defaultMessage="View more" id="client.search.view-more" />
                                </WrapperLink>
                                <MdArrow
                                  className={cx(s["icon-arrow"])}
                                  style={{ transform: "rotate(180deg)" }}
                                  size={28}
                                  color="red"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                {/* airports */}
                {airports &&
                  airports.length > 0 && (
                    <div className={cx(s["search-item"], s["airports"])}>
                      <div className={cx("row")}>
                        <div className="col-12">
                          <h2 className="section-title lt-blue">
                            <Text defaultMessage="Airports" id="client.search.airports" />
                          </h2>
                        </div>
                      </div>
                      {airports.map(airport => {
                        return (
                          <div className={cx("row", s["search-item-row"])}>
                            <div className={cx("col-12 col-md-4", s["search-item-photo"])}>
                              <img src={airport.media ? airport.media.src : noImage} alt="" />
                            </div>
                            <div className={cx("col-12 col-md-8", s["search-item-infos"])}>
                              <div className={cx(s["info-title"])}>
                                <TitleSearch search_query={search_query} text={airport.title} />
                              </div>
                              <p className={cx("d-none d-md-block")}>
                                <BodySearch
                                  mainText={airport.body.mainText}
                                  subText={airport.body.subText}
                                  search_query={search_query}
                                />
                              </p>
                              <div className={cx(s["more"])}>
                                <WrapperLink pathUrl={`${getUrlFromPost(locale, airport)}`}>
                                  <Text defaultMessage="View more" id="client.search.view-more" />
                                </WrapperLink>
                                <MdArrow
                                  className={cx(s["icon-arrow"])}
                                  style={{ transform: "rotate(180deg)" }}
                                  size={28}
                                  color="red"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                {/* aircrafts */}
                {aircrafts &&
                  aircrafts.length > 0 && (
                    <div className={cx(s["search-item"], s["airports"])}>
                      <div className={cx("row")}>
                        <div className="col-12">
                          <h2 className="section-title lt-blue">
                            <Text defaultMessage="Aircrafts" id="client.search.aircrafts" />
                          </h2>
                        </div>
                      </div>
                      {aircrafts.map(aircraft => {
                        return (
                          <div className={cx("row", s["search-item-row"])}>
                            <div className={cx("col-12 col-md-4", s["search-item-photo"])}>
                              <img src={aircraft.media ? aircraft.media.src : noImage} alt="" />
                            </div>
                            <div className={cx("col-12 col-md-8", s["search-item-infos"])}>
                              <div className={cx(s["info-title"])}>
                                <TitleSearch search_query={search_query} text={aircraft.title} />
                              </div>
                              <p className={cx("d-none d-md-block")}>
                                <BodySearch
                                  mainText={aircraft.body.mainText}
                                  subText={aircraft.body.subText}
                                  search_query={search_query}
                                />
                              </p>
                              <div className={cx(s["more"])}>
                                <WrapperLink pathUrl={`${getUrlFromPost(locale, aircraft)}`}>
                                  <Text defaultMessage="View more" id="client.search.view-more" />
                                </WrapperLink>
                                <MdArrow
                                  className={cx(s["icon-arrow"])}
                                  style={{ transform: "rotate(180deg)" }}
                                  size={28}
                                  color="red"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                {/* news */}
                {articles &&
                  articles.length > 0 && (
                    <div className={cx(s["search-item"], s["news"])}>
                      <div className={cx("row")}>
                        <div className="col-12">
                          <h2 className="section-title lt-blue">
                            <Text defaultMessage="News" id="client.search.news" />
                          </h2>
                        </div>
                      </div>
                      {articles.map(article => {
                        return (
                          <div className={cx("row", s["search-item-row"])}>
                            <div className={cx("col-12 col-md-4", s["search-item-photo"])}>
                              <img src={article.media ? article.media.src : noImage} alt="" />
                            </div>
                            <div className={cx("col-12 col-md-8", s["search-item-infos"])}>
                              <div className={cx(s["info-title"])}>
                                <TitleSearch search_query={search_query} text={article.title} />
                                <div className={cx(s["date"], "d-md-none")}>
                                  <span>{moment(article.publish_at).format("D MMM YYYY")}</span>
                                </div>
                              </div>
                              <p className={cx("d-none d-md-block")}>
                                <BodySearch
                                  mainText={article.body.mainText}
                                  subText={article.body.subText}
                                  search_query={search_query}
                                />
                              </p>

                              <div className={cx(s["info-sup"])}>
                                <div className={cx(s["date"], "d-none d-md-block")}>
                                  <span>{moment(article.publish_at).format("D MMM YYYY")}</span>
                                </div>

                                <div className={cx(s["more"])}>
                                  <WrapperLink pathUrl={`${getUrlFromPost(locale, article)}`}>
                                    <Text defaultMessage="Read more" id="client.search.read-more" />
                                  </WrapperLink>
                                  <MdArrow
                                    className={cx(s["icon-arrow"])}
                                    style={{ transform: "rotate(180deg)" }}
                                    size={28}
                                    color="red"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                {/* events */}
                {events &&
                  events.length > 0 && (
                    <div className={cx(s["search-item"], s["events"])}>
                      <div className={cx("row")}>
                        <div className="col-12">
                          <h2 className="section-title lt-blue">
                            <Text defaultMessage="Events" id="client.search.events" />
                          </h2>
                        </div>
                      </div>
                      {events.map(event => {
                        return (
                          <div className={cx("row", s["search-item-row"])}>
                            <div className={cx("col-12 col-md-4", s["search-item-photo"])}>
                              <img src={event.media ? event.media.src : noImage} alt="" />
                            </div>
                            <div className={cx("col-12 col-md-8", s["search-item-infos"])}>
                              <div className={cx(s["info-title"])}>
                                <TitleSearch search_query={search_query} text={event.title} />
                                <div className={cx(s["date"], "d-md-none")}>
                                  <span>{moment(event.publish_at).format("D MMM YYYY")}</span>
                                </div>
                              </div>
                              <p className={cx("d-none d-md-block")}>
                                <BodySearch
                                  mainText={event.body.mainText}
                                  subText={event.body.subText}
                                  search_query={search_query}
                                />
                              </p>

                              <div className={cx(s["info-sup"])}>
                                <div className={cx(s["date"], "d-none d-md-block")}>
                                  <span>{moment(event.publish_at).format("D MMM YYYY")}</span>
                                </div>

                                <div className={cx(s["more"])}>
                                  <WrapperLink pathUrl={`${getUrlFromPost(locale, event)}`}>
                                    <Text defaultMessage="View more" id="client.search.view-more" />
                                  </WrapperLink>
                                  <MdArrow
                                    className={cx(s["icon-arrow"])}
                                    style={{ transform: "rotate(180deg)" }}
                                    size={28}
                                    color="red"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
              </div>
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Search));
