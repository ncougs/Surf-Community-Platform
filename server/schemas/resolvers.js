require('dotenv').config();
const { User, Photo, Video, Location, Comment } = require('../models');
const { signToken } = require('../utlis/auth');
const { AuthenticationError } = require('apollo-server-express');
const cloudinary = require('../utlis/cloudinary');
const { GraphQLUpload } = require('graphql-upload');
const moment = require('moment');
const axios = require('axios');

const resolvers = {
	Upload: GraphQLUpload,
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
			return Photo.find({}).populate('user_id').populate('locationID');
		},

		//find all photos for the current day
		currentDayPhotos: async () => {
			const currentPhotos = await Photo.find({})
				.populate('user_id')
				.populate('locationID');

			const todaysPhotos = currentPhotos.filter((photo) => {
				if (
					moment(photo.date, 'x').format('DD/MMM/YYYY') ===
					moment().format('DD/MMM/YYYY')
				) {
					return photo;
				}
			});

			return todaysPhotos;
		},

		//find all photos for the current day at a location
		locationCurrentDayPhotos: async (parent, { location }) => {
			const currentPhotos = await Photo.find({})
				.populate('user_id')
				.populate('locationID');

			const locationPhotos = currentPhotos.filter((photo) => {
				if (photo.locationID.name === location) {
					return photo;
				}
			});

			const todaysPhotos = locationPhotos.filter((photo) => {
				if (
					moment(photo.date, 'x').format('DD/MMM/YYYY') ===
					moment().format('DD/MMM/YYYY')
				) {
					return photo;
				}
			});

			return todaysPhotos;
		},

		//find all videos
		videos: async () => {
			return Video.find({}).populate('user_id').populate('locationID');
		},

		//find all videos for the current day
		currentDayVideos: async () => {
			const currentVideos = await Video.find({})
				.populate('user_id')
				.populate('locationID');

			const todaysVideos = currentVideos.filter((video) => {
				if (
					moment(video.date, 'x').format('DD/MMM/YYYY') ===
					moment().format('DD/MMM/YYYY')
				) {
					return video;
				}
			});

			return todaysVideos;
		},

		//find all comments
		comments: async () => {
			return Comment.find({}).populate('user_id').populate('locationID');
		},

		//find all comments for the current day at a location
		locationCurrentDayComments: async (parent, { location }) => {
			const currentComments = await Comment.find({})
				.populate('user_id')
				.populate('locationID');

			const locationComents = currentComments.filter((comment) => {
				if (comment.locationID.name === location) {
					return comment;
				}
			});

			const todaysComments = locationComents.filter((comment) => {
				if (
					moment(comment.date, 'x').format('DD/MMM/YYYY') ===
					moment().format('DD/MMM/YYYY')
				) {
					return comment;
				}
			});

			return todaysComments;
		},

		//find all videos for the current day at a location
		locationCurrentDayVideos: async (parent, { location }) => {
			const currentVideos = await Video.find({})
				.populate('user_id')
				.populate('locationID');

			const locationVideos = currentVideos.filter((video) => {
				if (video.locationID.name === location) {
					return video;
				}
			});

			const todaysVideos = locationVideos.filter((video) => {
				if (
					moment(video.date, 'x').format('DD/MMM/YYYY') ===
					moment().format('DD/MMM/YYYY')
				) {
					return video;
				}
			});

			return todaysVideos;
		},

		//get all locations
		locations: async () => {
			return Location.find({});
		},

		//get a location
		location: async (parent, { id }) => {
			return Location.findById(id);
		},

		//get surf data for a location
		surfData: async (parent, { name }) => {
			const params =
				'swellHeight,waveHeight,airTemperature,gust,swellDirection,windDirection,windSpeed';

			const { lat, lng } = await Location.findOne({ name });

			const request = await axios(
				`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&source=noaa`,
				{
					headers: {
						Authorization: process.env.stormglass_api_key,
					},
				}
			);

			if (request.status === 200) {
				return request.data.hours;
			}
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

		//Add a new location
		addLocation: async (parent, { name, lat, lng }) => {
			//create new model for our db
			const newLocation = new Location({ name, lat, lng });

			//save model to database
			const savedLocation = await newLocation.save();

			//return photo with populated user_id
			return savedLocation;
		},

		//add a new photo to our database
		postPhoto: async (parent, { file, user_id, locationID }) => {
			//get read stream out of uploaded file
			const { createReadStream } = await file;

			const stream = createReadStream();

			//await upload of stream to cloudinary
			const upload = await new Promise((resolve, reject) => {
				const uploadStream = cloudinary.uploader.upload_stream((err, file) =>
					err ? reject(err) : resolve(file)
				);

				stream.pipe(uploadStream);
			});

			//get url from uploaded image
			const { url } = upload;

			//create new model for our db
			const newPhoto = new Photo({ url, user_id, locationID });

			//save model to database
			const photo = await newPhoto.save();

			//return photo
			return photo;
		},

		//add a new photo to our database
		postVideo: async (parent, { file, user_id, locationID }) => {
			//get read stream out of uploaded file
			const { createReadStream } = await file;

			const stream = createReadStream();

			//await upload of stream to cloudinary
			const upload = await new Promise((resolve, reject) => {
				const uploadStream = cloudinary.uploader.upload_stream(
					{ resource_type: 'video' },
					(err, file) => (err ? reject(err) : resolve(file))
				);

				stream.pipe(uploadStream);
			});

			//get url from uploaded image
			const { url } = upload;

			//create new model for our db
			const newVideo = new Video({ url, user_id, locationID });

			//save model to database
			const video = await newVideo.save();

			//return photo
			return video;
		},

		//add a new comment to our database
		postComment: async (parent, { body, user_id, locationID }) => {
			//create new model for our db
			const newComment = new Comment({ body, user_id, locationID });

			//save model to database
			const comment = await newComment.save();

			//return photo
			return comment;
		},
	},
};

module.exports = resolvers;
