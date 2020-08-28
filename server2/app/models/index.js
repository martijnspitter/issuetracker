const config = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	operatorsAliases: false,

	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle
	}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);
db.projects = require('../models/project.model')(sequelize, Sequelize);
db.issues = require('../models/issue.model')(sequelize, Sequelize);
db.user_projects = require('../models/userprojects.model')(sequelize, Sequelize);
db.comments = require('../models/comment.model.js')(sequelize, Sequelize);

db.role.belongsToMany(db.users, {
	through: 'user_roles',
	foreignKey: 'roleId',
	otherKey: 'userId'
});
db.users.belongsToMany(db.role, {
	through: 'user_roles',
	foreignKey: 'userId',
	otherKey: 'roleId'
});

db.users.belongsToMany(db.projects, {
	through: 'user_projects',
	foreignKey: 'userId',
	otherKey: 'projectId'
});

db.projects.belongsToMany(db.users, {
	through: 'user_projects',
	foreignKey: 'projectId',
	otherKey: 'userId'
});

db.comments.belongsTo(db.issues, {
	foreignKey: 'issueId'
});

db.issues.hasMany(db.comments, {
	foreignKey: 'issueId'
});

db.ROLES = [ 'user', 'admin' ];

module.exports = db;
