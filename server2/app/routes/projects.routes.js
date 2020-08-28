const { authJwt } = require('../middleware');
const controller = require('../controllers/project.controller');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
		next();
	});

	app.put('/api/issuetracker/projects/update/:id', [ authJwt.verifyToken ], controller.update);

	app.get('/api/issuetracker/projects/:id', [ authJwt.verifyToken ], controller.projects);

	app.get('/api/issuetracker/projects/select/:project', [ authJwt.verifyToken ], controller.projectsIssues);

	app.delete('/api/issuetracker/projects/delete/:id', [ authJwt.verifyToken ], controller.delete);

	app.post('/api/issuetracker/projects/create', [ authJwt.verifyToken ], controller.create);
};
