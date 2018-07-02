import React, { Component } from "react";
import { connect } from "react-redux";
import { Query, graphql } from 'react-apollo';
import gql from "graphql-tag";
import Page from '../page';
import Header from 'themes/lunajets/components/Layout/Header';
import background from '../home/gfx/corporate-detail-bg.png';
import { AlsoInteresting } from '../../components/Content/Home/AlsoInteresting/AlsoInteresting';
import NewsBanner from "themes/lunajets/components/Content/Detail/Article/NewsBanner";
import ArticleDescription from 'themes/lunajets/components/Content/Detail/Article/ArticleDescription';
import SectionDescription from "themes/lunajets/components/Content/Detail/SectionDescription";
import GET_POSTS from '../../../../client/routes/queries/queryGetPosts.gql'

class PageArticleDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { hreflangs, post } = this.props;

    let jsonBody;
    const body = post.body ? post.body.main : {};
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    // Find the level 1 category of the article

    let temp = {};
    let mainCategoryName = '';
    if (post && post.taxonomies) {
      temp = post.taxonomies.find (taxo => (taxo.taxonomy === "article_category" && !taxo.parent));

      if (temp && temp.term && temp.term.meta) {
        mainCategoryName = temp.term.meta.displayName;
      }
    }
    
    const article = {
      subtitle: {
        defaultMessage: mainCategoryName ? mainCategoryName : "Article",
        color: 'lt-blue',
      },
      title: {
        defaultMessage: post.title.toUpperCase(),
      },
      content: {
        defaultMessage: jsonBody,
      },
    };

    const ids = (post.meta.also_interesting || []).map(value => value.post_uuid).slice(0, 3);
    
    return (
      <div>
        <Page post={post} hreflangs={hreflangs}>
          <Header background={post.media && post.media.src} />
          <SectionDescription section={article} />
          <Query query={GET_POSTS} variables={{ ids }}>
            {({ loading, error, data }) => {
              if (loading) return null;
              if (error) return `Error!: ${error}`;

              // console.log('==> Get posts from ', post, data);

              let posts = data.posts.map(v => {
                let result = {
                  title: v.title,
                  slug: v.slug,
                  image: v.media && v.media.src
                };
                
                if (typeof v.body.main === 'string') {
                  result.summary = v.body.main;
                } else {
                  result.summary = JSON.stringify(v.body.main);
                }

                return result;
              });

              // const realtedTaxonomy = post.taxonomies.filter(taxonomy => taxonomy.taxonomy === 'article_category');

              // if (realtedTaxonomy.length) {
              //   article.subtitle.defaultMessage = realtedTaxonomy[0].term.name;
              // }

              return !!posts.length && <AlsoInteresting posts={posts} />;
            }}
          </Query>
        </Page>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(PageArticleDetails);
