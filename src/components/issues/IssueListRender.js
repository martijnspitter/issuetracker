import React, { Component } from 'react';

import { selectIssue, setNavbar } from '../../redux/actions';
import { connect } from 'react-redux';

import { ListGroup, Row, Col, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class IssueListRender extends Component {
	selectIssue(id) {
		const issue = this.props.issues[id];

		this.props.selectIssue(issue);
		this.props.setNavbar({
			addProject: false,
			addIssue: true,
			issueList: true,
			title: this.props.selectedProject.title,
			login: true
		});
	}

	render() {
		const titleOverlay = (
			<Popover id="popover-basic">
				<Popover.Title>{this.props.title}</Popover.Title>
				<Popover.Content>{this.props.description}</Popover.Content>
			</Popover>
		);

		const statusOverlay = (
			<Popover id="popover-basic">
				<Popover.Content>{this.props.status}</Popover.Content>
			</Popover>
		);

		const severityOverlay = (
			<Popover id="popover-basic">
				<Popover.Content>{this.props.severity}</Popover.Content>
			</Popover>
		);

		return (
			<ListGroup.Item>
				<Row>
					<Col style={{ maxWidth: '5%' }}>
						<OverlayTrigger placement="top" overlay={statusOverlay}>
							<svg
								width="1em"
								height="1em"
								viewBox="0 0 16 16"
								className="bi bi-check-circle"
								fill={this.props.statusColor}
								xmlns="http://www.w3.org/2000/svg"
							>
								<path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
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
								width="1em"
								height="1em"
								viewBox="0 0 16 16"
								className="bi bi-exclamation-square"
								fill={this.props.severityColor}
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
					<Col style={{ alignItems: 'start', flexDirection: 'column' }}>
						<div>
							<OverlayTrigger placement="auto" overlay={titleOverlay}>
								<Link
									className="issue__link"
									to="/issuetracker/issuelist/issue"
									onClick={() => this.selectIssue(this.props.id)}
								>
									<strong>{this.props.title}</strong>
								</Link>
							</OverlayTrigger>
						</div>
						<div style={{ fontSize: '1.2rem', display: 'flex' }}>
							#{this.props.id} created at {this.props.createdAt} by&nbsp;{this.props.owner}
						</div>
					</Col>

					<Col style={{ maxWidth: '11%' }}>{this.props.assignedto}</Col>
					<Col style={{ maxWidth: '9%' }}>
						<svg
							style={{ marginTop: '.5rem' }}
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							className="bi bi-chat-right"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M2 1h12a1 1 0 0 1 1 1v11.586l-2-2A2 2 0 0 0 11.586 11H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"
							/>
						</svg>
						<div style={{ marginLeft: '.4rem' }}>{this.props.comments}</div>
					</Col>
				</Row>
			</ListGroup.Item>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		issues: state.issues,
		selectedProject: state.selectedProject
	};
};

export default connect(mapStateToProps, { selectIssue, setNavbar })(IssueListRender);
