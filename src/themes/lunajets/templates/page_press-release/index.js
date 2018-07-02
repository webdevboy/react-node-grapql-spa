import React, { Component } from "react";
import { connect } from "react-redux";
import { Query, graphql } from 'react-apollo';
import gql from "graphql-tag";
import Page from '../page';
import Header from 'themes/lunajets/components/Layout/Header';
import background from '../home/gfx/corporate-detail-bg.png';
import { AlsoInteresting } from '../../components/Content/Home/AlsoInteresting/AlsoInteresting';
import SectionDescription from "themes/lunajets/components/Content/Detail/SectionDescription";
import GET_ARTICLES_POSTS from '../../queries/getArticlePosts.gql';

export class PagePressRelease extends Component {
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
    
    const heading = {
      subtitle: {
        defaultMessage: 'CORPORATE SERVICES',
        id: `client.press.release.subtitle`,
        color: 'lt-blue',
      },
      title: {
        defaultMessage: post.title.toUpperCase(),
      },
      content: {
        defaultMessage: jsonBody,
      },
    };
    
    return (
      <div>
        <Page post={post} hreflangs={hreflangs}>
          <Header background={ (post.media && post.media.src) || background} alt={post.title.toUpperCase()} />
          <SectionDescription section={heading} />
          <Query query={GET_ARTICLES_POSTS} variables={{
            term_name: 'Press Release',
            language_id: this.props.languageId
          }}>
            {({ loading, error, data }) => {
              if (loading) return null;
              if (error) return `Error!: ${error}`;

              let posts = data.getArticlePosts && data.getArticlePosts.map(v => {
                let result = {
                  title: v.title,
                  slug: v.slug,
                  image: v.media.src
                };

                if (typeof v.body === 'string') {
                  result.summary = v.body;
                } else {
                  result.summary = JSON.stringify(v.body);
                }

                return result;
              });

              return posts.length > 0 ? <AlsoInteresting posts={posts} /> : <div />;
            }}
          </Query>

        </Page>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { intl: { locale }, runtime: { availableLocales } } = state;

  return {
    languageId: availableLocales[locale].id
  };
};

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(PagePressRelease);
