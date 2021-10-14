const { User, Photo, Location } = require('../models');
const { signToken } = require('../utlis/auth');
const { AuthenticationError } = require('apollo-server-express');
const cloudinary = require('../utlis/cloudinary');

const resolvers = {
	Query: {
		//find all users
		users: async () => {
			return User.find({});
		},

		//find user by _id
		user: async (parent, { id }) => {
			return User.findById(id);
		},

		//find all photos
		photos: async () => {
			return Photo.find({}).populate('user_id');
		},

		//get all locations
		locations: async () => {
			return Location.find({});
		},

		//get all locations
		location: async (parent, { id }) => {
			return Location.findById(id);
		},
	},

	Mutation: {
		//create a new user account
		createUser: async (
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

			//create user token
			const token = signToken(user);

			//return token and user
			return { token, user };
		},

		//login to user account
		login: async (parent, { username, password }) => {
			//default error message
			const errorMessage = 'Incorrect email or password';

			//find the username within our db - Usernames are unqiue
			const user = await User.findOne({ username });

			//no username found, return error
			if (!user) {
				throw new AuthenticationError(errorMessage);
			}

			//check plain text password with hashed db password
			const validPassword = await user.checkPassword(password);

			//passwords do not match, return error
			if (!validPassword) {
				throw new AuthenticationError(errorMessage);
			}

			//create user token
			const token = signToken(user);

			//return token and user
			return { token, user };
		},

		//Add photo URL to database
		postPhoto: async (parent, { url, user_id }) => {
			//create new model for our db
			const newPhoto = new Photo({ url, user_id });

			//save model to database
			const savedPhoto = await newPhoto.save();

			//return photo with populated user_id
			return Photo.findById(savedPhoto._id).populate('user_id');
		},

		//Add a new location
		addLocation: async (parent, { name, surflineID }) => {
			//create new model for our db
			const newLocation = new Location({ name, surflineID });

			//save model to database
			const savedLocation = await newLocation.save();

			//return photo with populated user_id
			return savedLocation;
		},
	},
};

module.exports = resolvers;
