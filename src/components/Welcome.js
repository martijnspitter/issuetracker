import React, { Component } from 'react';

export default class Welcome extends Component {
	// if logged in redirect to project page.
	render() {
		return <div className="welcome">Welcome! Please Login and select a Project to start.</div>;
	}
}
