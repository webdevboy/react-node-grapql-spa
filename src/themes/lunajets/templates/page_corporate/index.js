import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "themes/lunajets/components/Layout/Header";
import SectionDescription from "themes/lunajets/components/Content/Detail/SectionDescription";
import CorporateList from 'themes/lunajets/components/Content/Corporate/CorporateList';
import Page from '../page';
import GET_POSTS from '../../../../client/routes/queries/queryGetPosts.gql';
import { Query, graphql } from 'react-apollo';

export class Corporate extends Component {
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
        defaultMessage: 'CORPORATE',
        id: "client.corporateService.subtitle",
        color: "lt-blue",
      },
      title: {
        defaultMessage: post.title.toUpperCase(),
      },
      content: {
        defaultMessage: jsonBody,
      },
    };

    const ids = (post.meta.corporate_list || []).map(value => value.post_uuid);

    return (
      <Page post={post} hreflangs={hreflangs}>
        <Header background={post.media && post.media.src} />
        <div className="container px-0">
          <SectionDescription section={heading} />
          <Query query={GET_POSTS} variables={{ ids }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;  
            return <CorporateList
                      corporate={data.posts}
                      locale={post.language.locale}
                   />
          }}
          </Query>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Corporate);
