import { ERROR, TOGGLE_FILTER, TOGGLE_FILTERS} from "../actions";

const initialFilters = {
	linkNYC: false,
	potential: false,
	dead: false,
	"potential-hub": false,
	"potential-supernode": false
};

const defaultState = {
	dead: false,
	showFilters: true,
	filters: initialFilters,
	statusCounts: {},
};

const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case TOGGLE_FILTER:
			const newFilters = {
				...state.filters,
				[action.label]:
					state.filters[action.label] === undefined
						? false
						: !state.filters[action.label]
			};
			if (action.label === "potential") {
				const hasValue = state.filters["potential"] === undefined;
				const newValue = hasValue ? false : !state.filters["potential"];
				newFilters["dead"] = newValue;
				newFilters["potential-hub"] = newValue;
				newFilters["potential-supernode"] = newValue;
			}
			return {
				...state,
				filters: newFilters,
			};

		case TOGGLE_FILTERS:
		return {
			...state,
			showFilters: !state.showFilters
		};

		default:
			return state;
	}
};

export default reducer;
