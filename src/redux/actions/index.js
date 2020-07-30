import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_ISSUE,
	FETCH_ISSUE,
	FETCH_ISSUES,
	EDIT_ISSUE,
	DELETE_ISSUE,
	FETCH_PROJECTS,
	SELECTED_PROJECT
} from './types';
import history from '../../history';
import axios from '../../api/axios';

export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT
	};
};

export const createIssue = (formValues) => async (dispatch) => {
	// after implementing login:
	//const owner = getState().auth.userID;
	//formValues.owner = owner;
	const response = await axios.post('/addissue', formValues);

	formValues.id = response.data.insertId;
	console.log(formValues);

	dispatch({
		type: CREATE_ISSUE,
		payload: formValues
	});
};

export const fetchIssues = () => async (dispatch) => {
	const response = await axios.get('/issues');

	dispatch({
		type: FETCH_ISSUES,
		payload: response.data
	});
};

export const deleteIssue = (id) => async (dispatch) => {
	await axios.delete(`/issue/delete/${id}`);

	dispatch({
		type: DELETE_ISSUE,
		payload: id
	});
};

export const editIssue = (id, issue) => async (dispatch) => {
	await axios.put(`/issues/${id}`, issue);

	dispatch({
		type: EDIT_ISSUE,
		payload: issue
	});
};

export const fetchProjects = () => async (dispatch) => {
	const response = await axios.get('/projects');

	dispatch({
		type: FETCH_PROJECTS,
		payload: response.data
	});
};

export const selectedProject = (owner) => async (dispatch) => {
	const response = await axios.get(`/project/${owner}`);

	dispatch({
		type: SELECTED_PROJECT,
		payload: response.data
	});
};

export const selectProject = (id, project) => async (dispatch) => {
	const response = await axios.put(`/project/${id}`, project);

	dispatch({
		type: SELECTED_PROJECT,
		payload: project
	});
};

export const createSelectedProject = (project) => async (dispatch) => {
	const response = await axios.post(`/addselectedproject`, project);

	dispatch({
		type: SELECTED_PROJECT,
		payload: project
	});
};

// export const createStream = (formValues) => async (dispatch, getState) => {
// 	const { userId } = getState().auth;
// 	const response = await streams.post('/streams', { ...formValues, userId });

// 	dispatch({
// 		type: CREATE_STREAM,
// 		payload: response.data
// 	});

// 	// programtic navigation upon submit back to streamlist
// 	// difficult to get acces to the history of the routerbrowser since we are not in a component and routerbrowser has control over the history object
// 	// we are gonna create the history object so we have control and can easaly import it
// 	// so now we switch to a plain Router instead of BrowserRouter en use our own history file on that

// 	history.push('/');

// 	//the push is how we navigate the user around. the path is as usual a string
// };

// export const fetchStream = (id) => async (dispatch) => {
// 	const response = await streams.get(`/streams/${id}`);

// 	dispatch({
// 		type: FETCH_STREAM,
// 		payload: response.data
// 	});
// };

// export const editStream = (id, formValues) => async (dispatch) => {
// 	const response = await streams.patch(`/streams/${id}`, formValues);
// 	//put updates all record. Patch only updates some records.
// 	dispatch({
// 		type: EDIT_STREAM,
// 		payload: response.data
// 	});
// 	history.push('/');
// };
