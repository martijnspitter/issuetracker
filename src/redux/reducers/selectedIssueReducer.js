import { SELECTED_ISSUE } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case SELECTED_ISSUE:
			return { [action.payload.id]: action.payload };
		default:
			return state;
	}
};
