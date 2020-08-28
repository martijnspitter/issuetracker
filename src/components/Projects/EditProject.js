import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editProject } from '../../redux/actions/index';
import { Modal, Form, Button } from 'react-bootstrap';

class EditProject extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);

		//adding id and owner to update redux state correctly
		const body = {
			id: this.props.project[0].id,
			owner: this.props.project[0].owner
		};
		formData.forEach((value, property) => (body[property] = value));

		this.props.editProject(this.props.project[0].id, body);

		this.props.onHide();
	}

	renderProjectDetails() {
		if (!this.props.project[0]) {
			return;
		} else {
			return (
				<React.Fragment>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">Edit {this.props.project[0].title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control
									size="lg"
									type="text"
									id="title"
									name="title"
									defaultValue={this.props.project[0].title}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Description</Form.Label>
								<Form.Control
									as="textarea"
									rows="5"
									size="lg"
									type="text"
									id="description"
									name="description"
									defaultValue={this.props.project[0].description}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Github link</Form.Label>
								<Form.Control
									size="lg"
									type="url"
									id="github"
									name="github"
									defaultValue={this.props.project[0].github}
								/>
							</Form.Group>
							<Button className="btn__submit" type="submit">
								Edit Project
							</Button>
						</Form>
					</Modal.Body>
				</React.Fragment>
			);
		}
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
				{this.renderProjectDetails()}
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		project: Object.values(state.selectedProject)
	};
};

export default connect(mapStateToProps, { editProject })(EditProject);
