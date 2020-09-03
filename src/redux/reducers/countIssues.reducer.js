import { COUNT } from '../actions/types';

export default (state = { count: 0 }, action) => {
	switch (action.type) {
		case COUNT:
			if (state.count !== 0) {
				state.count = 0;
			}
			state.count = state.count + action.payload;
			return state;

		default:
			return state;
	}
};
