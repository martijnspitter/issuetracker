const db = require('../models');
const Issues = db.issues;

module.exports = (sequelize, Sequelize) => {
	const comments = sequelize.define('comments', {
		comment: {
			type: Sequelize.TEXT
		},
		userId: {
			type: Sequelize.INTEGER
		}
	});

	return comments;
};
