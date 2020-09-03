import React, { Component } from 'react';
import { connect } from 'react-redux';

import history from '../../history';

import { createIssue, getIssues } from '../../redux/actions/index';
import { Modal, Form, Button } from 'react-bootstrap';

class AddIssue extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getusers = this.getusers.bind(this);
		this.state = {
			selectedOption: null
		};
	}

	async handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);

		const body = {
			status: 'Open',
			projectId: this.props.selectedProject.id,
			owner: this.props.auth.userId
		};
		formData.forEach((value, property) => (body[property] = value));
		body.assignedto = parseInt(body.assignedto, 10);

		await this.props.createIssue(body);

		await this.props.getIssues(this.props.selectedProject.id);
		history.push('/issuetracker/issuelist');
		this.props.onHide();
	}

	getusers = () => {
		if (!this.props.selectedProject.id) {
			return {};
		} else {
			const project = this.props.selectedProject.id;

			const arr = this.props.projectUsers[project].users;

			const owner = this.props.auth.userId;

			//adding label and value to the object to get options for the select element
			arr.map((obj) => {
				obj['value'] = obj['id'];
				obj['label'] = obj['username'];
				delete obj['user_projects'];
				return obj;
			});

			// rename owner to 'yourself'.
			const filteredArr = arr.map((obj) => {
				if (obj.id === owner) {
					var temp = Object.assign({}, obj);
					temp.label = 'Yourself';

					return temp;
				} else {
					return obj;
				}
			});

			return filteredArr.map((obj) => {
				return (
					<option key={obj.id} value={obj.id}>
						{obj.label}
					</option>
				);
			});
		}
	};

	handleChange(selectedOption) {
		this.setState({ selectedOption });
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
					<Modal.Title id="contained-modal-title-vcenter">New Issue</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Label>Title</Form.Label>
							<Form.Control size="lg" type="text" id="title" name="title" placeholder="Title ..." required />
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
								placeholder="Describe the issue ..."
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Priority</Form.Label>
							<Form.Control as="select" id="severity" name="severity" size="lg" required>
								<option value="Low">Low</option>
								<option value="Medium">Medium</option>
								<option value="High">High</option>
							</Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Assigned To</Form.Label>
							<Form.Control as="select" id="assignedto" name="assignedto" size="lg" required>
								{this.getusers()}
							</Form.Control>
						</Form.Group>
						<Button className="btn__submit" type="submit">
							Create Issue
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
		selectedProject: state.selectedProject,
		projectUsers: state.projectUsers
	};
};

export default connect(mapStateToProps, { createIssue, getIssues })(AddIssue);
