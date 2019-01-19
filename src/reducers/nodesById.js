import { FETCH_NODES_SUCCESS, FETCH_NODE_SUCCESS } from "../actions";

const reducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_NODES_SUCCESS:
			return action.nodes.reduce((acc, cur) => {
				acc[cur.id] = cur;
				return acc;
			});
		case FETCH_NODE_SUCCESS:
			return {
				...state,
				[action.node.id]: action.node
			};
		default:
			return state;
	}
};

export default reducer;
