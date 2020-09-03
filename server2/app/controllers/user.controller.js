const db = require('../models');

const Users = db.users;
const Op = db.Sequelize.Op;
const user_projects = db.user_projects;
const Projects = db.projects;
var bcrypt = require('bcryptjs');

exports.update = (req, res) => {
	Users.update(
		{ username: req.body.username, email: req.body.email, password: bcrypt.hashSync(req.body.password, 8) },
		{ where: { id: req.params.id } }
	)
		.then(() => {
			res.status(200).send(`User updated.`);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.everyUserName = (req, res) => {
	Users.findAll({
		attributes: [ [ 'id', 'id' ], [ 'username', 'username' ] ]
	})
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.fetchProjectUsers = (req, res) => {
	Projects.findAll({
		where: { id: req.params.id },
		include: [ { model: Users, attributes: [ 'id', 'username' ] } ]
	})
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.addProjectUser = (req, res) => {
	const body = req.body;
	const allUsers = [];
	body.map((users) => {
		var user = {
			userId: users.id,
			projectId: req.params.id
		};
		allUsers.push(user);
	});

	user_projects
		.bulkCreate(allUsers, { ignoreDuplicates: true })
		.then(() => {
			res.status(200).send('Users Added');
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.deleteProjectUser = (req, res) => {
	const body = req.body;
	body
		.map((user) => {
			user_projects.destroy({
				where: {
					[Op.and]: [ { userId: user.id }, { projectId: req.params.id } ]
				}
			});
		})
		.then(() => {
			res.status(200).send('Users removed from project');
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
