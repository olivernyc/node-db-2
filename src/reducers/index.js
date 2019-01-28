import { combineReducers } from "redux";
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
	errors
});
