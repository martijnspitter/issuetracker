import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createComment, getIssues } from '../../redux/actions/index';
import { Modal, Form, Button } from 'react-bootstrap';

class AddComment extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);

		const body = {
			userId: this.props.auth.userId,
			issueId: this.props.issue[0].id
		};
		formData.forEach((value, property) => (body[property] = value));

		this.props.createComment(body);

		this.props.getIssues(this.props.selectedProject[0].id);

		this.props.onHide();
	}

	render() {
		return (
			<Modal
				show={this.props.show}
				onHide={this.props.onHide}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">New Comment</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Label>Enter your comment</Form.Label>
							<Form.Control
								as="textarea"
								rows="5"
								size="lg"
								type="text"
								id="comment"
								name="comment"
								placeholder="Enter your comment ..."
								required
							/>
						</Form.Group>

						<Button className="btn__submit" type="submit">
							Create Comment
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		issue: Object.values(state.selectedIssue),
		selectedProject: Object.values(state.selectedProject)
	};
};

export default connect(mapStateToProps, { createComment, getIssues })(AddComment);
