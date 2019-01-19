import { combineReducers } from "redux";
import auth from "./auth";
import nodes from "./nodes";
import nodesById from "./nodesById";
import errors from "./errors";

export default combineReducers({
	auth,
	nodes,
	nodesById,
	errors
});
