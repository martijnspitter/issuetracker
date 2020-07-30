const express = require('express');
const router = express.Router();

const mysql = require('mysql');

// create connection
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'mypassword',
	database: 'projects'
});

// connect
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log('MySQL connected..');
});

// get issues
router.get('/issues', (req, res) => {
	const sql = 'SELECT * FROM issues ORDER BY id desc';
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

// get users
router.get('/users', (req, res) => {
	const sql = 'SELECT * FROM users ORDER BY id desc';
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

// get projects
router.get('/projects', (req, res) => {
	const sql = 'SELECT * FROM projects ORDER BY id desc';
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

//get selected project
router.get('/project/:owner', (req, res) => {
	const sql = 'SELECT * FROM project ORDER BY id desc';
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

// create issue
router.post('/addissue', (req, res) => {
	const issue = {
		title: req.body.title,
		description: req.body.description,
		severity: req.body.severity,
		assignedto: req.body.assignedto,
		status: req.body.status,
		project: req.body.project,
		owner: req.body.owner
	};

	if (!issue.title || !issue.description || !issue.severity || !issue.assignedto || !issue.status || !issue.project) {
		return res.status(400).json({ msg: 'Missing fields' });
	}
	const sql = 'INSERT INTO issues SET ?';
	const query = db.query(sql, issue, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

// create project
router.post('/addproject', (req, res) => {
	const project = {
		title: req.body.title,
		description: req.body.description,
		github: req.body.github,
		owner: req.body.owner
	};

	if (!project.title || !project.description || !project.github || !project.owner) {
		return res.status(400).json({ msg: 'Missing fields' });
	}
	const sql = 'INSERT INTO projects SET ?';
	const query = db.query(sql, project, (err, result) => {
		if (err) throw err;
		res.send('Project added to database..');
	});
});

// create user
router.post('/adduser', (req, res) => {
	const user = {
		name: req.body.name,
		company: req.body.company,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	};

	if (!user.name || !user.company || !user.username || !user.password || !user.email) {
		return res.status(400).json({ msg: 'Missing fields' });
	}
	const sql = 'INSERT INTO users SET ?';
	const query = db.query(sql, user, (err, result) => {
		if (err) throw err;
		res.send('user added to database..');
	});
});

// create selected project
router.post('/addselectedproject', (req, res) => {
	const project = {
		title: req.body.title,
		description: req.body.description,
		github: req.body.github,
		owner: req.body.owner,
		id: req.body.id
	};

	if (!project.title || !project.description || !project.github || !project.owner) {
		return res.status(400).json({ msg: 'Missing fields' });
	}
	const sql = 'INSERT INTO project SET ?';
	const query = db.query(sql, project, (err, result) => {
		if (err) throw err;
		res.send('Project added to database..');
	});
});

// update user
router.put('/users/:id', (req, res) => {
	const id = req.params.id;
	const user = {
		name: req.body.name,
		company: req.body.company,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	};

	const sql = `UPDATE users SET ? WHERE id = ${id}`;
	const found = `SELECT id FROM users WHERE id = ? LIMIT 1`;

	const query = db.query(found, id, (err, result) => {
		if (err) {
			throw err;
		} else {
			if (!result[0]) {
				res.status(404).json({ msg: `No member with the id of ${req.params.id} found` });
			} else {
				db.query(sql, user, (err, result) => {
					if (err) throw err;
					else res.send('user updated to database..');
				});
			}
		}
	});
});

// update project
router.put('/projects/:id', (req, res) => {
	const id = req.params.id;
	const project = {
		title: req.body.title,
		description: req.body.description,
		github: req.body.github,
		owner: req.body.owner
	};

	const sql = `UPDATE projects SET ? WHERE id = ${id}`;
	const found = `SELECT id FROM projects WHERE id = ? LIMIT 1`;

	const query = db.query(found, id, (err, result) => {
		if (err) {
			throw err;
		} else {
			if (!result[0]) {
				res.status(404).json({ msg: `No project with the id of ${req.params.id} found` });
			} else {
				db.query(sql, project, (err, result) => {
					if (err) throw err;
					else res.send('project updated to database..');
				});
			}
		}
	});
});

// update selected project
router.put('/project/:id', (req, res) => {
	const id = req.params.id;
	const project = {
		title: req.body.title,
		description: req.body.description,
		github: req.body.github,
		owner: req.body.owner
	};

	const sql = `UPDATE projects SET ? WHERE id = ${id}`;
	const found = `SELECT id FROM projects WHERE id = ? LIMIT 1`;

	const query = db.query(found, id, (err, result) => {
		if (err) {
			throw err;
		} else {
			if (!result[0]) {
				res.status(404).json({ msg: `No project with the id of ${req.params.id} found` });
			} else {
				db.query(sql, project, (err, result) => {
					if (err) throw err;
					else res.send('project updated to database..');
				});
			}
		}
	});
});

// update issue
router.put('/issues/:id', (req, res) => {
	const id = req.params.id;
	const issue = {
		title: req.body.title,
		description: req.body.description,
		severity: req.body.severity,
		assignedto: req.body.assignedto,
		status: req.body.status,
		project: req.body.project,
		owner: req.body.owner
	};

	const sql = `UPDATE issues SET ? WHERE id = ${id}`;
	const found = `SELECT id FROM issues WHERE id = ? LIMIT 1`;

	const query = db.query(found, id, (err, result) => {
		if (err) {
			throw err;
		} else {
			if (!result[0]) {
				res.status(404).json({ msg: `No issue with the id of ${req.params.id} found` });
			} else {
				db.query(sql, issue, (err, result) => {
					if (err) throw err;
					else res.send('issue updated to database..');
				});
			}
		}
	});
});

// get single user
router.get('/user/:id', (req, res) => {
	const id = req.params.id;
	const found = `SELECT * FROM users WHERE id = ? LIMIT 1`;

	const query = db.query(found, id, (err, result) => {
		if (err) {
			throw err;
		} else {
			if (!result[0]) {
				res.status(404).json({ msg: `No member with the id of ${req.params.id} found` });
			} else {
				res.send(result);
			}
		}
	});
});

// get single project
router.get('/project/:id', (req, res) => {
	const id = req.params.id;
	const found = `SELECT * FROM projects WHERE id = ? LIMIT 1`;

	const query = db.query(found, id, (err, result) => {
		if (err) {
			throw err;
		} else {
			if (!result[0]) {
				res.status(404).json({ msg: `No project with the id of ${req.params.id} found` });
			} else {
				res.send(result);
			}
		}
	});
});

// get single issue
router.get('/issue/:id', (req, res) => {
	const id = req.params.id;
	const found = `SELECT * FROM issues WHERE id = ? LIMIT 1`;

	const query = db.query(found, id, (err, result) => {
		if (err) {
			throw err;
		} else {
			if (!result[0]) {
				res.status(404).json({ msg: `No issue with the id of ${req.params.id} found` });
			} else {
				res.send(result);
			}
		}
	});
});

// delete single issue
router.delete('/issue/delete/:id', (req, res) => {
	const id = req.params.id;
	const found = `DELETE FROM issues WHERE id = ? LIMIT 1`;

	const query = db.query(found, id, (err, result) => {
		if (err) {
			throw err;
		} else {
			res.send(`Issue with ${id} is deleted`);
		}
	});
});

// delete single user
router.delete('/user/delete/:id', (req, res) => {
	const id = req.params.id;
	const found = `DELETE FROM users WHERE id = ? LIMIT 1`;

	const query = db.query(found, id, (err, result) => {
		if (err) {
			throw err;
		} else {
			res.send(`user with ${id} is deleted`);
		}
	});
});

// delete single project
router.delete('/project/delete/:id', (req, res) => {
	const id = req.params.id;
	const found = `DELETE FROM projects WHERE id = ? LIMIT 1`;

	const query = db.query(found, id, (err, result) => {
		if (err) {
			throw err;
		} else {
			res.send(`project with ${id} is deleted`);
		}
	});
});

module.exports = router;
