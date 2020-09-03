import { SET_NAVBAR } from '../actions/types';

export default (state = { addProject: false, addIssue: false, issueList: false, title: false }, action) => {
	switch (action.type) {
		case SET_NAVBAR:
			return action.payload;

		default:
			return state;
	}
};
