import { TOKEN_SUCCESS, CLEAR_TOKEN } from "../actions";

const reducer = (state = { token: undefined }, action) => {
	switch (action.type) {
		case TOKEN_SUCCESS:
			return {
				...state,
				token: action.token
			};
		case CLEAR_TOKEN:
			return {
				...state,
				token: undefined
			};
		default:
			return state;
	}
};

export default reducer;
