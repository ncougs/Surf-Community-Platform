const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
// const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
	secret: 'Super secret secret',
	cookie: {
		maxAge: 900000,
	},
	resave: false,
	saveUninitialized: true,
	rolling: true,
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/surf');

// app.use(routes);

app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
