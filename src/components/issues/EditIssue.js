import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import Select from 'react-select';

import { connect } from 'react-redux';
import { editIssue } from '../../redux/actions';

class EditIssue extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getUsers = this.getUsers.bind(this);

		this.state = {
			selectedOption: null
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const id = this.props.issue[0].id;
		const body = this.props.issue[0];
		body.assignedto = this.state.selectedOption.id;

		formData.forEach((value, property) => (body[property] = value));

		this.props.editIssue(id, body);

		this.props.onHide();
	}

	getUsers = () => {
		if (!this.props.issue[0]) {
			return {};
		} else {
			const project = this.props.issue[0].project;

			const arr = this.props.projectUsers[project].users;

			const user = this.props.auth.userId;

			// remove assignedto from project users.
			const filteredArr = arr.filter((obj) => {
				if (obj.id === this.props.issue[0].assignedto) {
					return false;
				} else {
					return true;
				}
			});

			//adding label and value to the object to get options for the select element
			const labelArr = filteredArr.map((obj) => {
				obj['value'] = obj['id'];
				obj['label'] = obj['username'];
				delete obj['user_projects'];
				return obj;
			});

			// rename user to 'yourself'.
			const renameArr = labelArr.map((obj) => {
				if (obj.id === user) {
					var temp = Object.assign({}, obj);
					temp.label = 'yourself';

					return temp;
				} else {
					return obj;
				}
			});
			return renameArr;
		}
	};

	handleChange(selectedOption) {
		this.setState({ selectedOption });
	}

	renderProjectDetails() {
		if (!this.props.issue[0]) {
			return;
		} else {
			return (
				<React.Fragment>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">Edit {this.props.issue[0].title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control size="lg" type="text" id="title" name="title" defaultValue={this.props.issue[0].title} />
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
									defaultValue={this.props.issue[0].description}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>Reassign Issue to</Form.Label>
								<Select onChange={this.handleChange} options={this.getUsers()} />
							</Form.Group>
							<Button className="btn__submit" type="submit">
								Edit Issue
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
		issue: Object.values(state.selectedIssue),
		projectUsers: state.projectUsers,
		auth: state.auth
	};
};

export default connect(mapStateToProps, { editIssue })(EditIssue);
