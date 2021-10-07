const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

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
	typeDefs,
	resolvers,
});

server.applyMiddleware({ app });

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

db.once('open', () => {
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
});
