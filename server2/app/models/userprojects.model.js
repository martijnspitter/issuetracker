module.exports = (sequelize, Sequelize) => {
	const user_projects = sequelize.define('user_projects', {
		userId: {
			type: Sequelize.INTEGER
		},

		projectId: {
			type: Sequelize.INTEGER
		}
	});

	return user_projects;
};
