import React, { Component } from 'react';

import AddIssue from './AddIssue';
import Issues from './Issues';
import logo from '../images/logo.svg';

export default class IssueTracker extends Component {
	constructor(props) {
		super(props);
		this.state = { showPopup: false };
		this.togglePopup = this.togglePopup.bind(this);
	}

	togglePopup() {
		this.setState({ showPopup: !this.state.showPopup });
	}

	render() {
		return (
			<div className="it-container">
				<header className="it-header">
					<img src={logo} className="it-header__logo" alt="logo" />
					<h1 className="it-header__title">Issue Tracker</h1>
					<p className="it-header__login">dummy login</p>
				</header>
				<div className="it-content">
					<div className="it-navbar">
						<div>
							<ul className="it-navbar__list">
								<li className="it-navbar__item">
									<a href="#" className="it-navbar__link btn btn--white">
										Projects
									</a>
								</li>
								<li className="it-navbar__item">
									<a href="#" className="it-navbar__link btn btn--white">
										Open
									</a>
								</li>
								<li className="it-navbar__item">
									<a href="#" className="it-navbar__link btn btn--white">
										On Hold
									</a>
								</li>
								<li className="it-navbar__item">
									<a href="#" className="it-navbar__link btn btn--white">
										Closed
									</a>
								</li>
							</ul>
						</div>
						<div>
							<button onClick={this.togglePopup} className="it-navbar__add">
								<span className="material-icons it-navbar__add--icon">add_circle</span>
							</button>
							{this.state.showPopup ? <AddIssue closePopup={this.togglePopup} /> : null}
						</div>
					</div>
					<div className="it-issuelist" id="it-issuelist">
						<div className="legend">
							<div className="legend__label">STATUS</div>
							<div className="legend__title">TITLE</div>
							<div className="legend__description">DESCRIPTION</div>
							<div className="legend__severity">SEVERITY</div>
							<div className="legend__assigned">ASSIGNED TO</div>

							<div className="legend__button">OPTIONS</div>
						</div>
						<Issues />
					</div>
				</div>
			</div>
		);
	}
}
