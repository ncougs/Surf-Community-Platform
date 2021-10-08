const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

const signToken = ({ _id, username, first_name, last_name, email }) => {
	const payload = { _id, username, first_name, last_name, email };
	return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { signToken };
