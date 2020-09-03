import React, { Component } from 'react';

import { Card, Container, Button, Col, Row } from 'react-bootstrap';

import Comments from '../Comments/Comments';

export default class IssueRender extends Component {
	render() {
		return (
			<Card style={{ width: '100%' }}>
				<Card.Header style={{ justifyContent: 'center', padding: '0.75rem 0 ' }}>
					<Row style={{ width: '100%' }}>
						<Col style={{ maxWidth: '14%', paddingRight: 0, paddingLeft: '1,25rem', justifyContent: 'flex-start' }}>
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
							{this.props.statusStyle}
						</Col>
						<Col style={{ maxWidth: '15%', paddingLeft: 0, marginLeft: '1rem' }}>
							<svg
								width="1em"
								height="1em"
								viewBox="0 0 16 16"
								className="bi bi-exclamation-square text-danger"
								fill={this.props.severityColor}
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
								/>
								<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
							</svg>
							{this.props.severityStyle}
						</Col>
						<Col style={{ justifyContent: 'flex-end' }}>Assigned to&nbsp;{this.props.assignedto}</Col>
					</Row>
				</Card.Header>
				<Card.Body>
					<div className="card__title">
						<strong>{this.props.title}</strong>
					</div>
					<div className="card__description">{this.props.description}</div>
					<div className="card__details" style={{ display: 'flex' }}>
						Issue #{this.props.id}. Created at: {this.props.createdAt} by&nbsp;{this.props.owner}
					</div>
					<Comments />
				</Card.Body>
				<Card.Footer>
					<Container style={{ marginTop: 0 }}>
						<Row>
							<Col>
								<Button variant="secondary" onClick={this.props.commentButton}>
									Comment
								</Button>
							</Col>
							{this.props.renderOptions}
						</Row>
					</Container>
				</Card.Footer>
			</Card>
		);
	}
}
