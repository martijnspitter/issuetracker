module.exports = (sequelize, Sequelize) => {
	const comments = sequelize.define('comments', {
		comment: {
			type: Sequelize.TEXT
		},
		userId: {
			type: Sequelize.INTEGER
		},
		issueId: {
			type: Sequelize.INTEGER
		},
		edit: {
			type: Sequelize.BOOLEAN
		}
	});

	return comments;
};
