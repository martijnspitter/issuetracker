import React, { Component } from 'react';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import { signIn } from '../redux/actions/index.js';
import { connect } from 'react-redux';

import { Card, Container } from 'react-bootstrap';
import avatar from '../images/avatar.jpg';

const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

class Login extends Component {
	constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);

		this.state = {
			username: '',
			password: '',
			loading: false,
			message: ''
		};
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value
		});
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value
		});
	}

	handleLogin(e) {
		e.preventDefault();

		this.setState({
			message: '',
			loading: true
		});

		this.form.validateAll();

		if (this.checkBtn.context._errors.length === 0) {
			this.props.signIn(this.state.username, this.state.password).then(
				() => {
					this.props.history.push('/issuetracker/profile');
					window.location.reload();
				},
				(error) => {
					const resMessage =
						(error.response && error.response.data && error.response.data.message) || error.message || error.toString();

					this.setState({
						loading: false,
						message: resMessage
					});
				}
			);
		} else {
			this.setState({
				loading: false
			});
		}
	}

	render() {
		return (
			<Container style={{ display: 'flex', justifyContent: 'center' }}>
				<Card style={{ width: '30%' }}>
					<Card.Img src={avatar} alt="profile-img" />

					<Form
						onSubmit={this.handleLogin}
						ref={(c) => {
							this.form = c;
						}}
					>
						<div className="form-group">
							<label htmlFor="username">Username</label>
							<Input
								type="text"
								className="form-control"
								name="username"
								value={this.state.username}
								onChange={this.onChangeUsername}
								validations={[ required ]}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password">Password</label>
							<Input
								type="password"
								className="form-control"
								name="password"
								value={this.state.password}
								onChange={this.onChangePassword}
								validations={[ required ]}
							/>
						</div>

						<div className="form-group">
							<button className="btn btn-primary btn-block" disabled={this.state.loading}>
								{this.state.loading && <span className="spinner-border spinner-border-sm" />}
								<span>Login</span>
							</button>
						</div>

						{this.state.message && (
							<div className="form-group">
								<div className="alert alert-danger" role="alert">
									{this.state.message}
								</div>
							</div>
						)}
						<CheckButton
							style={{ display: 'none' }}
							ref={(c) => {
								this.checkBtn = c;
							}}
						/>
					</Form>
				</Card>
			</Container>
		);
	}
}

export default connect(null, { signIn })(Login);
