import { 
	GET_ALL_ARTICLES,
	GET_ALL_ARTICLES_SUCCESS,
	GET_ALL_ARTICLES_ERROR,
	GET_SINGLE_ARTICLE,
	GET_SINGLE_ARTICLE_ERROR,
	GET_SINGLE_ARTICLE_SUCCESS,
	CREATE_NEW_ARTICLE,
	UPDATE_ARTICLE,
	SELECT_ARTICLE,
	SHOW_BACKDROP,
	SHOW_SIDEBAR
} from '../constants';

import gql from 'graphql-tag';

export function selectArticle({ selectedArticles }) {

	return (dispatch) => {

		dispatch({
		   type: SHOW_BACKDROP,
		});

		dispatch({
		    type: SELECT_ARTICLE,
		    payload: {
		    	selectedArticles: selectedArticles
		    }
		});

		dispatch({
		    type: SHOW_SIDEBAR
		});

	};
}

export function createArticle(article) {
	return (dispatch) => {
		dispatch({
	        type: CREATE_NEW_ARTICLE,
	        payload: {
	        	article
	        }
	    });
	};
}

export function getAllArticles(offset, limit) {

	return async (dispatch, getState, { client }) => {

		dispatch({
	        type: GET_ALL_ARTICLES,
	    });

	    try {
	      const { data } = await client.query({
	        query: gql`{
						getAllArticles {
						    id
						    title
						    slug
						    body
						    summary
						    date
						    source
						    state
						    category {
						    	name
						    }
						    author {
						    	first_name
						    	last_name
						    }
						}
	        }`,
	      });

	      const { getAllArticles } = data;

	      dispatch({
	        type: GET_ALL_ARTICLES_SUCCESS,
	        payload: {
	        	articles: getAllArticles
	        }
	      });

	    } catch(e) {

	    	console.error(e);

	    	dispatch({
		        type: GET_ALL_ARTICLES_ERROR,
		        payload: {
			        e
			    }
		    });

	    }

	};

}