const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
	name: {
		type: String,
		unique: true,
	},
	lat: Number,
	lng: Number,
	dailySurfData: [
		{
			type: Schema.Types.ObjectId,
			ref: 'SurfData',
		},
	],
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
