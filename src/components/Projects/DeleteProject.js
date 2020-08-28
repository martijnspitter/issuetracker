import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';

import { deleteProject } from '../../redux/actions';

class DeleteProject extends Component {
	handleSubmit() {
		this.props.deleteProject(this.props.projectId);
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
					<Modal.Title id="contained-modal-title-vcenter">Delete Project</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete <strong>{this.props.projectTitle}</strong>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="success" onClick={this.props.onHide}>
						NO
					</Button>
					<Button variant="danger" onClick={() => this.handleSubmit()}>
						DELETE
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default connect(null, {
	deleteProject
})(DeleteProject);
