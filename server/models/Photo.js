const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
	date: {
		type: Date,
		default: Date.now,
	},
	url: String,
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
