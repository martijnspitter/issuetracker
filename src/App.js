import React, { Component } from 'react';

import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Issues from './components/issues/Issues';
import Projects from './components/Projects/Projects';
import AddIssue from './components/issues/AddIssue';
import AddProject from './components/Projects/AddProject';

import { signOut, getCurrentUser, fetchProjects, fetchProjectUsers, closeAddProject } from './redux/actions';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);
		this.closeAddIssue = this.closeAddIssue.bind(this);
		this.closeAddProject = this.closeAddProject.bind(this);
		this.addProject = this.addProject.bind(this);

		this.state = {
			currentUser: undefined,

			addIssueShow: false,

			addProjectShow: false
		};
	}

	closeAddIssue() {
		this.setState({ addIssueShow: false });
	}

	async componentDidMount() {
		const user = await this.props.getCurrentUser();

		if (user) {
			this.setState({
				currentUser: user,
				showModeratorBoard: user.roles.includes('ROLE_MODERATOR'),
				showAdminBoard: user.roles.includes('ROLE_ADMIN')
			});
		}
	}

	logOut() {
		this.props.signOut();
		this.setState({
			currentUser: undefined
		});
	}

	closeAddProject() {
		this.setState({ addProjectShow: false });
	}

	addProject() {
		this.props.closeAddProject({ id: 0, issue: false, project: true });
	}

	render() {
		const { currentUser } = this.state;
		const newIssue = this.props.addProject.issue;
		const newProject = this.props.addProject.project;
		const issues = window.location.pathname;

		return (
			<Router>
				<div>
					<nav className="navbar navbar-dark bg-dark">
						<div className="navbar-nav">
							<Link to={'/'} className="navbar-brand">
								IssueTracker
							</Link>
							<li className="nav-item">
								<Link to={'/issuetracker/home'} className="nav-link">
									Home
								</Link>
							</li>

							{currentUser && (
								<li className="nav-item">
									<Link to={'/issuetracker/user'} className="nav-link">
										User
									</Link>
								</li>
							)}

							{currentUser && (
								<li className="nav-item">
									<Link
										to={'/issuetracker/projects'}
										className="nav-link"
										onClick={() => {
											this.addProject();
										}}
									>
										Projects
									</Link>
								</li>
							)}

							{newProject && (
								<li className="nav-item">
									<a
										href="#"
										type="button"
										className="nav-link"
										onClick={() => this.setState({ addProjectShow: true })}
									>
										New Project
									</a>
									<AddProject show={this.state.addProjectShow} onHide={this.closeAddProject} />
								</li>
							)}

							{newIssue && (
								<li className="nav-item">
									<a href="#" type="button" className="nav-link" onClick={() => this.setState({ addIssueShow: true })}>
										New Issue
									</a>
									<AddIssue show={this.state.addIssueShow} onHide={this.closeAddIssue} />
								</li>
							)}
						</div>

						{issues === '/issuetracker/issuelist' && (
							<div className="navbar-nav center">
								<li className="nav-item">
									<div className="nav-link">{this.props.selectedProject[0].title}</div>
								</li>
							</div>
						)}

						{currentUser ? (
							<div className="navbar-nav right">
								<li className="nav-item">
									<Link to={'/issuetracker/profile'} className="nav-link">
										{currentUser.username}
									</Link>
								</li>
								<li className="nav-item">
									<a href="/issuetracker/login" className="nav-link" onClick={this.logOut}>
										LogOut
									</a>
								</li>
							</div>
						) : (
							<div className="navbar-nav right">
								<li className="nav-item">
									<Link to={'/issuetracker/login'} className="nav-link">
										Login
									</Link>
								</li>

								<li className="nav-item">
									<Link to={'/issuetracker/register'} className="nav-link">
										Sign Up
									</Link>
								</li>
							</div>
						)}
					</nav>

					<div className="container mt-3">
						<Switch>
							<Route path="/" exact>
								<Redirect to="/issuetracker/" />
							</Route>
							<Route path="/issuetracker/" exact component={Welcome} />
							<Route path="/issuetracker/login" exact component={Login} />
							<Route path="/issuetracker/register" exact component={Register} />
							<Route path="/issuetracker/projects" exact component={Projects} />
							<Route path="/issuetracker/issuelist" exact component={Issues} />
							<Route exact path="/issuetracker/profile" component={Profile} />
							<Route
								exact
								path="/issuetracker/addissue"
								render={(props) => <AddIssue {...props} closePopup={this.togglePopup} />}
							/>
							<Route exact path="/issuetracker/addproject" component={AddProject} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		selectedProject: Object.values(state.selectedProject),
		projects: Object.values(state.projects),
		auth: state.auth,
		addProject: state.addProject,
		issues: state.issues
	};
};

export default connect(mapStateToProps, { getCurrentUser, signOut, fetchProjects, fetchProjectUsers, closeAddProject })(
	App
);
