import { fetchNodesApi, fetchNodeApi } from "../api";

export const FETCH_NODES_SUCCESS = "FETCH_NODES_SUCCESS";
export const FETCH_NODE_SUCCESS = "FETCH_NODE_SUCCESS";
export const TOKEN_SUCCESS = "TOKEN_SUCCESS";
export const CLEAR_TOKEN = "CLEAR_TOKEN";
export const ERROR = "ERROR";

export async function fetchNodes(dispatch) {
	try {
		const nodes = await fetchNodesApi();
		dispatch({ type: FETCH_NODES_SUCCESS, nodes });
	} catch (error) {
		if (error.status === 401) {
			dispatch({ type: CLEAR_TOKEN });
		}
		dispatch({ type: ERROR, error });
	}
}

export async function fetchNode(node, dispatch) {
	try {
		const nodeData = await fetchNodeApi(node);
		dispatch({ type: FETCH_NODE_SUCCESS, node: nodeData });
		console.log(nodeData);
	} catch (error) {
		if (error.status === 401) {
			dispatch({ type: CLEAR_TOKEN });
		}
		dispatch({ type: ERROR, error });
	}
}

export function setToken(token, dispatch) {
	dispatch({ type: TOKEN_SUCCESS, token });
}
