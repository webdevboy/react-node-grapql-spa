import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "themes/lunajets/components/Layout/Header";
import Events from 'themes/lunajets/components/Content/Lists/Events';
import Page from '../page';
import { Query, graphql } from 'react-apollo';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./page.scss";
import Button from "themes/lunajets/components/Primitives/Button";
import Text from "themes/lunajets/components/Primitives/Text";
import SearchBox from "themes/lunajets/components/Content/EventList/SearchBox";
import SubHeader from "themes/lunajets/components/Content/EventList/SubHeader";
import GET_FEATURED_POSTS from "../../queries/getFeaturedPosts.gql";
import getUrlFromPost from "utils/getUrlFromPost";

export class EventListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: undefined,
      month: undefined,
      featuredPost: undefined,
    };

    this.onSearch = this.onSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let newState = this.state;
    if (nextProps.data.posts && nextProps.data.posts.length > 0) {
      newState.featuredPost = nextProps.data.posts[0];
      // Get parent slug
      this.setState(newState);
      console.log(this.state);
    }
  }

  onSearch(month, year) {
    let newState = this.state;
    newState.month = month;
    newState.year = year;
    this.setState(newState);
  }

  render() {
    const { hreflangs } = this.props;
    const { post } = this.props;
    const { featuredPost } = this.state;
    const heading = {
      subtitle: {
        defaultMessage: 'latest event',
        id: "client.eventList.banner.subtitle.",
        color: "lt-blue",
      },
      paragraph_line1: {
        defaultMessage: post.title.toUpperCase(),
        id: "client.eventList.corporate.param.title1",
      }
    };

    return (
      <Page post={post} hreflangs={hreflangs}>
      (
        {featuredPost ?
        <div className={cx(s["custom-header"])}>
          <img src={featuredPost.media.src} alt={`${featuredPost.title}`} className={s.backgroundImg}/>
          <div className={cx(s["header-container"], "container pb-5 align-items-end")}>
            <div className={cx("row w-100 align-items-center")}>
              <div className="col-12 col-sm-8">
                <Text className={cx("uppercase dk-blue", s["banner-title"])} id="client.eventList.banner.title" defaultMessage={featuredPost.title} />
              </div>
              <div className="col-12 col-sm-4">
                <a className={cx("btn lt-red w-100")} href={`${getUrlFromPost(featuredPost.language.locale, featuredPost)}`}>
                  <Text defaultMessage="Read Event" id="client.eventList.banner.button" />
                </a>
              </div>
            </div>
          </div>
        </div>: null}
        )
        <div className="container px-0">
          <SubHeader heading={heading}>
            <SearchBox onSearch={this.onSearch} />
          </SubHeader>
        </div>
        <div>
          <Events month={this.state.month} year={this.state.year}/>
        </div>
      </Page>
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
  };
};
const mapDispatchToProps = {
};

export default connect(mapStateToProps)(
  withStyles(s)(
    graphql(GET_FEATURED_POSTS, {
      options: ownProps => ({
        variables: {
          language_id: ownProps.language_id,
          type: "event",
        },
        notifyOnNetworkStatusChange: true,
      }),
    })(EventListPage)
  )
);
