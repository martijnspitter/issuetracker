import { CREATE_ISSUE, FETCH_ISSUES, FETCH_ISSUE, DELETE_ISSUE, EDIT_ISSUE } from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
	switch (action.type) {
		case CREATE_ISSUE:
			return { ...state, [action.payload.id]: action.payload };
		case FETCH_ISSUE:
			return { ...state, [action.payload.id]: action.payload };
		case FETCH_ISSUES:
			return { ...state, ..._.mapKeys(action.payload, 'id') };
		case EDIT_ISSUE:
			return { ...state, [action.payload.id]: action.payload };
		case DELETE_ISSUE:
			return _.omit(state, action.payload);
		default:
			return state;
	}
};
