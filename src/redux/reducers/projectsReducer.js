import { CREATE_PROJECT, FETCH_PROJECTS, FETCH_PROJECT, DELETE_PROJECT, EDIT_PROJECT } from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
	switch (action.type) {
		case CREATE_PROJECT:
			return { ...state, [action.payload.id]: action.payload };
		case FETCH_PROJECT:
			return { ...state, [action.payload.id]: action.payload };
		case FETCH_PROJECTS:
			return { ...state, ..._.mapKeys(action.payload, 'id') };
		case EDIT_PROJECT:
			return { ...state, [action.payload.id]: action.payload };
		case DELETE_PROJECT:
			return _.omit(state, action.payload);
		default:
			return state;
	}
};
