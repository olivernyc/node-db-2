import { fetchNodesApi } from "../api";

export const FETCH_NODES_SUCCESS = "FETCH_NODES_SUCCESS";

export async function fetchNodes(dispatch) {
	const nodes = await fetchNodesApi();
	console.log(nodes);
	dispatch({ type: FETCH_NODES_SUCCESS, nodes });
}
