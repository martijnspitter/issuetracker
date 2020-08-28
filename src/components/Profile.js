import React, { Component } from 'react';
import { getCurrentUser, fetchProjectUsers, fetchProjects } from '../redux/actions/index.js';
import { connect } from 'react-redux';

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser: JSON.parse(localStorage.getItem('user'))
		};
	}

	async componentDidMount() {
		await this.props.fetchProjects(this.props.auth.userId);
		this.props.projects.map((project) => {
			this.props.fetchProjectUsers(project.id);
		});
	}

	render() {
		const { currentUser } = this.state;

		return (
			<div className="container">
				<header className="jumbotron">
					<h3>
						<strong>{currentUser.username}</strong>'s Profile
					</h3>
				</header>
				<p>
					<strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{' '}
					{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
				</p>
				<p>
					<strong>Id:</strong> {currentUser.id}
				</p>
				<p>
					<strong>Email:</strong> {currentUser.email}
				</p>
				<strong>Authorities:</strong>
				<ul>{currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		projects: Object.values(state.projects)
	};
};

export default connect(mapStateToProps, { getCurrentUser, fetchProjectUsers, fetchProjects })(Profile);
