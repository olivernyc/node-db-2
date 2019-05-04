import { fetchNodesApi, writeNodesApi, fetchLinksApi } from "../api";
import { nodeStatus, nodeType, linkStatus } from "../utils";

export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const WRITE_NODES_SUCCESS = "WRITE_NODES_SUCCESS";
export const TOKEN_SUCCESS = "TOKEN_SUCCESS";
export const CLEAR_TOKEN = "CLEAR_TOKEN";
export const ERROR = "ERROR";
export const TOGGLE_FILTER = "TOGGLE_FILTER";
export const TOGGLE_FILTERS = "TOGGLE_FILTERS";

function getCounts(nodes) {
	const counts = {};
	nodes.forEach(node => {
		const { type } = node;
		counts[type] = (counts[type] || 0) + 1;

		if (type.indexOf("potential-") > -1 || type === "dead") {
			counts["potential"] = (counts["potential"] || 0) + 1;
		}
	});
	return counts;
}

export async function fetchData(dispatch) {
	const nodes = await fetchNodesApi();
	const links = await fetchLinksApi();

	// Add status and type to nodes
	nodes.forEach(node => {
		node.type = nodeType(node);
		node.status = nodeStatus(node);
	});

	const nodesById = nodes.reduce((acc, cur) => {
		acc[cur.id] = cur;
		return acc;
	}, {});

	// Add status and nodes to links
	links.forEach(link => {
		link.fromNode = nodesById[link.from];
		link.toNode = nodesById[link.to];
		link.status = linkStatus(link);
	});

	// Add connected nodes to nodes
	nodes.forEach(node => {
		// Calculate connected nodes
		const connectedNodes = [node.id];
		links.forEach(link => {
			if (!link.fromNode || !link.toNode) return;

			if (link.from === parseInt(node.id, 10)) {
				connectedNodes.push(link.toNode);
				node.links = node.links || [];
				node.links.push(link);
			}

			if (link.to === parseInt(node.id, 10)) {
				connectedNodes.push(link.fromNode);
				node.links = node.links || [];
				node.links.push(link);
			}
		});
		node.connectedNodes = connectedNodes;
	});

	const counts = getCounts(nodes);

	dispatch({ type: FETCH_DATA_SUCCESS, nodes, links, counts });
}


export async function writeNode(nodes, dispatch) {
	try {
		const res = await writeNodesApi(nodes);
		dispatch({ type: WRITE_NODES_SUCCESS, nodes });
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

export function toggleFilter(label, dispatch) {
	dispatch({ type: TOGGLE_FILTER, label });
}

export function toggleFilters(dispatch) {
	dispatch({ type: TOGGLE_FILTERS });
}
