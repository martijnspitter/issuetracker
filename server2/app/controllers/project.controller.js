const db = require('../models');

const Projects = db.projects;
const user_projects = db.user_projects;
const Comments = db.comments;
const Issues = db.issues;
const Users = db.users;

exports.delete = (req, res) => {
	Projects.destroy({ where: { id: req.params.id } })
		.then(() => {
			res.status(200).send(`Project deleted.`);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.projects = async (req, res) => {
	Projects.findAll({
		include: [
			{
				model: Users,
				where: {
					id: req.params.id
				},
				attributes: [ [ 'id', 'id' ], [ 'username', 'username' ] ]
			},
			{
				model: Issues,

				attributes: [ [ 'id', 'id' ] ]
			}
		]
	})
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.projectsIssues = (req, res) => {
	Issues.findAll({
		where: {
			projectId: req.params.project
		},
		include: [ { model: Comments } ]
	})
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.create = (req, res) => {
	Projects.create({
		title: req.body.title,
		description: req.body.description,
		github: req.body.github,
		owner: req.body.owner
	})
		.then((result) => {
			user_projects.create({
				userId: req.body.owner,
				projectId: result.dataValues.id
			});
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.update = (req, res) => {
	Projects.update(
		{
			title: req.body.title,
			description: req.body.description,
			github: req.body.github
		},
		{ where: { id: req.params.id } }
	)
		.then(() => {
			res.status(200).send(`Project Updated.`);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
