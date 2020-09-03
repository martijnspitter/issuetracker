import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getIssues, editIssue } from '../../redux/actions';
import { getName } from '../getName';

import { Container, Button, Col } from 'react-bootstrap';

import history from '../../history';

import EditIssueStatus from './EditIssueStatus';
import EditIssue from './EditIssue';
import DeleteIssue from './DeleteIssue';
import AddComment from '../Comments/AddComment';

import IssueRender from './IssueRender';

class Issue extends Component {
	constructor(props) {
		super(props);

		this.closeStatusIssue = this.closeStatusIssue.bind(this);
		this.closeEditIssue = this.closeEditIssue.bind(this);
		this.closeAddComment = this.closeAddComment.bind(this);
		this.closeDeleteIssue = this.closeDeleteIssue.bind(this);

		this.state = {
			statusIssue: false,
			editIssue: false,
			addComment: false,
			issueId: null,
			issueTitle: null,
			issueStatus: null,
			deleteIssue: null
		};

		this.interval = null;
	}

	componentDidMount() {
		this.props.getIssues(this.props.selectedProject.id);

		this.interval = setInterval(() => {
			this.props.getIssues(this.props.selectedProject.id);
		}, 300000);
	}

	componentWillUnmount() {
		if (this.interval) clearInterval(this.interval);
	}

	closeStatusIssue() {
		this.setState({ statusIssue: false });
	}

	closeEditIssue() {
		this.setState({ editIssue: false });
	}

	closeAddComment() {
		this.setState({ addComment: false });
	}

	closeDeleteIssue = () => {
		this.setState({ deleteIssue: false });
		if (this.interval) clearInterval(this.interval);
		history.push('/issuetracker/issuelist');
	};

	commentButton = () => {
		this.setState({ addComment: true });
	};

	issueRenderList() {
		if (this.props.selectedIssue.id) {
			const selectedIssueId = this.props.selectedIssue.id;
			if (this.props.issues[selectedIssueId]) {
				const issue = this.props.issues[selectedIssueId];

				return (
					<IssueRender
						key={issue.id}
						id={issue.id}
						createdAt={issue.createdAt}
						owner={getName(issue.owner, this.props.users[0].users, this.props.auth.userName)}
						title={issue.title}
						assignedto={getName(issue.assignedto, this.props.users[0].users, this.props.auth.userName)}
						severity={issue.severity}
						severityColor={this.severityColor(issue.severity)}
						severityStyle={this.severityStyle(issue.severity)}
						status={issue.status}
						statusColor={this.statusColor(issue.status)}
						statusStyle={this.statusStyle(issue.status)}
						description={issue.description}
						renderOptions={this.renderOptions(issue)}
						commentButton={this.commentButton}
					/>
				);
			}
		}
	}

	severityColor(severity) {
		if (severity === 'Low') return '#28a745';
		if (severity === 'Medium') return '#fd7e14';
		if (severity === 'High') return '#dc3545';
	}

	statusColor(status) {
		if (status === 'Closed') return '#28a745';
		if (status === 'On Hold') return '#fd7e14';
		if (status === 'Open') return '#007bff';
	}

	severityStyle(severity) {
		if (severity === 'Low') return <div style={{ color: '#28a745', paddingLeft: '.6rem' }}>Priority: {severity}</div>;
		if (severity === 'Medium')
			return <div style={{ color: '#fd7e14', paddingLeft: '.6rem' }}>Priority: {severity}</div>;
		if (severity === 'High') return <div style={{ color: '#dc3545', paddingLeft: '.6rem' }}>Priority: {severity}</div>;
	}

	statusStyle(status) {
		if (status === 'Closed') return <div style={{ color: '#28a745', paddingLeft: '.6rem' }}>Status: {status}</div>;
		if (status === 'On Hold') return <div style={{ color: '#fd7e14', paddingLeft: '.6rem' }}>Status: {status}</div>;
		if (status === 'Open') return <div style={{ color: '#007bff', paddingLeft: '.6rem' }}>Status: {status}</div>;
	}

	renderOptions(issue) {
		if (this.props.auth.userId === issue.owner || this.props.auth.userId === this.props.selectedProject.owner) {
			return (
				<React.Fragment>
					<Col>
						<Button
							variant="secondary"
							onClick={() =>
								this.setState({
									statusIssue: true,
									issueId: issue.id,
									issueStatus: issue.status,
									issueTitle: issue.title
								})}
						>
							Change Status
						</Button>
					</Col>

					<Col>
						<Button variant="secondary" onClick={() => this.setState({ editIssue: true })}>
							Edit Issue
						</Button>
					</Col>
					<Col>
						<Button variant="danger" onClick={() => this.setState({ deleteIssue: true })}>
							DELETE
						</Button>
					</Col>
				</React.Fragment>
			);
		} else if (this.props.auth.userId === issue.assignedto) {
			return (
				<React.Fragment>
					<Col>
						<Button
							variant="secondary"
							onClick={() =>
								this.setState({
									statusIssue: true,
									issueId: issue.id,
									issueStatus: issue.status,
									issueTitle: issue.title
								})}
						>
							Change Status
						</Button>
					</Col>

					<Col />
					<Col />
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<Col />
					<Col />
					<Col />
				</React.Fragment>
			);
		}
	}

	render() {
		return (
			<Container>
				{this.issueRenderList()}
				<EditIssueStatus
					show={this.state.statusIssue}
					onHide={this.closeStatusIssue}
					title={this.state.issueTitle}
					id={this.state.issueId}
					status={this.state.issueStatus}
				/>
				<EditIssue show={this.state.editIssue} onHide={this.closeEditIssue} />
				<DeleteIssue show={this.state.deleteIssue} onHide={this.closeDeleteIssue} />
				<AddComment show={this.state.addComment} onHide={this.closeAddComment} />
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		issues: state.issues,
		projects: Object.values(state.projects),
		auth: state.auth,
		selectedProject: state.selectedProject,
		users: Object.values(state.projectUsers),
		selectedIssue: state.selectedIssue
	};
};

export default connect(mapStateToProps, { getIssues, editIssue })(Issue);
