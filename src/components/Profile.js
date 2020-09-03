import React, { Component } from 'react';
import { getCurrentUser, fetchProjectUsers, fetchProjects, setNavbar } from '../redux/actions/index.js';
import { connect } from 'react-redux';
import history from '../history';
import { Card, Container, Button } from 'react-bootstrap';

class Profile extends Component {
	async componentDidMount() {
		await this.props.fetchProjects(this.props.auth.userId);
		this.props.projects.map((project) => {
			return this.props.fetchProjectUsers(project.id);
		});
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
		console.log(this.props.projects);

		var issues = this.props.projects.map((project) => project.issues);
		console.log(issues);
		var issuesLength = issues.map((arr) => {
			console.log(arr.length);
			return arr.length;
		});
		var count = issuesLength.reduce((a, b) => a + b, 0);
		console.log(count);

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
		this.props.setNavbar({ addProject: true, addIssue: false, issueList: false, title: false });
		history.push('/issuetracker/projects');
	}

	navDocumentation() {
		this.props.setNavbar({ addProject: false, addIssue: false, issueList: false, title: false });
		history.push('/issuetracker/documentation');
	}

	render() {
		return (
			<Container style={{ display: 'flex', justifyContent: 'center' }}>
				<Card style={{ width: '60%' }}>
					<Card.Header>Welcome {this.props.auth.userName}!</Card.Header>

					<Card.Body>
						{this.renderProjects()}
						<div style={{ display: 'flex', marginTop: '2rem' }}>
							That is including the Project belonging to this IssueTracker application. <br /> For more info visit the
							documentation.
						</div>
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
		issueCount: state.issueCount
	};
};

export default connect(mapStateToProps, { getCurrentUser, fetchProjectUsers, fetchProjects, setNavbar })(Profile);
