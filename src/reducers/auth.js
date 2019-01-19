import { TOKEN_SUCCESS } from "../actions";

const reducer = (state = { token: undefined }, action) => {
	switch (action.type) {
		case TOKEN_SUCCESS:
			return {
				...state,
				token: action.token
			};
		default:
			return state;
	}
};

export default reducer;
