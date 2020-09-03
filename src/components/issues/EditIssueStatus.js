import React, { Component } from 'react';
import { connect } from 'react-redux';

import history from '../../history';

import { Modal, Button } from 'react-bootstrap';
import { editIssue } from '../../redux/actions';

class EditIssueStatus extends Component {
	statusClosed = async (id) => {
		const issue = this.props.issues.find((issue) => {
			return issue.id === id;
		});

		issue.status = 'Closed';

		await this.props.editIssue(id, issue);

		history.push('/issuetracker/issuelist');
	};

	statusOnHold = (id) => {
		const issue = this.props.issues.find((issue) => {
			return issue.id === id;
		});

		issue.status = 'On Hold';

		this.props.editIssue(id, issue);

		this.props.onHide();
	};

	statusOpen = (id) => {
		const issue = this.props.issues.find((issue) => {
			return issue.id === id;
		});

		issue.status = 'Open';

		this.props.editIssue(id, issue);

		this.props.onHide();
	};

	renderStatusOptions(status, issueId) {
		if (status === 'Open') {
			return (
				<React.Fragment>
					<Button variant="success" onClick={(e) => this.statusClosed(issueId)}>
						CLOSE
					</Button>
					<Button variant="warning" onClick={(e) => this.statusOnHold(issueId)}>
						ON HOLD
					</Button>
				</React.Fragment>
			);
		} else if (status === 'Closed') {
			return (
				<React.Fragment>
					<Button variant="primary" onClick={(e) => this.statusOpen(issueId)}>
						OPEN
					</Button>
					<Button variant="warning" onClick={(e) => this.statusOnHold(issueId)}>
						ON HOLD
					</Button>
				</React.Fragment>
			);
		} else if (status === 'On Hold') {
			return (
				<React.Fragment>
					<Button variant="success" onClick={(e) => this.statusClosed(issueId)}>
						CLOSE
					</Button>
					<Button variant="primary" onClick={(e) => this.statusOpen(issueId)}>
						OPEN
					</Button>
				</React.Fragment>
			);
		}
	}

	render() {
		return (
			<Modal show={this.props.show} onHide={this.props.onHide} size="lg" centered>
				<Modal.Header closeButton>{this.props.title}</Modal.Header>
				<Modal.Body>
					<div>Change issue status into:</div>
				</Modal.Body>
				<Modal.Footer>{this.renderStatusOptions(this.props.status, this.props.id)}</Modal.Footer>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		issues: Object.values(state.issues)
	};
};

export default connect(mapStateToProps, { editIssue })(EditIssueStatus);
