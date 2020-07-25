const express = require('express');
const bodyParser = require('body-parser');
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

const app = express();
app.use(bodyParser.json());

// routes setup base-url
app.use('/api/issuetracker', require('./routes/api/routes'));

// create database
app.get('/createdb', (req, res) => {
	let sql = 'CREATE DATABASE projects';
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Database created..');
	});
});

// create project table
app.get('/createproject', (req, res) => {
	let sql =
		'CREATE TABLE projects(id int AUTO_INCREMENT, title VARCHAR(255), description VARCHAR(255), github VARCHAR(255), user int, issues int, PRIMARY KEY(id))';
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Post table created..');
	});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
