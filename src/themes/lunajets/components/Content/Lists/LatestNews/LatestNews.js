import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import s from "./LatestNews.css";
import cx from "classnames";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import history from "core/history";
import Text from "../../../Primitives/Text";
import Image from "../../../Primitives/Image";
import LoadingSpinner from "../../../Widgets/LoadingSpinner";
import queryGetArticlesForEvergreen from "./queryGetArticlesForEvergreen.graphql";
import getUrlFromPost from "utils/getUrlFromPost";

class LatestNews extends Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.handleDiscoverMore = this.handleDiscoverMore.bind(this);
    this.state = {
      articles: [],
      display: 1,
   };
  }

  componentWillReceiveProps(nextProps) {
    let newState = this.state;
    newState.articles = nextProps.data.articles;
    if (newState.articles.length > 4) {
      newState.display = 1;
    } else {
      newState.display = 0;
    }
    this.setState(newState);

  }

  goTo = id => {
    history.push(`${this.props.linkToDetail}/${id}`);
  };

  async handleDiscoverMore() {
    this.props.data.fetchMore({
      variables: {
        language_id: this.props.languageId,
        cat_id: "news",
        pagination: {
          limit: 6,
          offset: this.state.articles.length,
        },
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        let articlesFiltered = [];
        let displayValue = 1;
        if (fetchMoreResult.articles.length === 6) {
          articlesFiltered = fetchMoreResult.articles.slice(0, 5);
        } else {
          displayValue = 0;
          articlesFiltered = fetchMoreResult.articles;
        }

        let articles = this.state.articles.concat(articlesFiltered);
        this.setState({
          articles: articles,
          display: displayValue
        });

      },
    });
  }

  getArticleElement = (article, cssClasses) => (
    <div className={cx(s.article, ...cssClasses.map(cssClass => s[cssClass]))}>
      {article.media ? (
        <Image
          source={article.media.src}
          width="100%"
          height="100%"
          alt={article.media.filename}
          title={article.media.filename}
        />
      ) : null}
      <div className={cx(s.description)}>
        <a className={cx()} href={`${getUrlFromPost(article.language.locale, article)}`}>
          <span className="conduit white bold">{article.title}</span>
        </a>
      </div>
    </div>
  );

  getArticleBlock = articles => {
    const articleElements = articles.map((article, index) => {
      let element = null;
      if (index == 0) {
        element = this.getArticleElement(article, ["square", "title-half-width"]);
      } else {
        element = this.getArticleElement(article, ["square"]);
      }
      return element;
    });
    return (
      <div className={cx("row ml-0")}>
        <div className={cx("col-sm pl-0")}>{articleElements[0]}</div>
        <div className={cx("col-sm pl-0")}>
          <div className={cx("row ml-0")}>
            <div className={cx("col-sm-6 pl-0")}>{articleElements[1]}</div>
            <div className={cx("col-sm-6 pl-0")}>{articleElements[2]}</div>
            <div className={cx("col-sm-6 pl-0")}>{articleElements[3]}</div>
            <div className={cx("col-sm-6 pl-0")}>{articleElements[4]}</div>
          </div>
        </div>
      </div>
    );
  };
  splitArticlesIntoGroups(articles) {
    let i,
      j,
      chunk = 5;
    const groups = [];
    for (i = 0, j = articles.length; i < j; i += chunk) {
      groups.push(articles.slice(i, i + chunk));
    }
    return groups;
  }
  render() {
    if (this.props.data.loading) {
      return <LoadingSpinner />;
    }

    const articles = this.state.articles;
    const groups = this.splitArticlesIntoGroups(articles);
    const displayValue = this.state.display;
    return (
      <div className={s["section-news"]}>
        <div className={cx("container")}>
          {/* title */}
          <div className={cx("row")}>
            <div className={cx("col")}>
              <span className={cx("section-title lt-blue", s["news-title"])}>
                <Text defaultMessage="latest news" id="client.sectionTitle.latestNews" />
              </span>
            </div>
          </div>

          {/* Desktop + Tablet only */}
          <div className={cx("d-none d-sm-block")}>{groups.map(articles => this.getArticleBlock(articles))}</div>
          {/* Phone only */}
          <div className={cx("d-block d-sm-none")}>
            {articles.map(article => (
              <div className={cx("row ml-0")}>
                <div className={cx("col pl-0")}>{this.getArticleElement(article, ["square"])}</div>
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

LatestNews.propTypes = {
  data: PropTypes.array,
  linkToDetail: PropTypes.string,
};

LatestNews.defaultProps = {
  data: {},
  linkToDetail: "/articles",
};

const mapStateToProps = state => {
  const currentLocale = state.intl.locale;
  const availableLocales = state.runtime.availableLocales;
  const { language_id } = _.find(availableLocales, {
    locale: currentLocale,
  });
  return {
    languageId: language_id,
    locale: currentLocale,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(s)(
    graphql(queryGetArticlesForEvergreen, {
      options: ownProps => ({
        variables: {
          locale: ownProps.locale,
          pagination: {
            limit: 5,
            offset: 0,
          },
        },
        notifyOnNetworkStatusChange: true,
      }),
    })(LatestNews),
  ),
);
