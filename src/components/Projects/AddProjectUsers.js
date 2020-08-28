import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Modal, Form, Button, FormGroup } from 'react-bootstrap';
import Select from 'react-select';

import { addProjectUsers } from '../../redux/actions';

class AddProjectUsers extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			selectedOption: null
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		const formData = this.state.selectedOption;

		this.props.addProjectUsers(this.props.projectId, formData);

		this.props.onHide(this.props.projectId);
	}

	users() {
		const arr = this.props.users.map((user) => user);

		// remove owner from project users.
		const filteredArr = arr.filter((obj) => {
			if (obj.id === this.props.auth.userId) {
				return false;
			} else {
				return true;
			}
		});

		//adding label and value to the object to get options for the select element
		filteredArr.map((obj) => {
			obj['value'] = obj['id'];
			obj['label'] = obj['username'];

			return obj;
		});

		return filteredArr;
	}

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
					<Modal.Title id="contained-modal-title-vcenter">Add Users to {this.props.projectTitle}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Label>Select Users</Form.Label>
							<Select onChange={this.handleChange} options={this.users()} isMulti className="ownform_control" />
						</Form.Group>
						<Button type="submit">Add</Button>
					</Form>
				</Modal.Body>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		projects: Object.values(state.projects),
		auth: state.auth,
		users: Object.values(state.users),
		projectUsers: state.projectUsers
	};
};

export default connect(mapStateToProps, {
	addProjectUsers
})(AddProjectUsers);
