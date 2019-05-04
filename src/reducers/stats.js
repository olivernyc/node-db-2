import { FETCH_DATA_SUCCESS } from "../actions";

const defaultState = {
    counts: {},
}

const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case FETCH_DATA_SUCCESS:
			return state.counts = action.counts;

		default:
			return state;
	}
};

export default reducer;
