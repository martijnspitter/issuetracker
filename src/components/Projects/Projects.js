import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, Button, Container, ListGroup, Row, Col } from 'react-bootstrap';

import AddProjectUsers from './AddProjectUsers';
import DeleteProjectUsers from './DeleteProjectUsers';
import DeleteProject from './DeleteProject';
import EditProject from './EditProject';

import { fetchProjects, selectedProject, fetchAllUsers, fetchProjectUsers, closeAddProject } from '../../redux/actions';

class Projects extends Component {
	constructor(props) {
		super(props);

		this.closeAddProjectUsers = this.closeAddProjectUsers.bind(this);
		this.closeDeleteProjectUsers = this.closeDeleteProjectUsers.bind(this);
		this.closeDeleteProject = this.closeDeleteProject.bind(this);
		this.closeEditProject = this.closeEditProject.bind(this);

		this.state = {
			addProjectUsersShow: false,
			projectId: undefined,
			projectTitle: undefined,
			deleteProjectUsersShow: false,
			deleteProject: false,
			editProject: false
		};
	}

	async componentDidMount() {
		this.props.fetchAllUsers();
	}

	select = async (project) => {
		// show new issue in nav / hide new project in nav
		this.props.closeAddProject({ id: 0, issue: true, project: false });
		// set selected project details in redux for title in issuelist
		this.props.selectedProject(project);

		// go to issuelist
		this.props.history.push('/issuetracker/issuelist');
	};

	closeAddProjectUsers(id) {
		this.setState({ addProjectUsersShow: false });
		// get new users connected to project
		this.props.fetchProjectUsers(id);
	}

	closeDeleteProjectUsers(id) {
		this.setState({ deleteProjectUsersShow: false });
		// get new users connected to project
		this.props.fetchProjectUsers(id);
	}

	closeDeleteProject() {
		this.setState({ deleteProject: false });
	}

	closeEditProject() {
		this.setState({ editProject: false });
	}

	renderOptions(project) {
		if (this.props.auth.userId === project.owner) {
			return (
				<Card.Footer>
					<Container style={{ marginTop: 0 }}>
						<Row>
							<Col>
								<Button variant="success" className="btn" onClick={() => this.select(project)}>
									Select Project
								</Button>
							</Col>
							<Col>
								<Button
									onClick={() => {
										this.setState({ editProject: true });
										this.props.selectedProject(project);
									}}
								>
									Edit Project Details
								</Button>
							</Col>
							<Col>
								<Button
									onClick={() =>
										this.setState({ addProjectUsersShow: true, projectId: project.id, projectTitle: project.title })}
								>
									Add Users to Project
								</Button>
							</Col>
							<Col>
								<Button
									variant="warning"
									onClick={() => {
										this.setState({ deleteProjectUsersShow: true, projectId: project.id, projectTitle: project.title });
										// set selected project in redux
										this.props.selectedProject(project);
									}}
								>
									Remove users from project
								</Button>
							</Col>
							<Col>
								<Button
									variant="danger"
									onClick={() =>
										this.setState({ deleteProject: true, projectId: project.id, projectTitle: project.title })}
								>
									Delete Project
								</Button>
							</Col>
						</Row>
					</Container>

					<EditProject show={this.state.editProject} onHide={this.closeEditProject} />

					<AddProjectUsers
						projectId={this.state.projectId}
						projectTitle={this.state.projectTitle}
						show={this.state.addProjectUsersShow}
						onHide={this.closeAddProjectUsers}
					/>

					<DeleteProjectUsers
						projectId={this.state.projectId}
						projectTitle={this.state.projectTitle}
						show={this.state.deleteProjectUsersShow}
						onHide={this.closeDeleteProjectUsers}
					/>

					<DeleteProject
						projectId={this.state.projectId}
						projectTitle={this.state.projectTitle}
						show={this.state.deleteProject}
						onHide={this.closeDeleteProject}
					/>
				</Card.Footer>
			);
		} else {
			return (
				<Card.Footer>
					<Container style={{ marginTop: 0 }}>
						<Row>
							<Col>
								<Button variant="success" className="btn" onClick={() => this.select(project)}>
									Select Project
								</Button>
							</Col>
							<Col />
							<Col />
							<Col />
							<Col />
						</Row>
					</Container>
				</Card.Footer>
			);
		}
	}

	renderContent = () => {
		return this.props.projects.map((project) => {
			return (
				<Card key={project.id} style={{ width: '100%' }}>
					<Card.Header style={{ justifyContent: 'center' }}>
						<strong>{project.title}</strong>
					</Card.Header>
					<Card.Body>
						<div className="project__description">
							<strong>Description: </strong>
							<br />
							{project.description}
						</div>
						<div>
							<strong>Users connected to project: </strong>
						</div>
						<ListGroup horizontal>
							{this.props.projectUsers[project.id].users.map((user) => {
								// need to add unique key here
								return <ListGroup.Item key={user.id}>{user.username}</ListGroup.Item>;
							})}
						</ListGroup>
						<div className="project__link">
							<strong>Github link: </strong>
							<a href={project.github} target="_blank" rel="noopener noreferrer">
								{project.github}
							</a>
						</div>
					</Card.Body>
					{this.renderOptions(project)}
				</Card>
			);
		});
	};

	render() {
		return (
			<div className="test" style={{ width: '100%' }}>
				<Container style={{ width: '100%' }}>{this.renderContent()}</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		projects: Object.values(state.projects),
		auth: state.auth,
		users: state.users,
		projectUsers: state.projectUsers
	};
};

export default connect(mapStateToProps, {
	fetchProjects,
	selectedProject,

	fetchAllUsers,
	fetchProjectUsers,
	closeAddProject
})(Projects);
