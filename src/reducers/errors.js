import { ERROR } from "../actions";

const reducer = (state = [], action) => {
	switch (action.type) {
		case ERROR:
			return [...state, action.error];
		default:
			return state;
	}
};

export default reducer;
