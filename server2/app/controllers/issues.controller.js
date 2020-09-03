const db = require('../models');

const Issues = db.issues;

const Op = db.Sequelize.Op;

exports.update = (req, res) => {
	Issues.update(
		{
			title: req.body.title,
			description: req.body.description,
			assignedto: req.body.assignedto,
			projectId: req.body.projectId,
			severity: req.body.severity,
			status: req.body.status,
			owner: req.body.owner
		},
		{ where: { id: req.params.id } }
	)
		.then(() => {
			res.status(200).send(`Issue Updated.`);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.create = (req, res) => {
	Issues.create({
		title: req.body.title,
		description: req.body.description,
		assignedto: req.body.assignedto,
		projectId: req.body.projectId,
		severity: req.body.severity,
		status: req.body.status,
		owner: req.body.owner
	})
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.delete = (req, res) => {
	Issues.destroy({ where: { id: req.params.id } })
		.then(() => {
			res.status(200).send(`Issue Deleted.`);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
