import { SET_ADDPROJECT, CLOSE_ADDPROJECT } from '../actions/types';
import _ from 'lodash';

export default (state = { id: 0, show: false }, action) => {
	switch (action.type) {
		case SET_ADDPROJECT:
			return { ...state, [action.payload.id]: action.payload };

		case CLOSE_ADDPROJECT:
			return action.payload;

		default:
			return state;
	}
};
