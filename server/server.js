const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { graphqlUploadExpress } = require('graphql-upload');

const session = require('express-session');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const sess = {
	secret: 'Super secret secret',
	cookie: {
		maxAge: 900000,
	},
	resave: false,
	saveUninitialized: true,
	rolling: true,
};

const server = new ApolloServer({
	uploads: false,
	typeDefs,
	resolvers,
});

server.start().then(() => {
	app.use(graphqlUploadExpress());

	server.applyMiddleware({ app });

	app.use(session(sess));

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, '../client/build')));
	}
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
});
