const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	date: {
		type: Date,
		default: Date.now,
	},
	body: String,
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	locationID: {
		type: Schema.Types.ObjectId,
		ref: 'Location',
	},
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
