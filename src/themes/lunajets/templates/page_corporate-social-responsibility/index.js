import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "themes/lunajets/components/Layout/Header";
import CorporateSocialList from 'themes/lunajets/components/Content/Corporate/CorporateSocialList';
import Page from '../page';
import GET_POSTS from '../../../../client/routes/queries/queryGetPosts.gql';
import { Query, graphql } from 'react-apollo';
import SectionDescription from "themes/lunajets/components/Content/Detail/SectionDescription";

export class Corporate extends Component {
  render() {
    const { hreflangs, post } = this.props;
    let jsonBody;
    const body = post.body ? post.body.main : '';
    
    if (typeof body === "string") {
      jsonBody = body;
    } else {
      jsonBody = JSON.stringify(body);
    }

    const heading = {
      subtitle: {
        defaultMessage: 'Corporate Social Responsibility',
        id: "client.csr.subtitle",
        color: "lt-blue",
      },
      title: {
        defaultMessage: post.title.toUpperCase(),
      },
      content: {
        defaultMessage: jsonBody,
      },
    };

    const ids = (post.meta.service_list || []).map(value => value.post_uuid);

    return (
      <Page post={post} hreflangs={hreflangs}>
        <Header background={post.media ? post.media.src : ''} />
        <div className="container px-0">
          <SectionDescription section={heading} />
          <Query query={GET_POSTS} variables={{ ids }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
  
            return <CorporateSocialList
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
