import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_ISSUE,
	FETCH_ISSUES,
	EDIT_ISSUE,
	DELETE_ISSUE,
	FETCH_PROJECTS,
	SELECTED_PROJECT,
	SELECTED_ISSUE,
	CREATE_PROJECT,
	DELETE_PROJECT,
	EDIT_PROJECT,
	FETCH_USERS,
	FETCH_PROJECTUSERS,
	DELETE_PROJECTUSER,
	ADD_PROJECTUSER,
	CLOSE_ADDPROJECT,
	SET_ADDPROJECT,
	EDIT_COMMENT,
	DELETE_COMMENT,
	CREATE_COMMENT
} from './types';
import history from '../../history';
import axios from '../../api/axios';
import authHeader from './authHeader';

// AUTH
export const signIn = (username, password) => async (dispatch) => {
	const response = await axios.post('/auth/signin', { username, password });

	if (response.data.accessToken) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}
	dispatch({
		type: SIGN_IN,
		payload: response.data
	});
};

export const signOut = () => {
	localStorage.removeItem('user');
	return {
		type: SIGN_OUT
	};
};

export const registerUser = (username, email, password) => async () => {
	return await axios.post('/auth/signup', { username, email, password });
};

// USERS
export const getCurrentUser = () => async (dispatch) => {
	const user = await JSON.parse(localStorage.getItem('user'));

	if (user) {
		dispatch({
			type: SIGN_IN,
			payload: user
		});
	}

	return user;
};

export const fetchAllUsers = () => async (dispatch) => {
	const response = await axios.get('/user/usernames/names', { headers: authHeader() });

	dispatch({
		type: FETCH_USERS,
		payload: response.data
	});
};

// PROJECT USERS
export const fetchProjectUsers = (projectId) => async (dispatch) => {
	const response = await axios.get(`/user/projectusers/${projectId}`, { headers: authHeader() });

	dispatch({
		type: FETCH_PROJECTUSERS,
		payload: response.data
	});
};

export const addProjectUsers = (projectId, users) => async () => {
	await axios.post(`/user/projectusers/add/${projectId}`, users, { headers: authHeader() });
};

export const deleteProjectUsers = (projectId, users) => async () => {
	await axios.post(`/user/projectusers/delete/${projectId}`, users, { headers: authHeader() });
};

// ISSUES
export const createIssue = (issue) => async (dispatch) => {
	const response = await axios.post('/issues/create', issue, { headers: authHeader() });

	// adding comments to response because render comments in Issues.js needs an empty array
	response.data.comments = [];

	dispatch({
		type: CREATE_ISSUE,
		payload: response.data
	});
};

export const getIssues = (projectId) => async (dispatch) => {
	const response = await axios.get(`projects/select/${projectId}`, { headers: authHeader() });

	dispatch({
		type: FETCH_ISSUES,
		payload: response.data
	});
};

export const deleteIssue = (id) => async (dispatch) => {
	await axios.delete(`/issues/delete/${id}`, { headers: authHeader() });

	dispatch({
		type: DELETE_ISSUE,
		payload: id
	});
};

export const editIssue = (id, issue) => async (dispatch) => {
	await axios.put(`/issues/update/${id}`, issue, { headers: authHeader() });

	dispatch({
		type: EDIT_ISSUE,
		payload: issue
	});
};

// COMMENTS
export const deleteComment = (id) => async (dispatch) => {
	await axios.delete(`/issues/comments/delete/${id}`, { headers: authHeader() });

	// dispatch({
	// 	type: DELETE_COMMENT,
	// 	payload: id
	// });
};

export const editComment = (id, comment) => async (dispatch) => {
	await axios.put(`/issues/comments/update/${id}`, comment, { headers: authHeader() });

	// dispatch({
	// 	type: EDIT_COMMENT,
	// 	payload: comment
	// });
};

export const createComment = (comment) => async (dispatch) => {
	const response = await axios.post('/issues/comments/create', comment, { headers: authHeader() });

	// dispatch({
	// 	type: CREATE_COMMENT,
	// 	payload: response.data
	// });
};

// PROJECTS
export const fetchProjects = (id) => async (dispatch) => {
	const response = await axios.get(`/projects/${id}`, { headers: authHeader() });

	dispatch({
		type: FETCH_PROJECTS,
		payload: response.data
	});
};

export const deleteProject = (id) => async (dispatch) => {
	await axios.delete(`/projects/delete/${id}`, { headers: authHeader() });

	dispatch({
		type: DELETE_PROJECT,
		payload: id
	});
};

export const editProject = (id, project) => async (dispatch) => {
	await axios.put(`/projects/update/${id}`, project, { headers: authHeader() });

	dispatch({
		type: EDIT_PROJECT,
		payload: project
	});
};

export const createProject = (project) => async (dispatch) => {
	const response = await axios.post(`/projects/create`, project, { headers: authHeader() });

	const projectId = response.data.id;
	const projectUsers = await axios.get(`/user/projectusers/${projectId}`, { headers: authHeader() });

	dispatch({
		type: FETCH_PROJECTUSERS,
		payload: projectUsers.data
	});
	dispatch({
		type: CREATE_PROJECT,
		payload: response.data
	});
};

// SELECTED PROJECT & ISSUE
export const selectedProject = (project) => (dispatch) => {
	dispatch({
		type: SELECTED_PROJECT,
		payload: project
	});
};

export const selectedIssue = (issue) => (dispatch) => {
	dispatch({
		type: SELECTED_ISSUE,
		payload: issue
	});
};

// ADDPROJECT
export const setAddProject = (set) => (dispatch) => {
	dispatch({
		type: SET_ADDPROJECT,
		payload: set
	});
};

export const closeAddProject = (set) => (dispatch) => {
	dispatch({
		type: CLOSE_ADDPROJECT,
		payload: set
	});
};
