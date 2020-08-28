const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = { origin: 'http://localhost:3000' };

app.use(cors(corsOptions));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse request of content-type: application/x-ww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
const Role = db.role;

// in production call sync without parameters
db.sequelize.sync().then(() => {
	console.log('Drop and Resync Db');
	initial();
});

// used in production
function initial() {
	Role.create({
		id: 1,
		name: 'user'
	});

	Role.create({
		id: 2,
		name: 'admin'
	});
}

// welcome route
app.get('/', (req, res) => {
	res.json({ msg: 'Welcome' });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/projects.routes')(app);
require('./app/routes/issues.routes')(app);
require('./app/routes/comments.routes')(app);

// set port & listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
