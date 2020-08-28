const db = require('../models');

const Comments = db.comments;

const Op = db.Sequelize.Op;

exports.update = (req, res) => {
	Comments.update(
		{
			comment: req.body.comment
		},
		{ where: { id: req.params.id } }
	);
	res.status(200).send(`Issue Updated.`);
};

exports.create = (req, res, err) => {
	Comments.create({
		comment: req.body.comment,
		issueId: req.body.issueId,
		userId: req.body.userId
	})
		.then((result) => {
			res.status(200).send(result);
		})
		.catch(err);
};

exports.delete = (req, res, err) => {
	Comments.destroy({ where: { id: req.params.id } })
		.then(() => {
			res.status(200).send(`Issue Deleted.`);
		})
		.catch(err);
};
