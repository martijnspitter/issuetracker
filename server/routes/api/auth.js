const express = require('express');
const authRouter = express.Router();

const mysql = require('mysql');

// create user
authRouter.post('/register', (req, res) => {
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

// get users
// need to change so only name and id is exported
router.get('/user/all', (req, res) => {
	const sql = 'SELECT * FROM users ORDER BY id desc';
	const query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	});
});

module.exports = authRouter;
