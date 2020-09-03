import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Modal, Form, Button } from 'react-bootstrap';
import Select from 'react-select';

import { deleteProjectUsers } from '../../redux/actions';

class DeleteProjectUsers extends Component {
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
		const formData = this.state.selectedOption;

		if (!this.props.selectedProject) {
			return;
		} else {
			this.props.deleteProjectUsers(this.props.selectedProject.id, formData);

			this.props.onHide(this.props.projectId);
		}
	}

	getusers = () => {
		if (!this.props.selectedProject.id) {
			return {};
		} else {
			const project = this.props.selectedProject.id;

			const arr = this.props.projectUsers[project].users;

			// remove owner from project users.
			const filteredArr = arr.filter((obj) => {
				if (obj.id === this.props.selectedProject.owner) {
					return false;
				} else {
					return true;
				}
			});

			//adding label and value to the object to get options for the select element
			filteredArr.map((obj) => {
				obj['value'] = obj['id'];
				obj['label'] = obj['username'];
				delete obj['user_projects'];
				return obj;
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
					<Modal.Title id="contained-modal-title-vcenter">Remove Users from {this.props.projectTitle}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Label>Select Users</Form.Label>
							<Select onChange={this.handleChange} options={this.getusers()} isMulti className="ownform_control" />
						</Form.Group>
						<Button type="submit">Remove</Button>
					</Form>
				</Modal.Body>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		projectUsers: state.projectUsers,
		selectedProject: state.selectedProject
	};
};

export default connect(mapStateToProps, {
	deleteProjectUsers
})(DeleteProjectUsers);
