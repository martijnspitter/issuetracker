import React, { Component } from 'react';

export default class AddIssue extends Component {
	render() {
		return (
			<div className="popupai" id="popupai">
				<div className="popupai__content">
					<a href="#it-issuelist" className="popupai__close" onClick={this.props.closePopup}>
						&times;
					</a>
					<h1>Add new issue</h1>
					<form id="form" className="form">
						<div className="form__group">
							<label htmlFor="issueDescInput">Description</label>
							<input type="text" className="form__control" id="issueDescInput" placeholder="Describe the issue ..." />
						</div>
						<div className="form__group">
							<label htmlFor="issueSeverityInput">Severity</label>
							<select id="issueSeverityInput" className="form__control">
								<option value="Low">Low</option>
								<option value="Medium">Medium</option>
								<option value="High">High</option>
							</select>
						</div>
						<div className="form__group">
							<label htmlFor="issueAssignedToInput">Assigned To</label>
							<input
								type="text"
								className="form__control"
								id="issueAssignedToInput"
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
