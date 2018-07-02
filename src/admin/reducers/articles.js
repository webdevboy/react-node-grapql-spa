import { combineReducers } from "redux";
import posts from "./articlesPosts";
import categories from "./articlesCategories";

export default combineReducers({
  posts,
  categories,
});
