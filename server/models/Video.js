const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
	date: {
		type: Date,
		default: Date.now,
	},
	url: String,
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	locationID: {
		type: Schema.Types.ObjectId,
		ref: 'Location',
	},
	caption: String,
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
