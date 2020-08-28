import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INTIAL_STATE = {
	isSignedIn: false,
	userId: null,
	userName: null,
	accessToken: null
};

export default (state = INTIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				isSignedIn: true,
				userId: action.payload.id,
				userName: action.payload.username,
				accessToken: action.payload.accessToken
			};
		case SIGN_OUT:
			return { ...state, isSignedIn: false, userId: null, userName: null, actionToken: null };
		default:
			return state;
	}
};
