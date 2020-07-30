import { combineReducers } from 'redux';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import projectsReducer from './projectsReducer';
import issuesReducer from './issuesReducer';
import selectedProjectReducer from './selectedProjectReducer';

// auth = logged in user
// projecs = all projecs the user is part of

// users = all users on the same project
// issues = all issues on the active project

export default combineReducers({
	auth: authReducer,
	projects: projectsReducer,
	selectedProject: selectedProjectReducer,
	users: usersReducer,
	issues: issuesReducer
});
