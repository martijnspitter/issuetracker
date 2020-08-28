const db = require('../models');

const Projects = db.projects;
const user_projects = db.user_projects;
const Comments = db.comments;
const Issues = db.issues;
const Users = db.users;

exports.delete = (req, res, err) => {
	Projects.destroy({ where: { id: req.params.id } })
		.then(() => {
			res.status(200).send(`Project deleted.`);
		})
		.catch(err);
};

exports.projects = async (req, res, err) => {
	Projects.findAll({
		include: [
			{
				model: Users,
				where: {
					id: req.params.id
				},
				attributes: [ [ 'id', 'id' ], [ 'username', 'username' ] ]
			}
		]
	})
		.then((result) => {
			res.status(200).send(result);
		})
		.catch(err);
};

exports.projectsIssues = (req, res, err) => {
	Issues.findAll({
		where: {
			project: req.params.project
		},
		include: [ { model: Comments } ]
	})
		.then((result) => {
			console.log(result);
			res.status(200).send(result);
		})
		.catch((err) => console.log(err));
};

exports.create = (req, res) => {
	Projects.create({
		title: req.body.title,
		description: req.body.description,
		github: req.body.github,
		owner: req.body.owner
	}).then((result) => {
		user_projects.create({
			userId: req.body.owner,
			projectId: result.dataValues.id
		});
		res.status(200).send(result);
	});
};

exports.update = (req, res) => {
	Projects.update(
		{
			title: req.body.title,
			desciption: req.body.desciption,
			github: req.body.github
		},
		{ where: { id: req.params.id } }
	);
	res.status(200).send(`Project Updated.`);
};
