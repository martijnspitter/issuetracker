import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import { fetchProjects, createSelectedProject } from '../redux/actions';

class Projects extends Component {
	componentDidMount() {
		this.props.fetchProjects();
	}

	renderContent = () => {
		return this.props.projects.map((project) => {
			return (
				<div className="project-container" key={project.id}>
					<button className="btn" onClick={() => this.select(project)}>
						<div className="project__title">{project.title}</div>
						<div className="project__description">{project.description}</div>
						<div className="project__link">{project.github}</div>
					</button>
				</div>
			);
		});
	};

	select = (project) => {
		this.props.createSelectedProject(project);
	};

	renderActions = () => {
		return <button className="btn">Create new Project</button>;
	};

	render() {
		return (
			<Modal
				title="Select a project"
				input={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={this.props.onDismiss}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return { projects: Object.values(state.projects) };
};

export default connect(mapStateToProps, { fetchProjects, createSelectedProject })(Projects);
