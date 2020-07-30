import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import { createSelectedProject } from '../redux/actions';
import Projects from './Projects';
import AddIssue from './AddIssue';
import Issues from './Issues';
import logo from '../images/logo.svg';
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';

class IssueTracker extends Component {
	constructor(props) {
		super(props);
		this.state = { showPopup: false, showProjects: false };
		this.togglePopup = this.togglePopup.bind(this);
		this.toggleProjects = this.toggleProjects.bind(this);
	}

	togglePopup() {
		this.setState({ showPopup: !this.state.showPopup });
	}

	toggleProjects() {
		this.setState({ showProjects: !this.state.showProjects });
	}

	selectedProject = () => {
		const project = this.props.project;
		console.log(project);
		if (project[0] === [] || project === []) {
			return 'Please select a project';
		} else {
			return project.title;
		}
	};

	componentDidMount() {
		const project = {
			id: 1,
			owner: 1,
			github: 'empty',
			description: 'empty',
			title: 'Please select a project first'
		};

		// because we await a response this does not work. We can add some logic but we will move this to the login. By the time we get back to here we already have loaded it.
		this.props.createSelectedProject(project);
		console.log(this.props.project);
	}

	render() {
		return (
			<div className="it-container">
				<Router history={history}>
					<header className="it-header">
						<img src={logo} className="it-header__logo" alt="logo" />
						<h1 className="it-header__title">Issue Tracker</h1>
						<p className="it-header__login">dummy login</p>
					</header>
					<div className="it-content">
						<div className="it-navbar">
							<div>
								<ul className="it-navbar__list">
									<li className="it-navbar__item">
										<button onClick={this.toggleProjects} className="it-navbar__link btn btn--white">
											Projects
										</button>
										{this.state.showProjects ? <Projects onDismiss={this.toggleProjects} /> : null}
									</li>
									<li className="it-navbar__item">
										<button className="it-navbar__link btn btn--white">Users</button>
									</li>
									<li className="it-navbar__item">
										<button className="it-navbar__link btn btn--white">Open</button>
									</li>
									<li className="it-navbar__item">
										<button className="it-navbar__link btn btn--white">On Hold</button>
									</li>
									<li className="it-navbar__item">
										<button className="it-navbar__link btn btn--white">Closed</button>
									</li>
								</ul>
							</div>
							<div>
								<button onClick={this.togglePopup} className="it-navbar__add btn">
									<span className="material-icons it-navbar__add--icon">add_circle</span>
								</button>
								{this.state.showPopup ? <AddIssue closePopup={this.togglePopup} /> : null}
							</div>
						</div>
						<div className="it-issuelist" id="it-issuelist">
							<div className="selectedProject">
								<div className="selected-project__name">Selected Project: </div>
							</div>
							<Switch>
								<Route path="/issuetracker/" exact component={Welcome} />
								<Route path="/issuetracker/login" exact component={Login} />
								<Route path="/issuetracker/register" exact component={Register} />
								<Route path="/issuetracker/projects" exact component={Projects} />
								<Route path="/issuetracker/issuelist" exact component={Issues} />
							</Switch>
						</div>
					</div>
				</Router>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		project: Object.values(state.selectedProject)
	};
};

export default connect(mapStateToProps, { createSelectedProject })(IssueTracker);
