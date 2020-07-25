import React, { Component } from 'react';

export default class Issues extends Component {
	render() {
		return (
			<div className="issuelist-container">
				<div className="issue-container">
					<div className="issue__label">OPEN</div>
					<h1 className="issue__title">Test title</h1>
					<div className="issue__description">Description because it needs more then just a title</div>
					<div className="issue__severity">HIGH</div>
					<div className="issue__assigned">Martijn</div>
					<div className="issue__buttons">
						<a href="#" className="button button--blue">
							CLOSE
						</a>
						<a href="#" className="button button--orange">
							ON HOLD
						</a>
						<a href="#" className="button button--red">
							DELETE
						</a>
					</div>
				</div>
				<div className="issue-container">
					<div className="issue__label">OPEN</div>
					<h1 className="issue__title">Test title</h1>
					<div className="issue__description">
						Description because it needs more then just a title and some more random text for testing purposes.
					</div>
					<div className="issue__severity">HIGH</div>
					<div className="issue__assigned">Martijn</div>
					<div className="issue__buttons">
						<a href="#" className="button button--blue">
							CLOSE
						</a>
						<a href="#" className="button button--orange">
							ON HOLD
						</a>
						<a href="#" className="button button--red">
							DELETE
						</a>
					</div>
				</div>
				<div className="issue-container">
					<div className="issue__label">OPEN</div>
					<h1 className="issue__title">Test title</h1>
					<div className="issue__description">Description because it needs more then just a title</div>
					<div className="issue__severity">HIGH</div>
					<div className="issue__assigned">Martijn</div>
					<div className="issue__buttons">
						<a href="#" className="button button--blue">
							CLOSE
						</a>
						<a href="#" className="button button--orange">
							ON HOLD
						</a>
						<a href="#" className="button button--red">
							DELETE
						</a>
					</div>
				</div>
			</div>
		);
	}
}
