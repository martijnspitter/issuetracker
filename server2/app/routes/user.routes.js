const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
		next();
	});

	app.post('/api/issuetracker/user/update/:id', [ authJwt.verifyToken ], controller.update);

	app.get('/api/issuetracker/user/usernames/names', [ authJwt.verifyToken ], controller.everyUserName);

	app.get('/api/issuetracker/user/projectusers/:id', [ authJwt.verifyToken ], controller.fetchProjectUsers);

	app.post('/api/issuetracker/user/projectusers/add/:id', [ authJwt.verifyToken ], controller.addProjectUser);

	app.post('/api/issuetracker/user/projectusers/delete/:id', [ authJwt.verifyToken ], controller.deleteProjectUser);
};
