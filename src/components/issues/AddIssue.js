import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createIssue, getIssues } from '../../redux/actions/index';
import { Modal, Form, Button } from 'react-bootstrap';
import Select from 'react-select';

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

	handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);

		const body = {
			status: 'Open',
			project: this.props.selectedProject[0].id,
			owner: this.props.auth.userId,
			assignedto: this.state.selectedOption.id
		};
		formData.forEach((value, property) => (body[property] = value));

		this.props.createIssue(body);

		//this.props.getIssues(this.props.selectedProject[0].id);

		this.props.onHide();
	}

	getusers = () => {
		if (!this.props.selectedProject[0]) {
			return {};
		} else {
			const project = this.props.selectedProject[0].id;

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
					temp.label = 'yourself';

					return temp;
				} else {
					return obj;
				}
			});

			return filteredArr;
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
							<Select onChange={this.handleChange} options={this.getusers()} required />
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
		selectedProject: Object.values(state.selectedProject),
		projectUsers: state.projectUsers
	};
};

export default connect(mapStateToProps, { createIssue, getIssues })(AddIssue);
