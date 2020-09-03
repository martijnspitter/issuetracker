import React, { Component } from 'react';

import { Card, ListGroup } from 'react-bootstrap';

export default class ProjectRender extends Component {
	render() {
		return (
			<Card style={{ width: '100%' }}>
				<Card.Header style={{ justifyContent: 'center' }}>
					<strong>{this.props.title}</strong>
				</Card.Header>
				<Card.Body>
					<div className="project__description">
						<strong>Description: </strong>
						<br />
						{this.props.description}
					</div>
					<div>
						<strong>Users connected to project: </strong>
					</div>
					<ListGroup horizontal style={{ marginTop: '2rem' }}>
						{this.props.users}
					</ListGroup>
					<div className="project__link">
						<strong>Github link: </strong>
						<a href={this.props.github} target="_blank" rel="noopener noreferrer">
							{this.props.github}
						</a>
					</div>
				</Card.Body>
				{this.props.renderOptions}
			</Card>
		);
	}
}
