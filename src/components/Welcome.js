import React, { Component } from 'react';

import history from '../history';

import { Container } from 'react-bootstrap';

export default class Welcome extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser: JSON.parse(localStorage.getItem('user'))
		};
	}

	// if currentUser redirect to login page. Welcome is redundant then
	loggedIn() {
		if (this.state.currentUser) {
			history.push('/issuetracker/login');
		} else {
			return (
				<div className="welcome">Welcome! Please start by Registering or Login and select a Project to start.</div>
			);
		}
	}

	render() {
		return <Container style={{ display: 'flex', justifyContent: 'center' }}>{this.loggedIn()}</Container>;
	}
}
