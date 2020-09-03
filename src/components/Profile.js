import React, { Component } from 'react';
import { getCurrentUser, fetchProjectUsers, fetchProjects, setNavbar } from '../redux/actions/index.js';
import { connect } from 'react-redux';
import history from '../history';
import { Card, Container, Button } from 'react-bootstrap';

class Profile extends Component {
	componentDidMount() {
		// adding delay to wait for data from projects fetch in login component
		setTimeout(() => {
			this.props.projects.map((project) => {
				return this.props.fetchProjectUsers(project.id);
			});
		}, 500);
	}

	numberOfProjects() {
		if (this.props.projects.length === 1) {
			return (
				<div style={{ display: 'flex', marginTop: '2rem' }}>
					That project has a total of&nbsp;{this.numberofIssues()}
				</div>
			);
		} else {
			return (
				<div style={{ display: 'flex', marginTop: '2rem' }}>
					Those projects have a total of&nbsp;{this.numberofIssues()}
				</div>
			);
		}
	}

	numberofIssues() {
		var issues = this.props.projects.map((project) => project.issues);

		var issuesLength = issues.map((arr) => {
			return arr.length;
		});
		var count = issuesLength.reduce((a, b) => a + b, 0);

		if (count === 1) {
			return (
				<div style={{ display: 'flex' }}>
					<div className="text-info">1&nbsp;</div> issue.
				</div>
			);
		} else {
			return (
				<div style={{ display: 'flex' }}>
					<div className="text-info">{count}&nbsp;</div> issues.
				</div>
			);
		}
	}

	renderProjects() {
		if (this.props.projects.length === 1) {
			return (
				<div style={{ display: 'flex', marginTop: '2rem' }}>
					You are currently a member of <div className="text-info">&nbsp;{this.props.projects.length}&nbsp;</div>
					project.
				</div>
			);
		} else {
			return (
				<div style={{ display: 'flex', marginTop: '2rem' }}>
					You are currently a member of <div className="text-info">&nbsp;{this.props.projects.length}&nbsp;</div>
					projects.
				</div>
			);
		}
	}

	navProjects() {
		this.props.projects.map((project) => {
			return this.props.fetchProjectUsers(project.id);
		});
		this.props.setNavbar({ addProject: true, addIssue: false, issueList: false, title: false, login: true });
		history.push('/issuetracker/projects');
	}

	navDocumentation() {
		this.props.setNavbar({ addProject: false, addIssue: false, issueList: false, title: false, login: true });
		history.push('/issuetracker/documentation');
	}

	render() {
		return (
			<Container style={{ display: 'flex', justifyContent: 'center' }}>
				<Card style={{ width: '60%' }}>
					<Card.Header>Welcome {this.props.auth.userName}!</Card.Header>

					<Card.Body>
						{this.renderProjects()}

						{this.numberOfProjects()}
						<div style={{ marginTop: '4rem' }}>Better start cracking!</div>
					</Card.Body>
					<Card.Footer style={{ justifyContent: 'space-evenly' }}>
						<Button onClick={() => this.navProjects()}>Go to Projects</Button>
						<Button onClick={() => this.navDocumentation()}>See Documentation</Button>
					</Card.Footer>
				</Card>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		projects: Object.values(state.projects),
		projectUsers: Object.values(state.projectUsers)
	};
};

export default connect(mapStateToProps, { getCurrentUser, fetchProjectUsers, fetchProjects, setNavbar })(Profile);
