const { authJwt } = require('../middleware');
const controller = require('../controllers/issues.controller');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
		next();
	});

	app.put('/api/issuetracker/issues/update/:id', [ authJwt.verifyToken ], controller.update);

	app.delete('/api/issuetracker/issues/delete/:id', [ authJwt.verifyToken ], controller.delete);

	app.post('/api/issuetracker/issues/create', [ authJwt.verifyToken ], controller.create);
};
