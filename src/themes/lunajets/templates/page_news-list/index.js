import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "themes/lunajets/components/Layout/Header";
import News from "themes/lunajets/components/Content/Lists/News";
import Page from '../page';
import { Query, graphql } from 'react-apollo';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./page.scss";
import Button from "themes/lunajets/components/Primitives/Button";
import Text from "themes/lunajets/components/Primitives/Text";
import SearchBox from "themes/lunajets/components/Content/NewsList/SearchBox";
import SubHeader from "themes/lunajets/components/Content/NewsList/SubHeader";
import GET_ARTICLES_POSTS from '../../queries/getArticlePostsByCategoryName.gql';
import GET_FEATURED_POSTS from "../../queries/getFeaturedPosts.gql";
import getUrlFromPost from "utils/getUrlFromPost";

export class NewsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: '',
      month: '',
      categoryName: 'News'
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

  onSearch(month, year, categoryName, index) {
    // console.log(month, year,categoryName)
    if (index === 0) {
      categoryName = 'News';
    }
    this.setState({
      month: month,
      year: year,
      categoryName
    });
  }

  render() {
    const { hreflangs, post, language_id } = this.props;
    const { featuredPost, categoryName } = this.state;

    const heading = {
      subtitle: {
        defaultMessage: 'latest news',
        id: "client.newsList.banner.subtitle.",
        color: "lt-blue",
      },
      paragraph_line1: {
        defaultMessage: post.title.toUpperCase(),
        id: "client.newsList.corporate.param.title1",
      }
    };

    const ids = (post.meta.corporate_list || []).map(value => value.post_uuid);
    // console.log('====> Lang', post);
    return (
      <Page post={post} hreflangs={hreflangs}>
        {featuredPost ?
          <div className={cx(s["custom-header"])}>
            <img src={featuredPost.media && featuredPost.media.src} alt={`${featuredPost.title}`} className={s.backgroundImg}/>
            <div className={cx(s["header-container"], "container pb-5 align-items-end")}>
              <div className={cx("row w-100 align-items-center")}>
                <div className="col-12 col-sm-8">
                  <Text className={cx("uppercase dk-blue", s["banner-title"])} id="client.newsList.banner.title" defaultMessage={featuredPost.title} />
                </div>
                <div className="col-12 col-sm-4">
                  <a className={cx("btn lt-red w-100")} href={`${getUrlFromPost(featuredPost.language.locale, featuredPost)}`}>
                    <Text defaultMessage="Read News" id="client.newsList.banner.button" />
                  </a>
                </div>
              </div>
            </div>
          </div>: null}
        <div className="container px-0">
          <SubHeader heading={heading}>
            <SearchBox onSearch={this.onSearch} language_id={post.language && post.language.id} />
          </SubHeader>
        </div>
        <Query query={GET_ARTICLES_POSTS} variables={{
          month: parseInt(this.state.month),
          year: parseInt(this.state.year),
          term_name: categoryName,
          language_id
        }}>
          {({ loading, error, data }) => {
            // console.log(data, error);
            if (loading) return null;
            if (error) return `Error!: ${error}`;

            let posts = [];

            if (data.getArticlePostsByCategoryName) {
              data.getArticlePostsByCategoryName.forEach(item => posts = posts.concat(item.posts));
            }

            return <News
                      news={posts}
                      locale={post.language.locale}
                   />
          }}
        </Query>
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
          type: "article",
        },
        notifyOnNetworkStatusChange: true,
      }),
    })(NewsList)
  )
);
