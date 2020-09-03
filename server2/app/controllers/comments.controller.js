const db = require('../models');

const Comments = db.comments;

exports.update = (req, res) => {
	Comments.update(
		{
			comment: req.body.comment,
			edit: req.body.edit
		},
		{ where: { id: req.params.id } }
	)
		.then(() => {
			res.status(200).send(`Comment Updated.`);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.create = (req, res) => {
	Comments.create({
		comment: req.body.comment,
		issueId: req.body.issueId,
		userId: req.body.userId,
		edit: req.body.edit
	})
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.delete = (req, res) => {
	Comments.destroy({ where: { id: req.params.id } })
		.then(() => {
			res.status(200).send(`Comment Deleted.`);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};
