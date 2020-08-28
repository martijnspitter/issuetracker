import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createIssue } from '../redux/actions/index';
import { Modal } from 'react-bootstrap';

class AddIssue extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		console.log(this.props.auth);
		console.log(this.props.selectedProject);
		const body = {
			status: 'Open',
			project: this.props.selectedProject[0].id,
			owner: this.props.auth.userId
		};
		formData.forEach((value, property) => (body[property] = value));

		this.props.createIssue(body);

		this.props.closePopup();
	}

	hidePopup = (event) => {
		this.props.closePopup();
		event.stopPropagation();
	};

	render() {
		return (
			<div className="modal fade" id="addissue" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h1>Add new issue</h1>
						<form id="form" className="form" onSubmit={this.handleSubmit}>
							<div className="form__group">
								<label htmlFor="title">Title</label>
								<input type="text" className="form__control" id="title" name="title" placeholder="Title ..." />
							</div>
							<div className="form__group">
								<label htmlFor="description">Description</label>
								<input
									type="text"
									className="form__control"
									id="description"
									name="description"
									placeholder="Describe the issue ..."
								/>
							</div>
							<div className="form__group">
								<label htmlFor="severity">Severity</label>
								<select id="severity" name="severity" className="form__control">
									<option value="Low">Low</option>
									<option value="Medium">Medium</option>
									<option value="High">High</option>
								</select>
							</div>
							<div className="form__group">
								<label htmlFor="assignedto">Assigned To</label>
								<input
									type="text"
									className="form__control"
									id="assignedto"
									name="assignedto"
									placeholder="Enter responsible ..."
								/>
							</div>
							<button className="btn btn-primary" type="submit">
								Add
							</button>
						</form>
					</div>
				</div>

				<form id="form" className="ownform">
					<div className="ownform__group">
						<label htmlFor="title">Title</label>
						<input
							type="text"
							className="ownform__control"
							id="title"
							name="title"
							placeholder={this.props.project[0].title}
						/>
					</div>
					<div className="ownform__group">
						<label htmlFor="description">Description</label>
						<input
							type="text"
							className="ownform__control"
							id="description"
							name="description"
							placeholder={this.props.project[0].description}
						/>
					</div>
					<div className="ownform__group">
						<label htmlFor="github">Github link</label>
						<input
							type="text"
							className="ownform__control"
							id="github"
							name="github"
							placeholder={this.props.project[0].github}
						/>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		selectedProject: Object.values(state.selectedProject)
	};
};

export default connect(mapStateToProps, { createIssue })(AddIssue);
