import React from 'react';
import Article from '../../../components/Content/Detail/Article';
import ArticleBanner from '../../../components/Content/Detail/Article/ArticleBanner';
import ArticleDescriptionEdit from '../../../components/Content/Detail/Article/ArticleDescriptionEdit';
import gql from 'graphql-tag';
import Page from '../../components/Page';
import queryGetArticleDetail from './queryGetArticleDetail.graphql';

async function action({ client, params, query }) {
  
  console.log(params, query);

  const { data: { article } } = await client.query({
    query: queryGetArticleDetail,
    variables: {
      slug: params.slug,
    },
  });

  //const filteredArticles = aricles.slice(query.offset, aricles.length);

  return {
    title: 'News Detail',
    component: (
      <Page template="Default">
		  {<ArticleBanner data={{ article }} />}
		  {<ArticleDescriptionEdit data={{ article }} />}
      </Page>
    ),
  }
}

export default action;