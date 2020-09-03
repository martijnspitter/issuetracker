import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editComment, getIssues } from '../../redux/actions';

import { Modal, Button, Form } from 'react-bootstrap';

class EditComment extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);

		const body = {
			edit: 1
		};
		formData.forEach((value, property) => (body[property] = value));

		await this.props.editComment(this.props.commentId, body);

		await this.props.getIssues(this.props.selectedProject.id);

		this.props.onHide();
	}

	render() {
		if (!this.props.comment) {
			return null;
		} else {
			return (
				<Modal
					show={this.props.show}
					onHide={this.props.onHide}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">Edit Comment</Modal.Title>
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
									defaultValue={this.props.comment}
									required
								/>
							</Form.Group>

							<Button className="btn__submit" type="submit">
								Edit Comment
							</Button>
						</Form>
					</Modal.Body>
				</Modal>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		selectedProject: state.selectedProject
	};
};

export default connect(mapStateToProps, { editComment, getIssues })(EditComment);
