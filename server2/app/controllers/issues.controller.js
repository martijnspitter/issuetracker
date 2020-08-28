const db = require('../models');

const Issues = db.issues;

const Op = db.Sequelize.Op;

exports.update = (req, res) => {
	Issues.update(
		{
			title: req.body.title,
			description: req.body.description,
			assignedto: req.body.assignedto,
			project: req.body.project,
			severity: req.body.severity,
			status: req.body.status,
			owner: req.body.owner
		},
		{ where: { id: req.params.id } }
	);
	res.status(200).send(`Issue Updated.`);
};

exports.create = (req, res, err) => {
	Issues.create({
		title: req.body.title,
		description: req.body.description,
		assignedto: req.body.assignedto,
		project: req.body.project,
		severity: req.body.severity,
		status: req.body.status,
		owner: req.body.owner
	})
		.then((result) => {
			res.status(200).send(result);
		})
		.catch(err);
};

exports.delete = (req, res, err) => {
	Issues.destroy({ where: { id: req.params.id } })
		.then(() => {
			res.status(200).send(`Issue Deleted.`);
		})
		.catch(err);
};
