import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';

import { deleteProject, selectProject, deleteIssue } from '../../redux/actions';

class DeleteProject extends Component {
	async handleSubmit() {
		await this.props.deleteProject(this.props.projectId);
		await this.props.selectProject({});
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

const mapStateToProps = (state) => {
	return {
		issues: Object.values(state.issues)
	};
};

export default connect(mapStateToProps, {
	deleteProject,
	selectProject,
	deleteIssue
})(DeleteProject);
