const { User } = require('../models');
const { signToken } = require('../utlis/auth');

const resolvers = {
	Query: {
		users: async () => {
			return User.find({});
		},

		user: async (parent, { id }) => {
			return User.findById(id);
		},
	},

	Mutation: {
		addUser: async (
			parent,
			{ username, first_name, last_name, email, password }
		) => {
			//get new user details
			const newUser = new User({
				username,
				first_name,
				last_name,
				email,
				password,
			});

			//save newUser to the database
			const user = await newUser.save();

			const token = signToken(user);

			return { token, user };
		},
	},
};

module.exports = resolvers;
