import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import auth from "./auth";
import nodes from "./nodes";
import links from "./links";
import filters from "./filters";
import errors from "./errors";

export default combineReducers({
  auth,
  nodes,
  links,
  filters,
  errors,
  firebase: firebaseReducer
});
