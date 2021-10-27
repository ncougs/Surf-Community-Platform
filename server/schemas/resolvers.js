require('dotenv').config();
const {
	User,
	Photo,
	Video,
	Location,
	Comment,
	SurfData,
} = require('../models');
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
			return User.findById(id).populate('favourite_locations');
		},

		//find users favourite locations by _id
		userFavLocations: async (parent, { id }) => {
			const user = await User.findById(id).populate('favourite_locations');

			return user.favourite_locations;
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

		//find all of a users photos
		userPhotos: async (parent, { user_id }) => {
			const currentPhotos = await Photo.find({})
				.populate('user_id')
				.populate('locationID');

			const usersPhotos = currentPhotos.filter(
				(photo) => photo.user_id._id == user_id
			);

			return usersPhotos;
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

		//find all of a users videos
		userVideos: async (parent, { user_id }) => {
			const currentVideos = await Video.find({})
				.populate('user_id')
				.populate('locationID');

			const usersVideos = currentVideos.filter(
				(video) => video.user_id._id == user_id
			);

			return usersVideos;
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
			//prepare paramateres
			const end = moment().utc().endOf('day').unix();
			const start = moment().utc().startOf('day');

			const params =
				'swellHeight,waveHeight,airTemperature,gust,swellDirection,windDirection,windSpeed';

			//find once location with the same name
			const location = await Location.findOne({ name }).populate(
				'dailySurfData'
			);

			//IF daily surf data already exsits, return that data rather then seeking more from the API
			if (
				location.dailySurfData.find(
					(data) =>
						moment(data.date).format('YYYY-DD-MM') ===
						start.format('YYYY-DD-MM')
				)
			) {
				//return data witin our db
				console.log('returning original data');

				const filteredData = location.dailySurfData.filter(
					(data) =>
						moment(data.date).format('YYYY-DD-MM') ===
						start.format('YYYY-DD-MM')
				);

				return filteredData[0];
			} else {
				//fetch new data from external api
				console.log('fetching new data');

				//stormglass api
				const request = await axios(
					`https://api.stormglass.io/v2/weather/point?lat=${location.lat}&lng=${location.lng}&params=${params}&source=noaa&end=${end}`,
					{
						headers: {
							Authorization: process.env.stormglass_api_key,
						},
					}
				);

				//on sucessfull request
				if (request.status === 200) {
					//find data at exactly 6am, 12pm and 4pm for the current day
					const filteredData = request.data.hours.filter((hour) => {
						const timeStamp = moment(hour.time).utc().format('hh:mm a');

						if (timeStamp.match(/^(06:00 am|12:00 pm|04:00 pm)$/)) {
							return hour;
						}
					});

					//create new data model
					const newSurfData = await SurfData.create({
						date: moment().utc().startOf('day'),
						data: [],
					});

					//push filtered data into new model
					filteredData.forEach((data) => {
						newSurfData.data.push({
							dateTime: data.time,
							airTemperature: data.airTemperature.noaa,
							gust: data.gust.noaa,
							swellDirection: data.swellDirection.noaa,
							swellHeight: data.swellHeight.noaa,
							waveHeight: data.waveHeight.noaa,
							windDirection: data.windDirection.noaa,
							windSpeed: data.windSpeed.noaa,
						});
					});

					//save the new data model
					await newSurfData.save();

					//push new data into location
					location.dailySurfData.push(newSurfData._id);

					//save the main locaiton model back to the db
					await location.save();

					//Get updated location model
					const updatedLocation = await Location.findOne({ name }).populate(
						'dailySurfData'
					);

					//return todays location data from db
					const result = updatedLocation.dailySurfData.filter(
						(data) =>
							moment(data.date).format('YYYY-DD-MM') ===
							start.format('YYYY-DD-MM')
					);

					return result[0];
				}
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
			//save model to database
			const savedLocation = await Location.create({
				name,
				lat,
				lng,
				dailySurfData: [],
			});

			//return new model
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

		//add a new favourtie location to you a user
		favouriteLocation: async (parent, { location, user_id }) => {
			//find the username within our db - Usernames are unqiue
			const user = await User.findById(user_id).populate('favourite_locations');
			const { _id } = await Location.findOne({ name: location });

			const existingLocation = user.favourite_locations.filter(
				(i) => i.name === location
			);

			//If location already exists, return the existing user
			if (existingLocation.length) {
				console.log('removising exisitng location');

				const updatedLocation = user.favourite_locations.filter(
					(i) => i.name != location
				);

				user.favourite_locations = updatedLocation;
			} else if (user.favourite_locations.length === 3) {
				//if 3 locations already exsit, remove the 1st item, add to the end of the array
				user.favourite_locations.shift();
				user.favourite_locations.push(_id);
			} else {
				//add new location to favourite locations
				user.favourite_locations.push(_id);
			}
			await user.save();

			//return user
			return await User.findById(user_id).populate('favourite_locations');
		},
	},
};

module.exports = resolvers;
