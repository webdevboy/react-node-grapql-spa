import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "themes/lunajets/components/Layout/Header";
import PartnerList from 'themes/lunajets/components/Content/Lists/PartnerList';
import Page from '../page';
import GET_ARTICLES_POSTS from '../../queries/getArticlePosts.gql';
import { Query, graphql } from 'react-apollo';
import SimpleSubHeader from "themes/lunajets/components/Content/SimpleSubHeader";

export class Partners extends Component {
  render() {
    const { hreflangs } = this.props;
    const { post } = this.props;
    let jsonBody;
    const body = post.body ? post.body.main : '';
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    const heading = {
      subtitle: {
        defaultMessage: 'Partners & sponsors',
        id: "client.banner.subtitle.",
        color: "lt-blue",
      },
      paragraph_line1: {
        defaultMessage: post.title.toUpperCase(),
        id: "client.corporate.param.title1",
      },
      content: {
        defaultMessage: jsonBody,
      },
    };

    return (
      <Page post={post} hreflangs={hreflangs}>
        <Header background={post.media && post.media.src} />
        <div className="container px-0">
          <SimpleSubHeader heading={heading} />
          <Query query={GET_ARTICLES_POSTS} variables={{
            term_name: 'Partners',
            language_id: this.props.languageId
          }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            console.log(data);
  
            return <PartnerList
                      corporate={data.getArticlePosts[0] ? data.getArticlePosts[0].posts : []}
                      locale={post.language.locale}
                   />
          }}
          </Query>
        </div>
      </Page>
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

export default connect(mapStateToProps, mapDispatchToProps)(Partners);
