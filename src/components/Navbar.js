import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AddIssue from './issues/AddIssue';
import AddProject from './Projects/AddProject';

import logo from '../images/logo.svg';

import { signOut, getCurrentUser, setNavbar, removeIssues } from '../redux/actions';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);
		this.closeAddIssue = this.closeAddIssue.bind(this);
		this.closeAddProject = this.closeAddProject.bind(this);

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
				currentUser: user
			});
		}
	}

	componentWillUnmount() {
		this.logOut();
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

	clickProjects() {
		this.props.setNavbar({
			addProject: true,
			addIssue: false,
			issueList: false,
			title: false,
			login: true
		});
		this.props.removeIssues({});
	}

	render() {
		const currentUser = this.props.renderLogin;
		const newProject = this.props.renderAddProject;
		const newIssue = this.props.renderAddIssue;
		const projectTitle = this.props.renderTitle;
		const issueList = this.props.renderIssueList;

		return (
			<nav className="navbar navbar-dark bg-dark" style={{ width: '100%', alignItems: 'center' }}>
				<div className="navbar-nav">
					<Link to={'/'} style={{ display: 'flex', alignItems: 'center' }}>
						<img
							src={logo}
							alt="martijnspitter.nl logo"
							className="cvlogo"
							style={{ width: '3rem', height: '3rem', marginRight: '1rem' }}
						/>
					</Link>
					<Link
						to={'/issuetracker/documentation'}
						className="navbar-brand"
						onClick={() =>
							this.props.setNavbar({
								addProject: false,
								addIssue: false,
								issueList: false,
								title: false,
								login: true
							})}
					>
						IssueTracker
					</Link>

					{currentUser && (
						<li className="nav-item">
							<Link to={'/issuetracker/projects'} className="nav-link" onClick={() => this.clickProjects()}>
								Projects
							</Link>
						</li>
					)}

					{newProject && (
						<li className="nav-item">
							<Link
								to={'/issuetracker/projects'}
								className="nav-link"
								onClick={() => this.setState({ addProjectShow: true })}
							>
								New Project
							</Link>
							<AddProject show={this.state.addProjectShow} onHide={this.closeAddProject} />
						</li>
					)}

					{issueList && (
						<li className="nav-item">
							<Link
								to={'/issuetracker/issuelist'}
								className="nav-link"
								onClick={() =>
									this.props.setNavbar({
										addProject: false,
										addIssue: true,
										issueList: true,
										title: false,
										login: true
									})}
							>
								IssueList
							</Link>
						</li>
					)}

					{newIssue && (
						<li className="nav-item">
							<Link
								to={'/issuetracker/issuelist'}
								className="nav-link"
								onClick={() => this.setState({ addIssueShow: true })}
							>
								New Issue
							</Link>
							<AddIssue show={this.state.addIssueShow} onHide={this.closeAddIssue} />
						</li>
					)}
				</div>

				{projectTitle && (
					<div className="navbar-nav center">
						<li className="nav-item">
							<div className="nav-link">Project: {projectTitle}</div>
						</li>
					</div>
				)}

				{currentUser ? (
					<div className="navbar-nav right">
						<li className="nav-item">
							<Link
								to={'/issuetracker/profile'}
								className="nav-link"
								onClick={() =>
									this.props.setNavbar({
										addProject: false,
										addIssue: false,
										issueList: false,
										title: false,
										login: true
									})}
							>
								{this.props.auth.userName}
							</Link>
						</li>
						<li className="nav-item">
							<Link to={'/issuetracker/login'} className="nav-link" onClick={this.logOut}>
								LogOut
							</Link>
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
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps, { signOut, getCurrentUser, setNavbar, removeIssues })(Navbar);
