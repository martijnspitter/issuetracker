import React, { Component } from 'react';

import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Issue from './components/issues/Issue';
import Projects from './components/Projects/Projects';
import AddIssue from './components/issues/AddIssue';
import AddProject from './components/Projects/AddProject';
import IssueList from './components/issues/IssueList';
import Documentation from './components/Documentation';
import Navbar from './components/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';

class App extends Component {
	render() {
		return (
			<Router history={history}>
				<div>
					<Navbar
						renderAddProject={this.props.navbar.addProject}
						renderTitle={this.props.navbar.title}
						renderAddIssue={this.props.navbar.addIssue}
						renderIssueList={this.props.navbar.issueList}
					/>
					<div className="container mt-3">
						<Switch>
							<Route path="/" exact>
								<Redirect to="/issuetracker/" />
							</Route>
							<Route path="/issuetracker/" exact component={Welcome} />
							<Route path="/issuetracker/login" exact component={Login} />
							<Route path="/issuetracker/register" exact component={Register} />
							<Route path="/issuetracker/projects" exact component={Projects} />
							<Route path="/issuetracker/issuelist" exact component={IssueList} />
							<Route path="/issuetracker/issuelist/issue" exact component={Issue} />
							<Route exact path="/issuetracker/profile" component={Profile} />
							<Route exact path="/issuetracker/documentation" component={Documentation} />
							<Route exact path="/issuetracker/addissue" component={AddIssue} />
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
		navbar: state.navbar
	};
};

export default connect(mapStateToProps)(App);
