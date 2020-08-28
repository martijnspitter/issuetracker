module.exports = (sequelize, Sequelize) => {
	const issue = sequelize.define('issues', {
		title: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.TEXT
		},
		assignedto: {
			type: Sequelize.INTEGER
		},
		severity: {
			type: Sequelize.STRING
		},
		status: {
			type: Sequelize.STRING
		},
		project: {
			type: Sequelize.INTEGER
		},
		owner: {
			type: Sequelize.INTEGER
		}
	});

	return issue;
};
