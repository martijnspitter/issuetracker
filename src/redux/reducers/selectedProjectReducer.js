import { SELECTED_PROJECT } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case SELECTED_PROJECT:
			return { [action.payload.id]: action.payload };
		default:
			return state;
	}
};
