const { User, Photo } = require('../models');
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
			return Photo.find({});
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

		//post photo to cloudinary cdn
		postPhoto: async (parent, { image }) => {
			//upload media to cloudinary cdn - returns a promise
			const upload = await cloudinary.uploader.upload(image);

			//get url from upload object
			const { url } = upload;

			//create new model for our db
			const newPhoto = new Photo({ url });

			//save model to database
			const photo = await newPhoto.save();

			//return new photo
			return photo;
		},
	},
};

module.exports = resolvers;
