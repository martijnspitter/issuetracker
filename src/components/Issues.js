import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchIssues, deleteIssue, editIssue } from '../redux/actions';

class Issues extends Component {
	componentDidMount() {
		this.props.fetchIssues();
	}

	statusClosed = (id) => {
		const issue = this.props.issues.find((issue) => {
			if (issue.id === id) {
				return issue;
			}
		});

		issue.status = 'Closed';

		this.props.editIssue(id, issue);
	};

	statusOnHold = (id) => {
		const issue = this.props.issues.find((issue) => {
			if (issue.id === id) {
				return issue;
			}
		});

		issue.status = 'On Hold';

		this.props.editIssue(id, issue);
	};

	deleteIssue = (id) => {
		this.props.deleteIssue(id);
	};

	renderList = () => {
		const project = this.props.project;

		if (project[0] === []) {
			return (
				<div className="container">
					<div className="legend">
						<div className="legend__label">STATUS</div>
						<div className="legend__title">TITLE</div>
						<div className="legend__description">DESCRIPTION</div>
						<div className="legend__severity">SEVERITY</div>
						<div className="legend__assigned">ASSIGNED TO</div>

						<div className="legend__button">OPTIONS</div>
					</div>
					{this.props.issues.map((issue) => {
						return (
							<div className="issue-container" key={issue.id}>
								<div className="issue__label">{issue.status}</div>
								<h1 className="issue__title">{issue.title}</h1>
								<div className="issue__description">{issue.description}</div>
								<div className="issue__severity">{issue.severity}</div>
								<div className="issue__assigned">{issue.assignedto}</div>
								<div className="issue__buttons">
									<button onClick={(e) => this.statusClosed(issue.id)} className="button button--blue">
										CLOSE
									</button>
									<button onClick={(e) => this.statusOnHold(issue.id)} className="button button--orange">
										ON HOLD
									</button>
									<button onClick={(e) => this.deleteIssue(issue.id)} className="button button--red">
										DELETE
									</button>
								</div>
							</div>
						);
					})}
				</div>
			);
		}
	};

	render() {
		return <div className="issuelist-container">{this.renderList()}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		issues: Object.values(state.issues),
		project: Object.values(state.selectedProject)
	};
};

export default connect(mapStateToProps, { fetchIssues, deleteIssue, editIssue })(Issues);
