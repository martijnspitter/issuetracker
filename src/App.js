import React, { Component } from 'react';

import AddIssue from './components/AddIssue';
import IssueTracker from './components/IssueTracker';

export default class App extends Component {
	render() {
		return (
			<div>
				<IssueTracker />
			</div>
		);
	}
}
