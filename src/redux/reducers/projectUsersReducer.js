import { FETCH_PROJECTUSERS, DELETE_PROJECTUSER, ADD_PROJECTUSER } from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
	switch (action.type) {
		case ADD_PROJECTUSER:
			return { ...state, [action.payload.id]: action.payload };

		case FETCH_PROJECTUSERS:
			return { ...state, ..._.mapKeys(action.payload, 'id') };

		case DELETE_PROJECTUSER:
			return _.omit(state, action.payload);
		default:
			return state;
	}
};
