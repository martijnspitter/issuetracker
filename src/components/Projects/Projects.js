import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, Button, Container, ListGroup, Row, Col, OverlayTrigger, Popover } from 'react-bootstrap';

import AddProjectUsers from './AddProjectUsers';
import DeleteProjectUsers from './DeleteProjectUsers';
import DeleteProject from './DeleteProject';
import EditProject from './EditProject';
import ProjectRender from './ProjectRender';

import { fetchProjects, selectProject, fetchAllUsers, fetchProjectUsers, setNavbar } from '../../redux/actions';
import { getName } from '../getName';

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
		// set selected project details in redux for title in issuelist
		this.props.selectProject(project);
		this.props.setNavbar({
			addProject: false,
			addIssue: true,
			issueList: false,
			title: project.title
		});
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

	renderProject() {
		return this.props.projects.map((project) => {
			return (
				<ProjectRender
					key={project.id}
					title={project.title}
					description={project.description}
					github={this.props.github}
					renderOptions={this.renderOptions(project)}
					users={this.projectUsers(project.id, project.owner)}
				/>
			);
		});
	}

	projectUsers(id, owner) {
		return this.props.projectUsers[id].users.map((user) => {
			if (user.id === owner) {
				const ownerOverlay = (
					<Popover id="popover-basic">
						<Popover.Content>Project creator</Popover.Content>
					</Popover>
				);
				return (
					<OverlayTrigger key={user.id} placement="top" overlay={ownerOverlay}>
						<ListGroup.Item variant="info" style={{ marginRight: '1rem' }}>
							{getName(user.id, this.props.projectUsers[id].users, this.props.auth.userName)}
						</ListGroup.Item>
					</OverlayTrigger>
				);
			} else
				return (
					<ListGroup.Item key={user.id}>
						{getName(user.id, this.props.projectUsers[id].users, this.props.auth.userName)}
					</ListGroup.Item>
				);
		});
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
										this.props.selectProject(project);
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
										this.props.selectProject(project);
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

	render() {
		return (
			<Container style={{ width: '100%' }}>
				{this.renderProject()}

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
			</Container>
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
	selectProject,
	fetchAllUsers,
	fetchProjectUsers,
	setNavbar
})(Projects);
