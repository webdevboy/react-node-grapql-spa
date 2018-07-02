import React from 'react';
import Article from '../../../components/Content/Detail/Article';
import ArticleBanner from '../../../components/Content/Detail/Article/ArticleBanner';
import ArticleDescription from '../../../components/Content/Detail/Article/ArticleDescription';
import gql from 'graphql-tag';
import Page from '../../components/Page';
import NotFound from '../404/NotFound';
import queryGetArticleDetail from './queryGetArticleDetail.graphql';

async function action({ client, params, query }) {
  
  console.log(params, query);

  const { data: { article } } = await client.query({
    query: queryGetArticleDetail,
    variables: {
      slug: params.slug,
      language_id: params.languageId,
    },
  });

  //const filteredArticles = aricles.slice(query.offset, aricles.length);
  return article ? 
   {
    title: 'News Detail',
    component: (
      <Page template="Default">
		  {<ArticleBanner data={{ article }} />}
		  {<ArticleDescription data={{ article }} />}
      </Page>
    ),
  } : 
  {
    title: 'Page Not Found',
    component: <Page template={'Default'}><NotFound /></Page>,
	  status: 404,
	  description: 'Page Not Found'
  } 
}

export default action;