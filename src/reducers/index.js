import { combineReducers } from "redux";
import auth from "./auth";
import nodes from "./nodes";
import links from "./links";
import stats from "./stats";
import filters from "./filters";
import errors from "./errors";

export default combineReducers({
	auth,
	nodes,
	links,
	stats,
	filters,
	errors
});
