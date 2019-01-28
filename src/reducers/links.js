import { FETCH_DATA_SUCCESS } from "../actions";

const reducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_DATA_SUCCESS:
			return action.links;

		default:
			return state;
	}
};

export default reducer;
