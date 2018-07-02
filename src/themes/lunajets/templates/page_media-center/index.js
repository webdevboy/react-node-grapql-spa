import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from "themes/lunajets/components/Layout/Header";
import SectionDescription from "themes/lunajets/components/Content/Detail/SectionDescription";
import PressRelease from "themes/lunajets/components/Content/Lists/PressRelease";
import Videos from "themes/lunajets/components/Content/Lists/Videos";
import Archives from "themes/lunajets/components/Content/Lists/Archives";
import MediaCoverage from "themes/lunajets/components/Content/Lists/MediaCoverage";
import Page from '../page';
import { Query, graphql } from 'react-apollo';
import GET_ARTICLES_POSTS from '../../queries/getArticlePosts.gql';

export class MediaCenter extends Component {
  render() {
    const { hreflangs, post } = this.props;

    const heading = {
      subtitle: {
        defaultMessage: 'MEDIA CENTER',
        id: "client.mediaCenter.bannerSubtitle",
        color: "lt-blue",
      },
      title: {
        defaultMessage: 'PRESS',
        id: "client.mediaCenter.pressLabel",
      },
      
    };

    const ids = (post.meta.corporate_list || []).map(value => value.post_uuid);
    // console.log('====> Lang', post);

    return (
      <Page post={post} hreflangs={hreflangs}>
        <Header background={post.media && post.media.src} />
        <div className="container">
          <SectionDescription section={heading} />
          <Query query={GET_ARTICLES_POSTS} variables={{
            term_name: 'Media Coverage',
            language_id: this.props.languageId
          }}>
            {({ loading, error, data }) => {
              // console.log(data, error);
              if (loading) return null;
              if (error) return `Error!: ${error}`;
    
              return <MediaCoverage coverages={data.getArticlePosts[0] ? data.getArticlePosts[0].posts : []} />
            }}
          </Query>
          <Query query={GET_ARTICLES_POSTS} variables={{
            term_name: 'Press Release',
            language_id: this.props.languageId
          }}>
            {({ loading, error, data }) => {
              // console.log(data, error);
              if (loading) return null;
              if (error) return `Error!: ${error}`;
    
              return <PressRelease releases={data.getArticlePosts[0] ? data.getArticlePosts[0].posts : []} />
            }}
          </Query>
          <Videos />  
          <Archives />  
          {/* <Query query={GET_POSTS} variables={{ ids }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            console.log(data);
  
            return <CorporateList corporate={data.posts} />
          }}
          </Query> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(MediaCenter);
