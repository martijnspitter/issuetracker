import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment, getIssues } from '../../redux/actions';

import { Modal, Button } from 'react-bootstrap';

class DeleteComment extends Component {
	async handleSubmit() {
		await this.props.deleteComment(this.props.commentId);
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
						<Modal.Title id="contained-modal-title-vcenter">Delete Comment</Modal.Title>
					</Modal.Header>
					<Modal.Body style={{ fontSize: '1.6rem' }}>
						<div>Are you sure you want to delete </div>
						<em>'{this.props.comment}'</em>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="danger" onClick={() => this.handleSubmit()}>
							DELETE
						</Button>
						<Button variant="success" onClick={this.props.onHide}>
							NO
						</Button>
					</Modal.Footer>
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

export default connect(mapStateToProps, { deleteComment, getIssues })(DeleteComment);
