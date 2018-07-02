import {
  START_FETCHING_ARTICLES_POSTS,
  START_FETCHING_ARTICLES_POSTS_SUCCESS,
  START_FETCHING_ARTICLES_POSTS_ERROR,

  START_FETCHING_ARTICLES_POST,
  START_FETCHING_ARTICLES_POST_SUCCESS,
  START_FETCHING_ARTICLES_POST_ERROR,

  START_FETCHING_ARTICLES_CATEGORIES,
  START_FETCHING_ARTICLES_CATEGORIES_SUCCESS,
  START_FETCHING_ARTICLES_CATEGORIES_ERROR,

  ADD_ARTICLE_POST,
  ADD_ARTICLE_POST_SUCCESS,
  ADD_ARTICLE_POST_ERROR,

  EDIT_ARTICLE_POST,
  EDIT_ARTICLE_POST_SUCCESS,
  EDIT_ARTICLE_POST_ERROR,

  EDIT_ARTICLE_CATEGORY,
  EDIT_ARTICLE_CATEGORY_SUCCESS,
  EDIT_ARTICLE_CATEGORY_ERROR,

  EDIT_ARTICLE_FEATURED,
  EDIT_ARTICLE_FEATURED_SUCCESS,
  EDIT_ARTICLE_FEATURED_ERROR,

  REMOVE_ARTICLE_POST,
  REMOVE_ARTICLE_POST_SUCCESS,
  REMOVE_ARTICLE_POST_ERROR,

  REMOVE_ARTICLE_POST_TRANSLATION,
  REMOVE_ARTICLE_POST_TRANSLATION_SUCCESS,
  REMOVE_ARTICLE_POST_TRANSLATION_ERROR,

  SET_ARTICLES_POSTS_VISIBILITY_FILTER,
  REMOVE_ARTICLES_POSTS_VISIBILITY_FILTER,
  RESET_ARTICLES_POSTS_VISIBILITY_FILTER,

  SET_ARTICLES_CATEGORIES_VISIBILITY_FILTER,
  REMOVE_CATEGORIES_POSTS_VISIBILITY_FILTER,
  RESET_CATEGORIES_POSTS_VISIBILITY_FILTER,

} from "admin/constants/articles";

import { normalize } from "normalizr";
import { articleCategoriesSchema, articleSchema, singleArticle } from "admin/actions/_schema";

// import queryGetArticles from "admin/queries/fetchArticlesPosts.graphql";
import queryFetchCategories from "admin/queries/fetchArticleCategories.graphql";

import addArticleMutation from "admin/mutations/addArticle.graphql";
import editArticleMutation from "admin/mutations/editArticle.graphql";
import editFeaturedArticleMutation from "admin/mutations/editArticleFeatured.graphql";
import editArticleCategoryMutation from "admin/mutations/editArticleCategory.graphql";
import removeArticleTranslationMutation from "admin/mutations/removeArticleTranslation.graphql";
import removeArticleMutation from "admin/mutations/removeArticle.graphql";

// export const fetchArticles = (language_id, category_id) => async (dispatch, getState, { client }) => {
//   try {
//     dispatch({ type: START_FETCHING_ARTICLES_POSTS });

//     const { data, errors } = await client.query({
//       query: queryGetArticles,
//       fetchPolicy: "cache-first",
//       variables: {
//         language_id,
//         category_id,
//       },
//     });

//     if (typeof errors !== "undefined") {
//       return dispatch({
//         type: START_FETCHING_ARTICLES_POSTS_ERROR,
//         errors,
//       });
//     }

//     console.log("ARTICLE DATA => ", data);
//     console.log("NORMALIZED =>", normalize(data, articleSchema));
//     return dispatch({
//       type: START_FETCHING_ARTICLES_POSTS_SUCCESS,
//       response: normalize(data, articleSchema),
//     });
//   } catch (e) {
//     return dispatch({
//       type: START_FETCHING_ARTICLES_POSTS_ERROR,
//       errors: e,
//     });
//   }
// };

export const fetchArticleCategories = language_id => async (dispatch, getState, { client }) => {
  dispatch({ type: START_FETCHING_ARTICLES_CATEGORIES });

  try {
    const { data, errors } = await client.query({
      query: queryFetchCategories,
      variables: {
        language_id,
      },
      fetchPolicy: "cache-first",
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: START_FETCHING_ARTICLES_CATEGORIES_ERROR,
        errors,
      });
    }

    console.log("normalized cats => ", normalize(data, articleCategoriesSchema));


    return dispatch({
      type: START_FETCHING_ARTICLES_CATEGORIES_SUCCESS,
      response: normalize(data, articleCategoriesSchema),
    });
  } catch (e) {
    return dispatch({
      type: START_FETCHING_ARTICLES_CATEGORIES_ERROR,
      errors: e,
    });
  }
};

export const addArticle = (article, duplicate) => async (dispatch, getState, { client }) => {
  dispatch({ type: ADD_ARTICLE_POST });

  try {
    // something
    const { data, errors } = await client.mutate({
      mutation: addArticleMutation,
      variables: {
        ...article,
        duplicate,
      },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: ADD_ARTICLE_POST_ERROR,
        errors,
      });
    }

    console.log("NOT DUPLICATE debug");
    console.log(normalize(data, articleSchema));
    return dispatch({
      type: ADD_ARTICLE_POST_SUCCESS,
      response: normalize(data, articleSchema),
    });
  } catch (e) {
    return dispatch({
      type: ADD_ARTICLE_POST_ERROR,
      errors: e,
    });
  }
};

export const editArticle = (id, article) => async (dispatch, getState, { client }) => {
  dispatch({ type: EDIT_ARTICLE_POST });
  try {
    const { data, errors } = await client.mutate({
      mutation: editArticleMutation,
      variables: {
        id,
        ...article,
      },
    });

    if (typeof errors !== "undefined") {
      return dispatch({
        type: EDIT_ARTICLE_POST_ERROR,
        errors,
      });
    }

    console.log("DEBUG  NORMALIZE => ", normalize(data, singleArticle));

    return dispatch({
      type: EDIT_ARTICLE_POST_SUCCESS,
      response: normalize(data, singleArticle),
      id,
    });
  } catch (e) {
    return dispatch({
      type: EDIT_ARTICLE_POST_ERROR,
      errors: e,
    });
  }
};

export const setFilterCat = ({ filter }) => ({
  type: SET_ARTICLES_CATEGORIES_VISIBILITY_FILTER,
  filter,
});

export const removeFilterCat = () => ({ type: REMOVE_CATEGORIES_POSTS_VISIBILITY_FILTER });

export const setFilter = ({ filter }) => async (dispatch) => {
  if (filter.field === "language") {
    dispatch({
      type: SET_ARTICLES_POSTS_VISIBILITY_FILTER,
      filter,
    });
    dispatch({
      type: SET_ARTICLES_CATEGORIES_VISIBILITY_FILTER,
      filter,
    });
  }


  if (filter.field === "category") {
    dispatch({
      type: SET_ARTICLES_POSTS_VISIBILITY_FILTER,
      filter,
    });
  }
};

export const removeFilter = field => async (dispatch) => {
  if (field === "language") {
    dispatch({
      type: REMOVE_ARTICLES_POSTS_VISIBILITY_FILTER,
      field,
    });
    dispatch({
      type: REMOVE_CATEGORIES_POSTS_VISIBILITY_FILTER,
      field,
    });
  }

  if (field === "category") {
    dispatch({
      type: REMOVE_ARTICLES_POSTS_VISIBILITY_FILTER,
      field,
    });
  }
};

export const resetFilter = field => async (dispatch) => {
  if (field === "language") {
    dispatch({
      type: RESET_ARTICLES_POSTS_VISIBILITY_FILTER,
      field,
    });

    dispatch({
      type: REMOVE_CATEGORIES_POSTS_VISIBILITY_FILTER,
      field,
    });
  }

  if (field === "category") {
    dispatch({
      type: RESET_ARTICLES_POSTS_VISIBILITY_FILTER,
      field,
    });
  }
};

export const toggleFeatured = (article_id, featured) => async (dispatch, getState, { client }) => {
  try {
    dispatch({ type: EDIT_ARTICLE_FEATURED });

    const { data, errors } = await client.mutate({
      mutation: editFeaturedArticleMutation,
      variables: {
        article_id,
        featured,
      },
    });


    if (typeof errors !== "undefined") {
      return dispatch({
        type: EDIT_ARTICLE_FEATURED_ERROR,
        errors,
      });
    }
    console.log("CUSTOMER DATA => ", data);
    console.log("NORMALIZED =>", normalize(data, articleSchema));

    return dispatch({
      type: EDIT_ARTICLE_FEATURED_SUCCESS,
      response: normalize(data, articleSchema),
    });
  } catch (e) {
    return dispatch({
      type: EDIT_ARTICLE_FEATURED_ERROR,
      errors: e,
    });
  }
};

export const editCategory = (article_id, category_id) => async (dispatch, getState, { client }) => {
  try {
    dispatch({ type: EDIT_ARTICLE_CATEGORY });

    const { data, errors } = await client.mutate({
      mutation: editArticleCategoryMutation,
      variables: {
        article_id,
        category_id,
      },
    });


    if (typeof errors !== "undefined") {
      return dispatch({
        type: EDIT_ARTICLE_CATEGORY_ERROR,
        errors,
      });
    }
    console.log("CUSTOMER DATA => ", data);
    console.log("NORMALIZED =>", normalize(data, articleSchema));

    return dispatch({
      type: EDIT_ARTICLE_CATEGORY_SUCCESS,
      response: normalize(data, articleSchema),
    });
  } catch (e) {
    return dispatch({
      type: EDIT_ARTICLE_CATEGORY_ERROR,
      errors: e,
    });
  }
};


export const removeArticle = article_id => async (dispatch, getState, { client }) => {
  try {
    dispatch({ type: REMOVE_ARTICLE_POST });


    const { data, errors } = await client.mutate({
      mutation: removeArticleMutation,
      variables: {
        article_id,
      },
    });


    if (typeof errors !== "undefined") {
      return dispatch({
        type: REMOVE_ARTICLE_POST_ERROR,
        errors,
      });
    }

    return dispatch({
      type: REMOVE_ARTICLE_POST_SUCCESS,
      ids: data.remove.ids,
    });
  } catch (e) {
    return dispatch({
      type: REMOVE_ARTICLE_POST_ERROR,
      errors: e,
    });
  }
};

export const removeArticleTranslation = id => async (dispatch, getState, { client }) => {
  try {
    dispatch({ type: REMOVE_ARTICLE_POST_TRANSLATION });

    const { data, errors } = await client.mutate({
      mutation: removeArticleTranslationMutation,
      variables: {
        id,
      },
    });


    if (typeof errors !== "undefined") {
      return dispatch({
        type: REMOVE_ARTICLE_POST_TRANSLATION_ERROR,
        errors,
      });
    }

    return dispatch({
      type: REMOVE_ARTICLE_POST_TRANSLATION_SUCCESS,
      id: data.remove.id,
    });
  } catch (e) {
    return dispatch({
      type: REMOVE_ARTICLE_POST_TRANSLATION_ERROR,
      errors: e,
    });
  }
};
