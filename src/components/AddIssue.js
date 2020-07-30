import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createIssue } from '../redux/actions/index';

class AddIssue extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const body = {
			status: 'Open',
			project: 1,
			owner: 1
		};
		formData.forEach((value, property) => (body[property] = value));

		this.props.createIssue(body);
		this.props.closePopup();
	}

	render() {
		return (
			<div className="popupai" id="popupai">
				<div className="popupai__content">
					<a href="#it-issuelist" className="popupai__close" onClick={this.props.closePopup}>
						&times;
					</a>
					<h1>Add new issue</h1>
					<form id="form" className="form" onSubmit={this.handleSubmit}>
						<div className="form__group">
							<label htmlFor="title">Title</label>
							<input
								type="text"
								className="form__control"
								id="title"
								name="title"
								placeholder="Describe the issue ..."
							/>
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
		);
	}
}

export default connect(null, { createIssue })(AddIssue);
