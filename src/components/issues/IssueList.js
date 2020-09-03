import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getName } from '../getName';
import { getIssues, selectIssue, setNavbar } from '../../redux/actions';

import { Container, ListGroup, Row, Col, OverlayTrigger, Popover } from 'react-bootstrap';

import IssueListRender from './IssueListRender';

class IssueList extends Component {
	constructor(props) {
		super(props);

		this.interval = null;

		this.state = {
			order: 'Open'
		};
	}
	async componentDidMount() {
		await this.props.getIssues(this.props.selectedProject.id);
		this.sortOrder(this.state.order);
		this.interval = setInterval(async () => {
			await this.props.getIssues(this.props.selectedProject.id);

			this.sortOrder(this.state.order);
		}, 300000);
	}

	componentWillUnmount() {
		if (this.interval) clearInterval(this.interval);
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

	descriptionLength(description) {
		if (description.length >= 250) {
			const trimmedDescription = description.substring(0, 250);
			const dots = trimmedDescription + ' ...';
			return dots;
		} else {
			return description;
		}
	}

	chooseStatus() {
		if (this.state.order === 'High' || this.state.order === 'Medium' || this.state.order === 'Low') {
			this.setState({ order: 'Open' }, () => this.sortOrder(this.state.order));
		}
		if (this.state.order === 'Open') {
			this.setState({ order: 'On Hold' }, () => this.sortOrder(this.state.order));
		}
		if (this.state.order === 'On Hold') {
			this.setState({ order: 'Closed' }, () => this.sortOrder(this.state.order));
		}
		if (this.state.order === 'Closed') {
			this.setState({ order: 'Open' }, () => this.sortOrder(this.state.order));
		}
	}

	chooseSeverity() {
		if (this.state.order === 'Open' || this.state.order === 'On Hold' || this.state.order === 'Closed') {
			this.setState({ order: 'High' }, () => this.sortOrder(this.state.order));
		}
		if (this.state.order === 'High') {
			this.setState({ order: 'Medium' }, () => this.sortOrder(this.state.order));
		}
		if (this.state.order === 'Medium') {
			this.setState({ order: 'Low' }, () => this.sortOrder(this.state.order));
		}
		if (this.state.order === 'Low') {
			this.setState({ order: 'High' }, () => this.sortOrder(this.state.order));
		}
	}

	sortOrder(order) {
		if (order === 'Open' || order === 'On Hold' || order === 'Closed') {
			const compareStatus = (a, b) => {
				if (a.status === order) return -1;
				if (a.status < b.status) return 1;
				if (a.status > b.status) return -1;

				return 0;
			};

			return this.props.issues.sort(compareStatus);
		} else {
			const compareSeverity = (a, b) => {
				if (a.severity === order) return -1;
				if (a.severity < b.severity) return 1;
				if (a.severity > b.severity) return -1;

				return 0;
			};
			return this.props.issues.sort(compareSeverity);
		}
	}

	issueListRender() {
		return this.props.issues.map((issue) => {
			return (
				<IssueListRender
					key={issue.id}
					status={issue.status}
					severity={issue.severity}
					id={issue.id}
					title={issue.title}
					owner={getName(issue.owner, this.props.users[0].users, this.props.auth.userName)}
					createdAt={issue.createdAt}
					assignedto={getName(issue.assignedto, this.props.users[0].users, this.props.auth.userName)}
					severityColor={this.severityColor(issue.severity)}
					statusColor={this.statusColor(issue.status)}
					description={this.descriptionLength(issue.description)}
					comments={issue.comments.length}
					selectedProject={this.props.selectedProject.title}
					selectIssue={this.selectIssue}
				/>
			);
		});
	}

	render() {
		const statusOverlay = (
			<Popover id="popover-basic">
				<Popover.Content>Click to sort on status</Popover.Content>
			</Popover>
		);

		const severityOverlay = (
			<Popover id="popover-basic">
				<Popover.Content>Click to sort on priority</Popover.Content>
			</Popover>
		);

		return (
			<Container>
				<ListGroup>
					<ListGroup.Item variant="secondary">
						<Row>
							<Col style={{ maxWidth: '5%' }}>
								<OverlayTrigger placement="top" overlay={statusOverlay}>
									<svg
										style={{ cursor: 'pointer' }}
										onClick={() => this.chooseStatus()}
										width="1em"
										height="1em"
										viewBox="0 0 16 16"
										className="bi bi-check-circle"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
										/>
										<path
											fillRule="evenodd"
											d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
										/>
									</svg>
								</OverlayTrigger>
							</Col>
							<Col style={{ maxWidth: '5%' }}>
								<OverlayTrigger placement="top" overlay={severityOverlay}>
									<svg
										style={{ cursor: 'pointer' }}
										onClick={() => this.chooseSeverity()}
										width="1em"
										height="1em"
										viewBox="0 0 16 16"
										className="bi bi-exclamation-square"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
										/>
										<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
									</svg>
								</OverlayTrigger>
							</Col>
							<Col style={{ justifyContent: 'start' }}>Title</Col>

							<Col style={{ maxWidth: '11%' }}>Assigned to</Col>
							<Col style={{ maxWidth: '9%' }}>Comments</Col>
						</Row>
					</ListGroup.Item>
					{this.issueListRender()}
				</ListGroup>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		issues: Object.values(state.issues),
		auth: state.auth,
		users: Object.values(state.projectUsers),
		selectedProject: state.selectedProject,
		selectedIssue: Object.values(state.selectedIssue)
	};
};

export default connect(mapStateToProps, { getIssues, selectIssue, setNavbar })(IssueList);
