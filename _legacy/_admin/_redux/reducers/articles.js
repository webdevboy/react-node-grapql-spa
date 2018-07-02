import {
	GET_ALL_ARTICLES,
	GET_ALL_ARTICLES_SUCCESS,
	GET_ALL_ARTICLES_ERROR,
	GET_SINGLE_ARTICLE,
	GET_SINGLE_ARTICLE_ERROR,
	GET_SINGLE_ARTICLE_SUCCESS,
	CREATE_NEW_ARTICLE,
	UPDATE_ARTICLE,
	SELECT_ARTICLE
} from '../constants';

const INITIAL_STATE = {
  articles: [],
  selectedArticles: null
};

const article = (state = {}, action) => {
	switch(action.type) {

		case UPDATE_ARTICLE:

			if (state.id === action.payload.article.id) {
				return Object.assign({}, state, action.payload.article)
			}

			return state
			
		case CREATE_NEW_ARTICLE:
			return action.payload.article;

		default:
			return state
	}
}

const articles = (state = INITIAL_STATE, action) => {

	switch(action.type) {
		case GET_ALL_ARTICLES:
			return state

		case SELECT_ARTICLE:
			return {
				...state,
				selectedArticles: action.payload.selectedArticles
			}
		case GET_ALL_ARTICLES_SUCCESS:
			return {
				...state,
				articles: action.payload.articles
			}
		case GET_ALL_ARTICLES_ERROR:
			return {
				...state,
				errors: action.payload.e
			}
		case UPDATE_ARTICLE:
			return {
				...state,
				articles: state.articles.map(a => article(a, action))
			}
		case CREATE_NEW_ARTICLE:
			return {
				...state,
				articles: [ article({}, action), ...state.articles ]
			}
		default:
			return state
	}

    return state;
}

export default articles