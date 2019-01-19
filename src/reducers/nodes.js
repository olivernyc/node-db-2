import { FETCH_NODES_SUCCESS } from "../actions";

const reducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_NODES_SUCCESS:
			return action.nodes;
		default:
			return state;
	}
};

export default reducer;
