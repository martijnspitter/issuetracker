module.exports = (sequelize, Sequelize) => {
	const projects = sequelize.define('projects', {
		title: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.TEXT
		},
		github: {
			type: Sequelize.STRING
		},
		owner: {
			type: Sequelize.INTEGER
		}
	});

	return projects;
};
