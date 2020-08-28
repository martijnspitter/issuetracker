import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getIssues, editIssue, selectedIssue } from '../../redux/actions';
import { Card, Container, Button, ListGroup, Col, Row } from 'react-bootstrap';

import EditIssueStatus from './EditIssueStatus';
import EditIssue from './EditIssue';
import DeleteIssue from './DeleteIssue';
import AddComment from './AddComment';

class Issues extends Component {
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
	}

	componentDidMount() {
		this.props.getIssues(this.props.selectedProject[0].id);
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
	};

	editIssue = (issue) => {
		this.setState({ editIssue: true });
		this.props.selectedIssue(issue);
	};

	deleteIssue = (issue) => {
		this.setState({ deleteIssue: true });
		this.props.selectedIssue(issue);
	};

	addComment = (issue) => {
		this.setState({ addComment: true });
		this.props.selectedIssue(issue);
	};

	getName(assignedto) {
		// get name from projectUsers (as users) on issue.assigned to
		var result;
		this.props.users[0].users.find((user) => {
			if (user.id === assignedto) {
				result = user.username;
			}
		});
		// change username to 'You'
		if (result === this.props.auth.userName) {
			result = 'You';
		}

		return result;
	}

	renderName(assignedto) {
		if (this.props.auth.userId === assignedto) {
			return (
				<ListGroup.Item variant="dark" className="card__assignedto" style={{ color: '#007bff' }}>
					Assigned to {this.getName(assignedto)}
				</ListGroup.Item>
			);
		} else {
			return (
				<ListGroup.Item variant="dark" className="card__assignedto">
					Assigned to {this.getName(assignedto)}
				</ListGroup.Item>
			);
		}
	}

	renderOptions(issue) {
		if (this.props.auth.userId === issue.owner) {
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
						<Button variant="secondary" onClick={() => this.editIssue(issue)}>
							Edit Issue
						</Button>
					</Col>
					<Col>
						<Button variant="danger" onClick={() => this.deleteIssue(issue)}>
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

	renderSeverity(issue) {
		if (issue.severity === 'Low') {
			return (
				<ListGroup.Item variant="dark" className=" card__severity" style={{ color: '#28a745' }}>
					{issue.severity} priority
				</ListGroup.Item>
			);
		} else if (issue.severity === 'Medium') {
			return (
				<ListGroup.Item variant="dark" className=" card__severity" style={{ color: '#ffc107' }}>
					{issue.severity} priority
				</ListGroup.Item>
			);
		} else if (issue.severity === 'High') {
			return (
				<ListGroup.Item variant="dark" className=" card__severity" style={{ color: '#dc3545' }}>
					{issue.severity} priority
				</ListGroup.Item>
			);
		}
	}

	renderStatus(status) {
		if (status === 'Closed') {
			return (
				<ListGroup.Item variant="dark" className="card__status" style={{ color: '#28a745' }}>
					Status: {status}
				</ListGroup.Item>
			);
		} else if (status === 'Open') {
			return (
				<ListGroup.Item variant="dark" className="card__status" style={{ color: '#007bff' }}>
					Status: {status}
				</ListGroup.Item>
			);
		} else if (status === 'On Hold') {
			return (
				<ListGroup.Item variant="dark" className="card__status" style={{ color: '#dc3545' }}>
					Status: {status}
				</ListGroup.Item>
			);
		}
	}

	renderComments(issue) {
		if (!issue.comments[0] || !issue.comments) {
			return null;
		} else {
			return (
				<div style={{ marginTop: '1rem' }}>
					Comments:
					{issue.comments.map((comment) => {
						const id = comment.id;
						return (
							<Card border="secondary">
								<Card.Header>{this.getName(id)}</Card.Header>
								<Card.Body>{comment.comment}</Card.Body>
							</Card>
						);
					})}
				</div>
			);
		}
	}

	renderList = () => {
		return this.props.issues.map((issue) => {
			return (
				<Card key={issue.id} style={{ width: '100%' }}>
					<Card.Header>
						{this.renderStatus(issue.status)}
						{this.renderSeverity(issue)}
						{this.renderName(issue.assignedto)}
					</Card.Header>
					<Card.Body>
						<div className="card__title">
							<strong>{issue.title}</strong>
						</div>
						<div className="card__description">{issue.description}</div>
						<div className="card__details">
							Issue #{issue.id}. Created at: {issue.createdAt}
						</div>
						{this.renderComments(issue)}
					</Card.Body>
					<Card.Footer>
						<Container style={{ marginTop: 0 }}>
							<Row>
								<Col>
									<Button variant="secondary" onClick={() => this.addComment(issue)}>
										Comment
									</Button>
								</Col>
								{this.renderOptions(issue)}
							</Row>
						</Container>
					</Card.Footer>
				</Card>
			);
		});
	};

	render() {
		return (
			<Container>
				{this.renderList()}
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
		issues: Object.values(state.issues),
		projects: Object.values(state.projects),
		auth: state.auth,
		selectedProject: Object.values(state.selectedProject),
		users: Object.values(state.projectUsers)
	};
};

export default connect(mapStateToProps, { getIssues, editIssue, selectedIssue })(Issues);
