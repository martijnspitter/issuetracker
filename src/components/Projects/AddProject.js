import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createProject } from '../../redux/actions/index';
import { Modal, Form, Button } from 'react-bootstrap';

class AddProject extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);

		const body = {
			owner: this.props.auth.userId
		};
		formData.forEach((value, property) => (body[property] = value));

		await this.props.createProject(body);

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
					<Modal.Title id="contained-modal-title-vcenter">New Project</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Label>Title</Form.Label>
							<Form.Control size="lg" type="text" id="title" name="title" placeholder="Title ..." />
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
								placeholder="Project description ..."
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Github link</Form.Label>
							<Form.Control
								size="lg"
								type="url"
								defaultValue="http://"
								id="github"
								name="github"
								placeholder="Github link ..."
							/>
						</Form.Group>
						<Button type="submit">Add Project</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer />
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		selectedProject: Object.values(state.selectedProject),
		users: state.users
	};
};

export default connect(mapStateToProps, { createProject })(AddProject);
