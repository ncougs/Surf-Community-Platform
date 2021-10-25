const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurfDataSchema = new Schema({
	date: Date,
	data: [
		{
			dateTime: Date,
			airTemperature: Number,
			gust: Number,
			swellDirection: Number,
			swellHeight: Number,
			waveHeight: Number,
			windDirection: Number,
			windSpeed: Number,
		},
	],
});

const SurfData = mongoose.model('SurfData', SurfDataSchema);

module.exports = SurfData;
