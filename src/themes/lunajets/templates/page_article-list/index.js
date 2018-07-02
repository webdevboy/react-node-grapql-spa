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
import GET_ARTICLES_POSTS from '../../queries/getArticlePosts.gql';
import getPostByPostIds from "../../queries/getPostByPostIds.graphql";
import getUrlFromPost from "utils/getUrlFromPost";

function arrayUnique(array) {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i].post_id === a[j].post_id)
              a.splice(j--, 1);
      }
  }

  return a;
}

export class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: undefined,
      month: undefined,
      orderedPosts: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.posts && nextProps.data.posts.length > 0
      && nextProps.post && nextProps.post.meta && nextProps.post.meta.displayOrder) {
      let sortArray = [];
      nextProps.post.meta.displayOrder.map(post_id => {
        nextProps.data.posts.map( post => {
          if (post.post_id === post_id) {
            sortArray.push(post);
          }
        });
      });
      this.setState({
        ...this.state,
        orderedPosts: sortArray,
      });
    }
  }

  render() {
    const { hreflangs, post } = this.props;
    const { orderedPosts } = this.state;

    const heading = {
      subtitle: {
        defaultMessage: post && post.meta && post.meta.category ? post.meta.category : "",
        color: "lt-blue",
      },
      paragraph_line1: {
        defaultMessage: post.title.toUpperCase(),
      }
    };

    return (
      <Page post={post} hreflangs={hreflangs}>
        <div className={cx(s["custom-header"])}>
          <img src={post.media && post.media.src} alt={`${post.title}`} className={s.backgroundImg}/>
        </div>
        <div className="container px-0">
          <SubHeader heading={heading}/>
        </div>
        <Query query={GET_ARTICLES_POSTS} variables={{
          term_name: post.meta.category,
          language_id: this.props.language_id,
          }}>
          {({ loading, error, data }) => {

            if (loading) return null;
            if (error) return `Error!: ${error}`;
            let articlePosts = arrayUnique(orderedPosts.concat(data.getArticlePosts && data.getArticlePosts[0] ? data.getArticlePosts[0].posts : []))
            return <News
                      news={articlePosts}
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

export default connect(mapStateToProps)(
  withStyles(s)(
    graphql(getPostByPostIds, {
      options: ownProps => ({
        variables: {
          language_id: ownProps.language_id,
          post_ids: ownProps.post && ownProps.post.meta && ownProps.post.meta.displayOrder ? ownProps.post.meta.displayOrder: [],
        },
        notifyOnNetworkStatusChange: true,
      }),
    })(ArticleList)
  )
);
