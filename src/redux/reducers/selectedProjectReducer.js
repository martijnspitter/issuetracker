import { SELECTED_PROJECT } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case SELECTED_PROJECT:
			return { ...state, [action.payload.id]: action.payload };
		default:
			return state;
	}
};
